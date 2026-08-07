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

async function fieldExists(collection, field) {
  try { await api('GET', `/fields/${collection}/${field}`); return true; } catch { return false; }
}

async function deleteFieldIfExists(collection, field) {
  if (await fieldExists(collection, field)) {
    await api('DELETE', `/fields/${collection}/${field}`);
    console.log(`✓ campo antigo removido: ${collection}.${field}`);
  } else {
    console.log(`  (${collection}.${field} já não existe)`);
  }
}

// ─── Backup dos campos que serão removidos ─────────────────────────────────

const BACKUP_DIR = 'scripts/backups';

async function backupSpecFields() {
  if (!existsSync(BACKUP_DIR)) mkdirSync(BACKUP_DIR, { recursive: true });
  const items = await api('GET', '/items/produtos?fields=id,nome,tempo_queima,intensidade_aroma&limit=-1');
  const path = `${BACKUP_DIR}/backup-quantidade-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  writeFileSync(path, JSON.stringify(items, null, 2));
  console.log(`✓ Backup de tempo_queima/intensidade_aroma salvo em ${path}`);
  return items;
}

// ─── Novo campo: descricao_produto ─────────────────────────────────────────

async function createDescricaoProduto() {
  if (await fieldExists('produtos', 'descricao_produto')) {
    console.log('✓ descricao_produto já existe');
    return;
  }
  await api('POST', '/fields/produtos', {
    field: 'descricao_produto',
    type: 'text',
    meta: {
      interface: 'input-multiline',
      width: 'full',
      note: 'Texto exibido abaixo da imagem principal do produto, junto com dimensões, peso e composição aromática.',
      translations: [{ language: 'pt-BR', translation: 'Descrição do Produto' }],
    },
    schema: { is_nullable: true },
  });
  console.log('✓ descricao_produto criado');
}

// ─── Novos campos: produto_unitario + quantidades ──────────────────────────

const QUANTIDADE_CHOICES = [
  { text: '20 unidades', value: '20' },
  { text: '50 unidades', value: '50' },
  { text: '100 unidades', value: '100' },
];

// NOTA: originalmente esses dois campos ficavam dentro de um grupo visual
// ("opcoes_venda", alias com special:['group']). Removido: nesta instância
// do Directus (11.17.4), qualquer campo com special:['group'] é criado com
// sucesso (responde 200 em GET /fields/produtos/<nome>) mas desaparece da
// listagem GET /fields/produtos que o painel usa para montar o formulário —
// reproduzido até com um campo de grupo mínimo, novo, sem nenhuma
// configuração além do obrigatório. Sem acesso ao servidor para investigar
// mais a fundo, os dois campos abaixo ficam soltos (mesmo comportamento,
// só sem o agrupamento visual).
async function createQuantidadeFields() {
  if (await fieldExists('produtos', 'produto_unitario')) {
    console.log('✓ produto_unitario/quantidades já existem');
    return;
  }
  await api('POST', '/fields/produtos', {
    field: 'produto_unitario',
    type: 'boolean',
    meta: {
      interface: 'boolean',
      width: 'full',
      note: 'Marque se este produto é vendido como peça única. Quando marcado, o seletor de quantidade não aparece para o cliente na página.',
      translations: [{ language: 'pt-BR', translation: 'Produto Unitário' }],
    },
    schema: { default_value: false },
  });
  await api('POST', '/fields/produtos', {
    field: 'quantidades',
    type: 'json',
    meta: {
      interface: 'list',
      special: ['cast-json'],
      width: 'full',
      note: 'Adicione uma linha para cada quantidade que este produto pode ser vendido. Deixe vazio se o produto for unitário.',
      options: {
        fields: [
          { field: 'quantidade', name: 'Quantidade', type: 'string', meta: { interface: 'select-dropdown', options: { choices: QUANTIDADE_CHOICES }, width: 'half' } },
          { field: 'preco', name: 'Preço (R$)', type: 'float', meta: { interface: 'input', width: 'half', note: 'Deixe em branco para calcular automaticamente (quantidade × preço padrão do produto).' } },
        ],
      },
      translations: [{ language: 'pt-BR', translation: 'Quantidades Disponíveis' }],
    },
    schema: { is_nullable: true },
  });
  console.log('✓ produto_unitario + quantidades criados');
}

// ─── Remove campos antigos (Queima / Intensidade) ──────────────────────────

async function removeOldSpecFields() {
  await deleteFieldIfExists('produtos', 'tempo_queima');
  await deleteFieldIfExists('produtos', 'intensidade_aroma');
}

// ─── main ───────────────────────────────────────────────────────────────────

console.log(`\nConectando em ${BASE_URL}...\n`);

try {
  const backedUp = await backupSpecFields();

  await createDescricaoProduto();
  await createQuantidadeFields();
  await removeOldSpecFields();

  console.log('\n✅ Concluído!\n');
  console.log('Valores de tempo_queima/intensidade_aroma que existiam antes da remoção:');
  for (const p of backedUp) {
    if (p.tempo_queima || p.intensidade_aroma) {
      console.log(`  - [${p.id}] ${p.nome}: tempo_queima=${p.tempo_queima ?? '—'}, intensidade_aroma=${p.intensidade_aroma ?? '—'}`);
    }
  }
} catch (err) {
  console.error('\n❌ Erro:', err.message);
  process.exit(1);
}
