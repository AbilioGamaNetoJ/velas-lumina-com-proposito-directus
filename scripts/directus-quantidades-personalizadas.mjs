// Migração: quantidades fixas + valor personalizado, quantidade mínima, tempo de queima
// e rótulos Tamanho/Gramatura. Idempotente (pode rodar quantas vezes quiser).
//
//   node scripts/directus-quantidades-personalizadas.mjs
//     Fase aditiva (segura de rodar ANTES do deploy do site): cria `quantidade_minima` e
//     `tempo_queima`, atualiza o repeater `quantidades`, renomeia os rótulos de `peso`
//     (Gramatura) e `dimensoes` (Tamanho) e ESCONDE `produto_unitario` e `aromas` no painel.
//
//   node scripts/directus-quantidades-personalizadas.mjs --drop-legacy
//     Fase destrutiva — rodar só DEPOIS do deploy do site novo: a versão antiga do site ainda
//     pede `produto_unitario` e `aromas` na query, e se os campos sumirem antes disso a query
//     falha e o site cai no fallback estático (lib/data.ts). Faz backup dos valores em
//     scripts/backups/ e apaga os dois campos.

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
const DROP_LEGACY = process.argv.includes('--drop-legacy');

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

// Cria o campo ou, se já existir, atualiza só o meta (idempotente).
async function upsertField(collection, definition) {
  if (await fieldExists(collection, definition.field)) {
    await api('PATCH', `/fields/${collection}/${definition.field}`, { meta: definition.meta });
    console.log(`✓ ${collection}.${definition.field} atualizado`);
  } else {
    await api('POST', `/fields/${collection}`, definition);
    console.log(`✓ ${collection}.${definition.field} criado`);
  }
}

const pt = (translation) => [{ language: 'pt-BR', translation }];

// ─── Quantidades ───────────────────────────────────────────────────────────

const PRESET_QUANTITIES = [20, 50, 100, 250, 500, 1000];
const CUSTOM_CHOICE = 'personalizado';

const QUANTIDADE_CHOICES = [
  ...PRESET_QUANTITIES.map((q) => ({ text: `${q.toLocaleString('pt-BR')} unidades`, value: String(q) })),
  { text: 'Valor personalizado', value: CUSTOM_CHOICE },
];

async function configureQuantidades() {
  await upsertField('produtos', {
    field: 'quantidades',
    type: 'json',
    meta: {
      interface: 'list',
      special: ['cast-json'],
      width: 'full',
      sort: 18,
      note: 'Escolha as quantidades em que este produto é vendido (uma linha por quantidade). Para uma quantidade fora da lista, escolha "Valor personalizado" e digite o número em "Quantidade personalizada" — você pode adicionar quantas linhas personalizadas quiser, mas nenhuma pode ser menor que a Quantidade Mínima do produto. Preço em branco = quantidade × preço unitário. Se nenhuma linha for adicionada, o site oferece 20, 50, 100, 250, 500 e 1.000 unidades.',
      options: {
        fields: [
          {
            field: 'quantidade',
            name: 'Quantidade',
            type: 'string',
            meta: { interface: 'select-dropdown', options: { choices: QUANTIDADE_CHOICES }, width: 'half' },
          },
          {
            field: 'quantidade_personalizada',
            name: 'Quantidade personalizada',
            type: 'integer',
            meta: {
              interface: 'input',
              options: { min: 1, placeholder: 'Só para "Valor personalizado"' },
              width: 'half',
              note: 'Preencha somente se escolheu "Valor personalizado". Não pode ser menor que a Quantidade Mínima.',
            },
          },
          {
            field: 'preco',
            name: 'Preço (R$)',
            type: 'float',
            meta: {
              interface: 'input',
              width: 'half',
              note: 'Valor total desta quantidade. Deixe em branco para calcular automaticamente (quantidade × preço unitário).',
            },
          },
        ],
      },
      translations: pt('Quantidades Disponíveis'),
    },
    schema: { is_nullable: true },
  });
}

