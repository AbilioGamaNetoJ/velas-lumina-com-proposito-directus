import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

function loadEnv(path) {
  try {
    const content = readFileSync(path, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx);
      const val = trimmed.slice(eqIdx + 1);
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {}
}
loadEnv('.env.local');
loadEnv('.env');

const BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

if (!BASE_URL || !TOKEN) {
  console.error('NEXT_PUBLIC_DIRECTUS_URL ou DIRECTUS_TOKEN ausentes.');
  process.exit(1);
}

const args = process.argv.slice(2);
const PHASE = args.find((a) => a.startsWith('--phase='))?.split('=')[1] ?? 'all';
const CONFIRM_DROP = args.includes('--confirm-drop');

async function api(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.errors?.[0]?.message ?? data?.error ?? JSON.stringify(data);
    throw new Error(`${method} ${path} -> ${res.status}: ${msg}`);
  }
  return data.data;
}

async function collectionExists(name) {
  try { await api('GET', `/collections/${name}`); return true; } catch { return false; }
}

// ─── Backup ─────────────────────────────────────────────────────────────────

const BACKUP_DIR = 'scripts/backups';
const DATA_COLLECTIONS = ['products', 'categories', 'faqs'];
const SINGLETONS = ['site_settings', 'privacy_policy'];

