import { readFileSync } from 'fs';

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

async function api(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.errors?.[0]?.message ?? data?.error ?? JSON.stringify(data);
    throw new Error(`${method} ${path} → ${res.status}: ${msg}`);
  }
  return data;
}

async function collectionExists(name) {
  try { await api('GET', `/collections/${name}`); return true; } catch { return false; }
}

async function permissionExists(policyId, collection, action) {
  try {
    const res = await api('GET', `/permissions?filter[policy][_eq]=${policyId}&filter[collection][_eq]=${collection}&filter[action][_eq]=${action}`);
    return (res.data?.length ?? 0) > 0;
  } catch { return false; }
}

async function itemsExist(collection) {
  try {
    const res = await api('GET', `/items/${collection}?limit=1`);
    return (res.data?.length ?? 0) > 0;
  } catch { return false; }
}

async function singletonSeeded(collection) {
  try {
    const res = await api('GET', `/items/${collection}`);
    return !!(res.data?.id);
  } catch { return false; }
}

// ─── 1. categories ────────────────────────────────────────────────────────────

async function createCategories() {
  if (await collectionExists('categories')) {
    console.log('✓ categories já existe');
  } else {
    await api('POST', '/collections', {
      collection: 'categories',
      meta: { singleton: false, sort_field: 'sort', icon: 'category', display_template: '{{name}}' },
      schema: {},
      fields: [
        { field: 'id', type: 'integer', meta: { hidden: true, interface: 'input', readonly: true }, schema: { is_primary_key: true, has_auto_increment: true } },
        { field: 'name', type: 'string', meta: { interface: 'input', required: true, width: 'half' }, schema: {} },
        { field: 'slug', type: 'string', meta: { interface: 'input', width: 'half', note: 'Identificador único (ex: velas)' }, schema: {} },
        { field: 'sort', type: 'integer', meta: { interface: 'input-integer', hidden: true }, schema: { is_nullable: true } },
      ],
    });
    console.log('✓ categories criada');
  }

  if (await itemsExist('categories')) {
    console.log('✓ categorias já semeadas');
  } else {
    await api('POST', '/items/categories', [
      { name: 'Velas', slug: 'velas', sort: 1 },
      { name: 'Arranjos', slug: 'arranjos', sort: 2 },
      { name: 'Kits', slug: 'kits', sort: 3 },
    ]);
    console.log('✓ 3 categorias semeadas');
  }
}

// ─── 2. site_settings ─────────────────────────────────────────────────────────