async function configureQuantidadeMinima() {
  await upsertField('produtos', {
    field: 'quantidade_minima',
    type: 'integer',
    meta: {
      interface: 'input',
      options: { min: 1, placeholder: '20' },
      width: 'half',
      sort: 19,
      note: 'Menor quantidade que pode ser comprada como "Valor personalizado" (inclusive a digitada pelo cliente no site). Aparece na página do produto.',
      translations: pt('Quantidade Mínima'),
    },
    schema: { is_nullable: true, default_value: 20 },
  });
}

// ─── Especificações do produto ─────────────────────────────────────────────

async function configureSpecs() {
  await upsertField('produtos', {
    field: 'tempo_queima',
    type: 'string',
    meta: {
      interface: 'input',
      width: 'full',
      sort: 12,
      note: 'Tempo de queima da vela (ex: 30 horas). Exibido na página do produto como "Queima".',
      translations: pt('Queima'),
    },
    schema: { is_nullable: true },
  });

  await api('PATCH', '/fields/produtos/peso', {
    meta: { translations: pt('Gramatura'), note: 'Gramatura do produto (ex: 120g).' },
  });
  console.log('✓ produtos.peso → rótulo "Gramatura"');

  await api('PATCH', '/fields/produtos/dimensoes', {
    meta: { translations: pt('Tamanho'), note: 'Tamanho do produto (ex: 8cm x 10cm).' },
  });
  console.log('✓ produtos.dimensoes → rótulo "Tamanho"');

  await api('PATCH', '/fields/produtos/preco', {
    meta: {
      note: 'Preço de 1 unidade. Usado para calcular o valor das quantidades sem preço próprio (quantidade × preço) e das quantidades personalizadas digitadas no site. O site sempre exibe os valores como "a partir de".',
    },
  });
  console.log('✓ produtos.preco → nota atualizada');

  await api('PATCH', '/fields/produtos/descricao_produto', {
    meta: { note: 'Texto exibido abaixo da imagem principal do produto, junto com tamanho, gramatura, queima e aroma.' },
  });
  console.log('✓ produtos.descricao_produto → nota atualizada');
}

// ─── Campos legados ────────────────────────────────────────────────────────

const LEGACY_FIELDS = ['produto_unitario', 'aromas'];

async function hideLegacyFields() {
  for (const field of LEGACY_FIELDS) {
    if (!(await fieldExists('produtos', field))) {
      console.log(`  (produtos.${field} já não existe)`);
      continue;
    }
    await api('PATCH', `/fields/produtos/${field}`, { meta: { hidden: true, sort: 90 } });
    console.log(`✓ produtos.${field} escondido no painel`);
  }
}

async function dropLegacyFields() {
  const existing = [];
  for (const field of LEGACY_FIELDS) {
    if (await fieldExists('produtos', field)) existing.push(field);
  }
  if (existing.length === 0) {
    console.log('  (campos legados já não existem)');
    return;
  }

  const dir = 'scripts/backups';
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const items = await api('GET', `/items/produtos?fields=id,nome,${existing.join(',')}&limit=-1`);
  const path = `${dir}/backup-legado-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  writeFileSync(path, JSON.stringify(items, null, 2));
  console.log(`✓ Backup de ${existing.join(', ')} salvo em ${path}`);

  for (const field of existing) {
    await api('DELETE', `/fields/produtos/${field}`);
    console.log(`✓ campo removido: produtos.${field}`);
  }
}

// ─── main ───────────────────────────────────────────────────────────────────

console.log(`\nConectando em ${BASE_URL}${DROP_LEGACY ? ' (fase --drop-legacy)' : ''}...\n`);

try {
  if (DROP_LEGACY) {
    await dropLegacyFields();
  } else {
    await configureQuantidades();
    await configureQuantidadeMinima();
    await configureSpecs();
    await hideLegacyFields();
  }
  console.log('\n✅ Concluído!\n');
} catch (err) {
  console.error('\n❌ Erro:', err.message);
  process.exit(1);
}