async function backup() {
  if (!existsSync(BACKUP_DIR)) mkdirSync(BACKUP_DIR, { recursive: true });
  const snapshot = await api('GET', '/schema/snapshot');
  const items = {};
  for (const c of DATA_COLLECTIONS) items[c] = await api('GET', `/items/${c}?limit=-1`);
  for (const c of SINGLETONS) items[c] = await api('GET', `/items/${c}`);
  const path = `${BACKUP_DIR}/backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  writeFileSync(path, JSON.stringify({ snapshot, items }, null, 2));
  console.log(`✓ Backup salvo em ${path}`);
  return items;
}

// ─── Fase: categorias ───────────────────────────────────────────────────────

async function createCategorias() {
  if (await collectionExists('categorias')) {
    console.log('✓ categorias já existe');
    return;
  }
  await api('POST', '/collections', {
    collection: 'categorias',
    meta: {
      singleton: false,
      sort_field: 'ordem',
      icon: 'category',
      display_template: '{{nome}}',
      translations: [{ language: 'pt-BR', translation: 'Categorias', singular: 'Categoria', plural: 'Categorias' }],
    },
    schema: {},
    fields: [
      { field: 'id', type: 'integer', meta: { hidden: true, interface: 'input', readonly: true, width: 'full' }, schema: { is_primary_key: true, has_auto_increment: true } },
      { field: 'nome', type: 'string', meta: { interface: 'input', required: true, width: 'full', translations: [{ language: 'pt-BR', translation: 'Nome' }] }, schema: {} },
      { field: 'slug', type: 'string', meta: { interface: 'input', width: 'full', required: false, note: 'Identificador único usado na URL. Deixe em branco: é gerado automaticamente a partir do nome.', translations: [{ language: 'pt-BR', translation: 'Identificador (Slug)' }] }, schema: { is_unique: true, is_nullable: true } },
      { field: 'imagem', type: 'uuid', meta: { interface: 'file', special: ['file'], display: 'image', width: 'full', note: 'Imagem de capa da categoria.', translations: [{ language: 'pt-BR', translation: 'Imagem' }] }, schema: { is_nullable: true } },
      { field: 'imagem_alt', type: 'string', meta: { interface: 'input', width: 'full', note: 'Texto alternativo da imagem (acessibilidade e SEO).', translations: [{ language: 'pt-BR', translation: 'Texto Alternativo da Imagem' }] }, schema: { is_nullable: true } },
      { field: 'ordem', type: 'integer', meta: { interface: 'input-integer', hidden: true, width: 'full', note: 'Menor número aparece primeiro.', translations: [{ language: 'pt-BR', translation: 'Ordem' }] }, schema: { is_nullable: true, default_value: 100 } },
      { field: 'ativo', type: 'boolean', meta: { interface: 'boolean', width: 'full', note: 'Desmarque para ocultar esta categoria do site sem excluí-la.', translations: [{ language: 'pt-BR', translation: 'Ativo' }] }, schema: { default_value: true } },
    ],
  });
  await api('POST', '/relations', { collection: 'categorias', field: 'imagem', related_collection: 'directus_files' });
  console.log('✓ categorias criada');
}

async function copyCategoriasData(oldItems) {
  const existing = await api('GET', '/items/categorias?limit=-1');
  if (existing.length > 0) {
    console.log(`✓ categorias já tem ${existing.length} itens — pulando cópia`);
    return existing;
  }
  const created = [];
  for (const c of oldItems) {
    const row = await api('POST', '/items/categorias', {
      nome: c.name,
      slug: c.slug,
      ordem: c.sort ?? 100,
      ativo: true,
    });
    created.push(row);
    console.log(`  ✓ categoria copiada: ${c.name} (old id ${c.id} -> new id ${row.id})`);
  }
  return created;
}

// ─── Fase: produtos ─────────────────────────────────────────────────────────

async function createProdutos() {
  if (await collectionExists('produtos')) {
    console.log('✓ produtos já existe');
    return;
  }
  await api('POST', '/collections', {
    collection: 'produtos',
    meta: {
      singleton: false,
      sort_field: 'ordem',
      icon: 'local_fire_department',
      note: 'Catálogo de velas e kits artesanais Lumina',
      display_template: '{{nome}}',
      translations: [{ language: 'pt-BR', translation: 'Produtos', singular: 'Produto', plural: 'Produtos' }],
    },
    schema: {},
    fields: [
      { field: 'id', type: 'integer', meta: { hidden: true, interface: 'input', readonly: true, width: 'full' }, schema: { is_primary_key: true, has_auto_increment: true } },
      { field: 'nome', type: 'string', meta: { interface: 'input', required: true, width: 'full', note: 'Nome do produto exibido no site.', translations: [{ language: 'pt-BR', translation: 'Nome do Produto' }] }, schema: {} },
      { field: 'slug', type: 'string', meta: { interface: 'input', width: 'full', required: false, note: 'Identificador único usado na URL. Deixe em branco: é gerado automaticamente a partir do nome.', translations: [{ language: 'pt-BR', translation: 'Identificador (Slug)' }] }, schema: { is_unique: true, is_nullable: true } },
      { field: 'categoria', type: 'integer', meta: { interface: 'select-dropdown-m2o', required: true, width: 'full', options: { template: '{{nome}}' }, note: 'Categoria à qual este produto pertence.', translations: [{ language: 'pt-BR', translation: 'Categoria' }] }, schema: {} },
      { field: 'descricao', type: 'text', meta: { interface: 'input-multiline', required: true, width: 'full', note: 'Resumo curto (1-2 frases) que aparece no card do produto e nas buscas.', translations: [{ language: 'pt-BR', translation: 'Descrição Curta' }] }, schema: {} },
      { field: 'descricao_detalhada', type: 'text', meta: { interface: 'input-multiline', width: 'full', note: 'Texto completo do produto (detalhes, características, materiais). Pode usar várias linhas/parágrafos.', translations: [{ language: 'pt-BR', translation: 'Descrição Detalhada' }] }, schema: { default_value: '', is_nullable: true } },
      { field: 'preco', type: 'float', meta: { interface: 'input', required: true, width: 'full', note: 'Valor em reais (R$).', translations: [{ language: 'pt-BR', translation: 'Preço' }] }, schema: { default_value: 0 } },
      { field: 'aromas', type: 'json', meta: { interface: 'tags', special: ['cast-json'], width: 'full', note: 'Lista de fragrâncias (ex: Lavanda, Baunilha).', translations: [{ language: 'pt-BR', translation: 'Aromas' }] }, schema: { is_nullable: true } },
      { field: 'peso', type: 'string', meta: { interface: 'input', width: 'full', note: 'Peso do produto (ex: 200g).', translations: [{ language: 'pt-BR', translation: 'Peso' }] }, schema: { is_nullable: true } },
      { field: 'tempo_queima', type: 'string', meta: { interface: 'input', width: 'full', note: 'Duração estimada de queima (ex: 40-50 horas).', translations: [{ language: 'pt-BR', translation: 'Tempo de Queima' }] }, schema: { is_nullable: true } },
      { field: 'dimensoes', type: 'string', meta: { interface: 'input', width: 'full', note: 'Medidas do produto (ex: 8cm x 10cm).', translations: [{ language: 'pt-BR', translation: 'Dimensões' }] }, schema: { is_nullable: true } },
      { field: 'intensidade_aroma', type: 'string', meta: { interface: 'select-dropdown', width: 'full', options: { choices: [{ text: 'Suave', value: 'Suave' }, { text: 'Média', value: 'Média' }, { text: 'Intensa', value: 'Intensa' }] }, note: 'Suave / Média / Intensa.', translations: [{ language: 'pt-BR', translation: 'Intensidade do Aroma' }] }, schema: { is_nullable: true } },
      { field: 'destaque', type: 'boolean', meta: { interface: 'boolean', width: 'full', note: 'Exibir na seção de destaques da home.', translations: [{ language: 'pt-BR', translation: 'Destaque' }] }, schema: { default_value: false } },
      { field: 'ativo', type: 'boolean', meta: { interface: 'boolean', width: 'full', note: 'Desmarque para ocultar este produto do catálogo sem excluí-lo.', translations: [{ language: 'pt-BR', translation: 'Ativo' }] }, schema: { default_value: true } },
      { field: 'sem_estoque', type: 'boolean', meta: { interface: 'boolean', width: 'full', note: 'Marque quando o produto estiver temporariamente esgotado.', translations: [{ language: 'pt-BR', translation: 'Sem Estoque' }] }, schema: { default_value: false } },
      { field: 'ordem', type: 'integer', meta: { interface: 'input-integer', hidden: true, width: 'full', note: 'Menor número aparece primeiro.', translations: [{ language: 'pt-BR', translation: 'Ordem' }] }, schema: { is_nullable: true, default_value: 100 } },
      { field: 'imagem', type: 'uuid', meta: { interface: 'file', special: ['file'], required: true, width: 'full', note: 'Foto de capa do produto.', translations: [{ language: 'pt-BR', translation: 'Imagem de Capa' }] }, schema: { is_nullable: true } },
    ],
  });
  await api('POST', '/relations', { collection: 'produtos', field: 'categoria', related_collection: 'categorias' });
  await api('POST', '/relations', { collection: 'produtos', field: 'imagem', related_collection: 'directus_files' });
  console.log('✓ produtos criada');
}

async function createProdutosImagensJunction() {
  if (await collectionExists('produtos_imagens')) {
    console.log('✓ produtos_imagens já existe');
    return;
  }
  await api('POST', '/collections', {
    collection: 'produtos_imagens',
    meta: { hidden: true, icon: 'import_export' },
    schema: {},
    fields: [
      { field: 'id', type: 'integer', meta: { hidden: true, interface: 'input', readonly: true }, schema: { is_primary_key: true, has_auto_increment: true } },
      { field: 'produtos_id', type: 'integer', meta: { hidden: true }, schema: {} },
      { field: 'directus_files_id', type: 'uuid', meta: { hidden: true }, schema: {} },
    ],
  });
  await api('POST', '/relations', {
    collection: 'produtos_imagens',
    field: 'produtos_id',
    related_collection: 'produtos',
    meta: { one_field: 'imagens', junction_field: 'directus_files_id', sort_field: null },
  });
  await api('POST', '/relations', {
    collection: 'produtos_imagens',
    field: 'directus_files_id',
    related_collection: 'directus_files',
    meta: { junction_field: 'produtos_id' },
  });
  await api('POST', '/fields/produtos', {
    field: 'imagens',
    type: 'alias',
    meta: {
      interface: 'file',
      special: ['files'],
      display: 'files',
      width: 'full',
      note: 'Fotos adicionais do produto (galeria).',
      translations: [{ language: 'pt-BR', translation: 'Galeria de Imagens' }],
    },
  });
  console.log('✓ produtos_imagens (galeria) criada');
}

async function copyProdutosData(oldItems, categoriaBySlug) {
  const existing = await api('GET', '/items/produtos?limit=-1');
  if (existing.length > 0) {
    console.log(`✓ produtos já tem ${existing.length} itens — pulando cópia`);
    return existing;
  }
  const created = [];
  for (const p of oldItems) {
    const categoriaId = categoriaBySlug[p.category];
    if (!categoriaId) throw new Error(`Produto "${p.name}" (id ${p.id}) tem category="${p.category}" sem categoria correspondente`);
    const row = await api('POST', '/items/produtos', {
      nome: p.name,
      slug: p.slug,
      categoria: categoriaId,
      descricao: p.subtitle ?? '',
      descricao_detalhada: p.description ?? '',
      preco: p.price,
      aromas: p.scents ?? [],
      peso: p.weight ?? null,
      tempo_queima: p.burn_time ?? null,
      dimensoes: p.dimensions ?? null,
      intensidade_aroma: p.essence_strength ?? null,
      destaque: p.featured ?? false,
      ativo: true,
      sem_estoque: !(p.in_stock ?? true),
      ordem: 100,
      imagem: p.image ?? null,
    });
    created.push(row);
    console.log(`  ✓ produto copiado: ${p.name} (old id ${p.id} -> new id ${row.id}, categoria=${p.category}->${categoriaId})`);
  }
  return created;
}

// ─── Fase: faqs (mesma collection, campos novos em pt-BR) ─────────────────

async function fieldExists(collection, field) {
  try { await api('GET', `/fields/${collection}/${field}`); return true; } catch { return false; }
}

async function addFaqsFields() {
  if (await fieldExists('faqs', 'pergunta')) {
    console.log('✓ campos pt-BR de faqs já existem');
    return;
  }
  await api('POST', '/fields/faqs', { field: 'pergunta', type: 'string', meta: { interface: 'input', required: true, width: 'full', translations: [{ language: 'pt-BR', translation: 'Pergunta' }] }, schema: {} });
  await api('POST', '/fields/faqs', { field: 'resposta', type: 'text', meta: { interface: 'input-multiline', required: true, width: 'full', translations: [{ language: 'pt-BR', translation: 'Resposta' }] }, schema: {} });
  await api('POST', '/fields/faqs', { field: 'ordem', type: 'integer', meta: { interface: 'input-integer', hidden: true, width: 'full', note: 'Menor número aparece primeiro.', translations: [{ language: 'pt-BR', translation: 'Ordem' }] }, schema: { is_nullable: true, default_value: 100 } });
  await api('POST', '/fields/faqs', { field: 'ativo', type: 'boolean', meta: { interface: 'boolean', width: 'full', note: 'Desmarque para ocultar esta pergunta do site sem excluí-la.', translations: [{ language: 'pt-BR', translation: 'Ativo' }] }, schema: { default_value: true } });
  console.log('✓ campos pt-BR de faqs criados');
}

async function copyFaqsData(oldItems) {
  for (const f of oldItems) {
    const current = await api('GET', `/items/faqs/${f.id}`);
    if (current.pergunta) continue;
    await api('PATCH', `/items/faqs/${f.id}`, {
      pergunta: f.question,
      resposta: f.answer,
      ordem: f.sort ?? 100,
      ativo: true,
    });
    console.log(`  ✓ faq copiada: ${f.question.slice(0, 40)}...`);
  }
  await api('PATCH', '/collections/faqs', {
    meta: {
      sort_field: 'ordem',
      display_template: '{{pergunta}}',
      translations: [{ language: 'pt-BR', translation: 'Perguntas Frequentes', singular: 'Pergunta Frequente', plural: 'Perguntas Frequentes' }],
    },
  });
}

// ─── Fase: configuracoes_site ──────────────────────────────────────────────

async function createConfiguracoesSite() {
  if (await collectionExists('configuracoes_site')) {
    console.log('✓ configuracoes_site já existe');
    return;
  }
  await api('POST', '/collections', {
    collection: 'configuracoes_site',
    meta: {
      singleton: true,
      icon: 'settings',
      display_template: '{{nome_marca}}',
      translations: [{ language: 'pt-BR', translation: 'Configurações do Site', singular: 'Configurações do Site', plural: 'Configurações do Site' }],
    },
    schema: {},
    fields: [
      { field: 'id', type: 'integer', meta: { hidden: true, interface: 'input', readonly: true, width: 'full' }, schema: { is_primary_key: true, has_auto_increment: true } },
      { field: 'nome_marca', type: 'string', meta: { interface: 'input', width: 'full', note: 'Nome da marca exibido no site.', translations: [{ language: 'pt-BR', translation: 'Nome da Marca' }] }, schema: {} },
      { field: 'slogan', type: 'string', meta: { interface: 'input', width: 'full', note: 'Frase curta usada em SEO e rodapé.', translations: [{ language: 'pt-BR', translation: 'Slogan' }] }, schema: {} },
      { field: 'numero_whatsapp', type: 'string', meta: { interface: 'input', required: true, width: 'full', note: 'Formato: DDI + DDD + número, somente dígitos (ex.: 5548999998888).', translations: [{ language: 'pt-BR', translation: 'Número do WhatsApp' }] }, schema: {} },
      { field: 'mensagem_padrao_whatsapp', type: 'text', meta: { interface: 'input-multiline', width: 'full', note: 'Pré-preenchida quando o cliente clica em um botão de WhatsApp genérico.', translations: [{ language: 'pt-BR', translation: 'Mensagem Padrão do WhatsApp' }] }, schema: {} },
      { field: 'url_instagram', type: 'string', meta: { interface: 'input', width: 'full', translations: [{ language: 'pt-BR', translation: 'Link do Instagram' }] }, schema: {} },
      { field: 'email', type: 'string', meta: { interface: 'input', width: 'full', translations: [{ language: 'pt-BR', translation: 'E-mail de Contato' }] }, schema: {} },
      { field: 'titulo_seo_padrao', type: 'string', meta: { interface: 'input', width: 'full', note: 'Título padrão para SEO e abas do navegador.', translations: [{ language: 'pt-BR', translation: 'Título SEO Padrão' }] }, schema: {} },
      { field: 'descricao_seo_padrao', type: 'text', meta: { interface: 'input-multiline', width: 'full', note: 'Descrição padrão para SEO (150–160 caracteres).', translations: [{ language: 'pt-BR', translation: 'Descrição SEO Padrão' }] }, schema: {} },
      { field: 'imagem_og', type: 'uuid', meta: { interface: 'file', special: ['file'], display: 'image', width: 'full', note: '1200×630px para compartilhamento em redes sociais.', translations: [{ language: 'pt-BR', translation: 'Imagem de Compartilhamento (OG)' }] }, schema: { is_nullable: true } },
      { field: 'nota_rodape', type: 'string', meta: { interface: 'input', width: 'full', note: 'Ex.: NomeDaMarca. Todos os direitos reservados.', translations: [{ language: 'pt-BR', translation: 'Nota do Rodapé' }] }, schema: {} },
    ],
  });
  await api('POST', '/relations', { collection: 'configuracoes_site', field: 'imagem_og', related_collection: 'directus_files' });
  console.log('✓ configuracoes_site criada');
}

async function copyConfiguracoesSiteData(old) {
  const current = await api('GET', '/items/configuracoes_site');
  if (current?.nome_marca) {
    console.log('✓ configuracoes_site já semeada');
    return;
  }
  await api('PATCH', '/items/configuracoes_site', {
    nome_marca: old.brand_name,
    slogan: old.tagline,
    numero_whatsapp: old.whatsapp_number,
    mensagem_padrao_whatsapp: old.whatsapp_default_message,
    url_instagram: old.instagram_url,
    email: old.contact_email,
    titulo_seo_padrao: old.seo_title,
    descricao_seo_padrao: old.seo_description,
    imagem_og: old.og_image ?? null,
    nota_rodape: old.footer_note,
  });
  console.log('✓ configuracoes_site semeada');
}

// ─── Fase: politica_privacidade ────────────────────────────────────────────

async function createPoliticaPrivacidade() {
  if (await collectionExists('politica_privacidade')) {
    console.log('✓ politica_privacidade já existe');
    return;
  }
  await api('POST', '/collections', {
    collection: 'politica_privacidade',
    meta: {
      singleton: true,
      icon: 'policy',
      display_template: '{{titulo}}',
      translations: [{ language: 'pt-BR', translation: 'Política de Privacidade', singular: 'Política de Privacidade', plural: 'Política de Privacidade' }],
    },
    schema: {},
    fields: [
      { field: 'id', type: 'integer', meta: { hidden: true, interface: 'input', readonly: true, width: 'full' }, schema: { is_primary_key: true, has_auto_increment: true } },
      { field: 'titulo', type: 'string', meta: { interface: 'input', required: true, width: 'full', translations: [{ language: 'pt-BR', translation: 'Título' }] }, schema: {} },
      { field: 'atualizado_em', type: 'timestamp', meta: { interface: 'datetime', display: 'datetime', display_options: { format: 'DD/MM/YYYY' }, required: true, width: 'full', note: 'Data da última atualização, exibida em formato brasileiro no site.', translations: [{ language: 'pt-BR', translation: 'Atualizado em' }] }, schema: {} },
      { field: 'corpo', type: 'text', meta: { interface: 'input-rich-text-html', required: true, width: 'full', note: 'Conteúdo completo da política.', translations: [{ language: 'pt-BR', translation: 'Conteúdo' }] }, schema: {} },
    ],
  });
  console.log('✓ politica_privacidade criada');
}

async function copyPoliticaPrivacidadeData(old) {
  const current = await api('GET', '/items/politica_privacidade');
  if (current?.titulo) {
    console.log('✓ politica_privacidade já semeada');
    return;
  }
  await api('PATCH', '/items/politica_privacidade', {
    titulo: old.title,
    atualizado_em: old.last_updated ? `${old.last_updated}T00:00:00` : new Date().toISOString(),
    corpo: old.body,
  });
  console.log('✓ politica_privacidade semeada');
}

// ─── Fase: permissões (policy pública) ─────────────────────────────────────

const PUBLIC_POLICY_ID = 'abf8a154-5b1c-4a46-ac9c-7300570f4f17';

async function permissionExists(policyId, collection, action) {
  const res = await api('GET', `/permissions?filter[policy][_eq]=${policyId}&filter[collection][_eq]=${collection}&filter[action][_eq]=${action}`);
  return (res?.length ?? 0) > 0;
}

async function grantPublicRead(collection) {
  if (await permissionExists(PUBLIC_POLICY_ID, collection, 'read')) {
    console.log(`✓ permissão read Public já existe para ${collection}`);
    return;
  }
  await api('POST', '/permissions', { policy: PUBLIC_POLICY_ID, collection, action: 'read', fields: ['*'] });
  console.log(`✓ permissão read Public concedida para ${collection}`);
}

// ─── Fase: role "Cliente" (editor de conteúdo) ─────────────────────────────

const CLIENTE_COLLECTIONS = ['produtos', 'categorias', 'faqs', 'configuracoes_site', 'politica_privacidade', 'produtos_imagens', 'directus_files'];
const CLIENTE_ACTIONS = ['create', 'read', 'update', 'delete', 'share'];

async function roleExists(name) {
  const res = await api('GET', `/roles?filter[name][_eq]=${encodeURIComponent(name)}`);
  return res?.[0] ?? null;
}

async function createClienteRole() {
  const existing = await roleExists('Cliente');
  if (existing) {
    console.log('✓ role Cliente já existe');
    return existing;
  }
  const policy = await api('POST', '/policies', {
    name: 'Cliente',
    icon: 'person',
    description: 'Edita o conteúdo do site (produtos, categorias, FAQs, configurações), sem acesso a configurações de administração do Directus.',
    admin_access: false,
    app_access: true,
  });
  for (const collection of CLIENTE_COLLECTIONS) {
    for (const action of CLIENTE_ACTIONS) {
      await api('POST', '/permissions', { policy: policy.id, collection, action, fields: ['*'] });
    }
  }
  const role = await api('POST', '/roles', { name: 'Cliente', icon: 'person', description: 'Editor de conteúdo do site.' });
  await api('PATCH', `/policies/${policy.id}`, { roles: { create: [{ role: { id: role.id } }], update: [], delete: [] } });
  console.log('✓ role Cliente criada, com policy de CRUD completo no conteúdo do site');
  return role;
}

// ─── Fase: flow de slug automático ─────────────────────────────────────────

const OLD_FLOW_ID = '3eaf8442-6707-43eb-a82b-ba9cfadcd58e';
const NEW_FLOW_ID = 'a1c9f3e2-2b4d-4a7c-9c1a-3f6e8d0b5c7a';
const SLUG_OP_ID = 'b2d0a4f3-3c5e-4b8d-8d2b-4a7f9e1c6d8b';
const UPDATE_OP_ID = 'c3e1b5a4-4d6f-4c9e-9e3c-5b8a0f2d7e9c';

const SLUGIFY_SCRIPT = `module.exports = async function(data) {
  const item = data.$trigger.payload || {};
  if (item.slug) return { slug: item.slug };
  const slug = String(item.nome || '')
    .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return { slug };
};
`;

async function flowExists(id) {
  try { await api('GET', `/flows/${id}`); return true; } catch { return false; }
}

async function deleteOldFlow() {
  if (await flowExists(OLD_FLOW_ID)) {
    await api('DELETE', `/flows/${OLD_FLOW_ID}`);
    console.log('✓ flow antigo (quebrado, inactive) removido');
  }
}

async function createSlugFlow() {
  if (await flowExists(NEW_FLOW_ID)) {
    console.log('✓ flow de slug automático já existe');
    return;
  }
  await api('POST', '/flows', {
    id: NEW_FLOW_ID,
    name: 'Auto-gerar slug (produtos e categorias)',
    icon: 'bolt',
    status: 'active',
    trigger: 'event',
    accountability: 'all',
    options: { type: 'action', scope: ['items.create'], collections: ['produtos', 'categorias'] },
  });
  await api('POST', '/operations', {
    id: SLUG_OP_ID,
    name: 'Gerar slug a partir do nome',
    key: 'gerar_slug',
    type: 'exec',
    position_x: 19,
    position_y: 1,
    options: { code: SLUGIFY_SCRIPT },
    flow: NEW_FLOW_ID,
  });
  await api('POST', '/operations', {
    id: UPDATE_OP_ID,
    name: 'Gravar slug no item',
    key: 'gravar_slug',
    type: 'item-update',
    position_x: 39,
    position_y: 1,
    options: {
      collection: '{{$trigger.collection}}',
      key: '{{$trigger.key}}',
      payload: { slug: '{{gerar_slug.slug}}' },
      emitEvents: false,
    },
    flow: NEW_FLOW_ID,
  });
  await api('PATCH', `/operations/${SLUG_OP_ID}`, { resolve: UPDATE_OP_ID });
  await api('PATCH', `/flows/${NEW_FLOW_ID}`, { operation: SLUG_OP_ID });
  console.log('✓ novo flow de slug automático criado (action, items.create, produtos+categorias)');
}

// ─── Fase: settings ─────────────────────────────────────────────────────────

async function setDefaultLanguage() {
  await api('PATCH', '/settings', { default_language: 'pt-BR' });
  console.log('✓ default_language definido como pt-BR');
}

// ─── Fase: drop das collections/campos antigos (destrutivo) ───────────────

async function deleteFieldIfExists(collection, field) {
  if (await fieldExists(collection, field)) {
    await api('DELETE', `/fields/${collection}/${field}`);
    console.log(`✓ campo antigo removido: ${collection}.${field}`);
  }
}

async function deleteCollectionIfExists(name) {
  if (await collectionExists(name)) {
    await api('DELETE', `/collections/${name}`);
    console.log(`✓ collection antiga removida: ${name}`);
  } else {
    console.log(`  (${name} já não existe)`);
  }
}

async function dropOld() {
  await deleteFieldIfExists('faqs', 'question');
  await deleteFieldIfExists('faqs', 'answer');
  await deleteFieldIfExists('faqs', 'sort');

  await deleteCollectionIfExists('products_directus_files');
  await deleteCollectionIfExists('products_files');
  await deleteCollectionIfExists('products');
  await deleteCollectionIfExists('categories');
  await deleteCollectionIfExists('site_settings');
  await deleteCollectionIfExists('privacy_policy');
}

// ─── main (fases aditivas, sem deletar nada) ───────────────────────────────

console.log(`\nConectando em ${BASE_URL}...`);
console.log(`Fase: ${PHASE}\n`);

try {
  const oldItems = await backup();

  if (PHASE === 'all' || PHASE === 'categorias') {
    await createCategorias();
    const newCats = await copyCategoriasData(oldItems.categories);
    const categoriaBySlug = Object.fromEntries(newCats.map((c) => [c.slug, c.id]));
    writeFileSync('scripts/backups/categoria-slug-map.json', JSON.stringify(categoriaBySlug, null, 2));
  }

  if (PHASE === 'all' || PHASE === 'produtos') {
    const categoriaBySlug = JSON.parse(readFileSync('scripts/backups/categoria-slug-map.json', 'utf8'));
    await createProdutos();
    await createProdutosImagensJunction();
    await copyProdutosData(oldItems.products, categoriaBySlug);
  }

  if (PHASE === 'all' || PHASE === 'faqs') {
    await addFaqsFields();
    await copyFaqsData(oldItems.faqs);
  }

  if (PHASE === 'all' || PHASE === 'configuracoes_site') {
    await createConfiguracoesSite();
    await copyConfiguracoesSiteData(oldItems.site_settings);
  }

  if (PHASE === 'all' || PHASE === 'politica_privacidade') {
    await createPoliticaPrivacidade();
    await copyPoliticaPrivacidadeData(oldItems.privacy_policy);
  }

  if (PHASE === 'all' || PHASE === 'permissoes') {
    await grantPublicRead('produtos');
    await grantPublicRead('categorias');
    await grantPublicRead('configuracoes_site');
    await grantPublicRead('politica_privacidade');
    await grantPublicRead('produtos_imagens');
    await createClienteRole();
  }

  if (PHASE === 'all' || PHASE === 'flow') {
    await deleteOldFlow();
    await createSlugFlow();
  }

  if (PHASE === 'all' || PHASE === 'settings') {
    await setDefaultLanguage();
  }

  if (PHASE === 'drop-old') {
    if (!CONFIRM_DROP) {
      console.error('Fase drop-old exige --confirm-drop explícito. Abortando sem apagar nada.');
      process.exit(1);
    }
    await dropOld();
  }

  console.log('\n✅ Fase concluída com sucesso!\n');
} catch (err) {
  console.error('\n❌ Erro:', err.message);
  process.exit(1);
}