async function createSiteSettings() {
  if (await collectionExists('site_settings')) {
    console.log('✓ site_settings já existe');
  } else {
    await api('POST', '/collections', {
      collection: 'site_settings',
      meta: { singleton: true, icon: 'settings', display_template: '{{brand_name}}' },
      schema: {},
      fields: [
        { field: 'id', type: 'integer', meta: { hidden: true, interface: 'input', readonly: true }, schema: { is_primary_key: true, has_auto_increment: true } },
        { field: 'brand_name', type: 'string', meta: { interface: 'input', width: 'half', note: 'Nome da marca exibido no site' }, schema: {} },
        { field: 'tagline', type: 'string', meta: { interface: 'input', width: 'half', note: 'Frase curta usada em SEO e footer' }, schema: {} },
        { field: 'whatsapp_number', type: 'string', meta: { interface: 'input', width: 'half', note: 'DDI+DDD+número, somente dígitos (ex: 5548988418141)' }, schema: {} },
        { field: 'whatsapp_default_message', type: 'text', meta: { interface: 'input-multiline', width: 'half', note: 'Pré-preenchida quando o usuário clica em CTA genérico' }, schema: {} },
        { field: 'instagram_url', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
        { field: 'contact_email', type: 'string', meta: { interface: 'input', width: 'half' }, schema: {} },
        { field: 'seo_title', type: 'string', meta: { interface: 'input', width: 'full', note: 'Título padrão para SEO e abas do navegador' }, schema: {} },
        { field: 'seo_description', type: 'text', meta: { interface: 'input-multiline', width: 'full', note: 'Descrição padrão para SEO (150–160 caracteres)' }, schema: {} },
        { field: 'og_image', type: 'uuid', meta: { interface: 'file', special: ['file'], display: 'image', width: 'full', note: '1200×630px para compartilhamento em redes' }, schema: { is_nullable: true } },
        { field: 'footer_note', type: 'string', meta: { interface: 'input', width: 'full', note: 'Ex.: NomeDaMarca. Todos os direitos reservados. (ano adicionado automaticamente)' }, schema: {} },
      ],
    });

    await api('POST', '/relations', {
      collection: 'site_settings',
      field: 'og_image',
      related_collection: 'directus_files',
    });

    console.log('✓ site_settings criada');
  }

  if (await singletonSeeded('site_settings')) {
    console.log('✓ site_settings já semeada');
  } else {
    await api('PATCH', '/items/site_settings', {
      brand_name: 'Lumina Velas Artesanais',
      tagline: 'Feitas uma a uma, com as mãos e com carinho. É simples assim.',
      whatsapp_number: '5548988418141',
      whatsapp_default_message: 'Olá! Gostaria de mais informações sobre as velas Lumina.',
      instagram_url: 'https://www.instagram.com/lumina.velasartesanais/',
      contact_email: 'contato@luminavelas.com.br',
      seo_title: 'Lumina | Velas Artesanais & Feitas com Propósito',
      seo_description: 'Velas artesanais feitas à mão com cuidado e carinho. Cada peça é única, personalizada com aromas exclusivos para iluminar seus momentos mais especiais.',
      footer_note: 'Lumina Velas Artesanais. Todos os direitos reservados.',
    });
    console.log('✓ site_settings semeada');
  }
}

// ─── 3. faqs ──────────────────────────────────────────────────────────────────

async function createFaqs() {
  if (await collectionExists('faqs')) {
    console.log('✓ faqs já existe');
  } else {
    await api('POST', '/collections', {
      collection: 'faqs',
      meta: { singleton: false, sort_field: 'sort', icon: 'help', display_template: '{{question}}', note: 'Máximo de 4 perguntas exibidas no site (ordenadas por "sort").' },
      schema: {},
      fields: [
        { field: 'id', type: 'integer', meta: { hidden: true, interface: 'input', readonly: true }, schema: { is_primary_key: true, has_auto_increment: true } },
        { field: 'question', type: 'string', meta: { interface: 'input', width: 'full', required: true }, schema: {} },
        { field: 'answer', type: 'text', meta: { interface: 'input-multiline', width: 'full', required: true }, schema: {} },
        { field: 'sort', type: 'integer', meta: { interface: 'input-integer', hidden: true, note: 'Menor número aparece primeiro. Máx. 4 itens exibidos.' }, schema: { is_nullable: true } },
      ],
    });
    console.log('✓ faqs criada');
  }

  if (await itemsExist('faqs')) {
    console.log('✓ faqs já semeadas');
  } else {
    await api('POST', '/items/faqs', [
      {
        question: 'Como faço meu pedido?',
        answer: 'É simples! Adicione as velas que desejar na cesta, clique em "Enviar Pedido via WhatsApp" e nossa equipe receberá sua seleção pronta. Combinamos os detalhes de entrega e pagamento diretamente pelo WhatsApp.',
        sort: 10,
      },
      {
        question: 'Vocês fazem personalização?',
        answer: 'Sim! Todas as nossas velas podem ser personalizadas com aromas, cores e embalagens especiais para datas comemorativas, casamentos, chás de bebê e presentes corporativos. Entre em contato para conversarmos.',
        sort: 20,
      },
      {
        question: 'Qual o prazo de entrega?',
        answer: 'Para pedidos em Florianópolis, a entrega é feita em até 3 dias úteis. Para outras cidades, enviamos pelos Correios (PAC ou SEDEX) e os prazos variam conforme o destino. Combinamos tudo antes de confirmar o pedido.',
        sort: 30,
      },
      {
        question: 'As velas são seguras para usar em casa?',
        answer: 'Sim! Usamos ceras 100% vegetais e fragrâncias testadas para uso interno. Siga sempre as instruções de uso: queime no máximo 4 horas por vez, mantenha longe de correntes de ar e superfícies inflamáveis, e nunca deixe velas acesas sem supervisão.',
        sort: 40,
      },
    ]);
    console.log('✓ 4 FAQs semeadas');
  }
}

// ─── 4. privacy_policy ────────────────────────────────────────────────────────

async function createPrivacyPolicy() {
  if (await collectionExists('privacy_policy')) {
    console.log('✓ privacy_policy já existe');
  } else {
    await api('POST', '/collections', {
      collection: 'privacy_policy',
      meta: { singleton: true, icon: 'policy', display_template: '{{title}}' },
      schema: {},
      fields: [
        { field: 'id', type: 'integer', meta: { hidden: true, interface: 'input', readonly: true }, schema: { is_primary_key: true, has_auto_increment: true } },
        { field: 'title', type: 'string', meta: { interface: 'input', width: 'half', required: true }, schema: {} },
        { field: 'last_updated', type: 'date', meta: { interface: 'datetime', display: 'datetime', display_options: { format: 'DD/MM/YYYY' }, width: 'half', note: 'Exibida em formato brasileiro no site' }, schema: {} },
        { field: 'body', type: 'text', meta: { interface: 'input-rich-text-html', width: 'full', note: 'Conteúdo completo da política, suporta HTML' }, schema: {} },
      ],
    });
    console.log('✓ privacy_policy criada');
  }

  if (await singletonSeeded('privacy_policy')) {
    console.log('✓ privacy_policy já semeada');
  } else {
    await api('PATCH', '/items/privacy_policy', {
      title: 'Política de Privacidade',
      last_updated: new Date().toISOString().split('T')[0],
      body: `<h2>1. Informações que coletamos</h2>
<p>Coletamos apenas as informações necessárias para atender seu pedido: nome, endereço de entrega e contato via WhatsApp. Não armazenamos dados de cartão de crédito ou informações financeiras sensíveis.</p>

<h2>2. Como usamos suas informações</h2>
<p>Suas informações são utilizadas exclusivamente para processar e entregar seus pedidos, e para comunicação sobre o status do seu pedido via WhatsApp.</p>

<h2>3. Compartilhamento de dados</h2>
<p>Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, exceto quando necessário para a entrega do pedido (transportadoras).</p>

<h2>4. Segurança</h2>
<p>Adotamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição.</p>

<h2>5. Seus direitos</h2>
<p>Você pode solicitar a exclusão dos seus dados a qualquer momento entrando em contato pelo e-mail contato@luminavelas.com.br ou pelo WhatsApp.</p>

<h2>6. Contato</h2>
<p>Em caso de dúvidas sobre esta política, entre em contato pelo e-mail <strong>contato@luminavelas.com.br</strong>.</p>`,
    });
    console.log('✓ privacy_policy semeada');
  }
}

// ─── 5. Permissões Public ─────────────────────────────────────────────────────

const PUBLIC_POLICY_ID = 'abf8a154-5b1c-4a46-ac9c-7300570f4f17';

async function grantPublicRead(collection) {
  if (await permissionExists(PUBLIC_POLICY_ID, collection, 'read')) {
    console.log(`✓ permissão read Public já existe para ${collection}`);
    return;
  }
  await api('POST', '/permissions', {
    policy: PUBLIC_POLICY_ID,
    collection,
    action: 'read',
    fields: ['*'],
  });
  console.log(`✓ permissão read Public concedida para ${collection}`);
}

// ─── main ─────────────────────────────────────────────────────────────────────

console.log(`\nConectando em ${BASE_URL}...\n`);

try {
  await createCategories();
  await createSiteSettings();
  await createFaqs();
  await createPrivacyPolicy();

  await grantPublicRead('categories');
  await grantPublicRead('site_settings');
  await grantPublicRead('faqs');
  await grantPublicRead('privacy_policy');

  console.log('\n✅ Setup Directus concluído com sucesso!\n');
} catch (err) {
  console.error('\n❌ Erro:', err.message);
  process.exit(1);
}
