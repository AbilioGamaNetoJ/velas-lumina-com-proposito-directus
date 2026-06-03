import { createClient } from 'next-sanity';
import { PRODUCTS } from '../lib/data';

// Make sure to load environment variables. 
// If you run this with tsx, you can do: `npx tsx --env-file=.env.local scripts/import.ts`
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("ERRO: Faltam variáveis de ambiente (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET ou SANITY_API_TOKEN)");
  console.error("Crie um token em https://manage.sanity.io e adicione SANITY_API_TOKEN=seu_token no arquivo .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-06-03',
  useCdn: false,
  token,
});

async function uploadImage(url: string, name: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Falha ao baixar a imagem: ${res.statusText}`);
    const buffer = await res.arrayBuffer();
    
    // Upload the image asset to Sanity
    const asset = await client.assets.upload('image', Buffer.from(buffer), {
      filename: `${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    });
    return asset._id;
  } catch (error) {
    console.error(`Erro ao fazer upload da imagem para ${name}:`, error);
    return null;
  }
}

async function importProducts() {
  console.log("Iniciando a importação de produtos para o Sanity...");
  
  for (const product of PRODUCTS) {
    console.log(`Processando: ${product.name}...`);
    
    // 1. Upload the image to Sanity first
    let imageRef = null;
    if (product.image) {
      console.log(`   Fazendo upload da imagem...`);
      imageRef = await uploadImage(product.image, product.name);
    }

    // 2. Format the product for Sanity
    const sanityProduct = {
      _type: 'product',
      name: product.name,
      slug: {
        _type: 'slug',
        current: product.id,
      },
      subtitle: product.subtitle,
      description: product.description,
      price: product.price,
      category: product.category,
      featured: product.featured || false,
      scents: product.scents || [],
      details: product.details ? {
        weight: product.details.weight,
        burnTime: product.details.burnTime,
        dimensions: product.details.dimensions,
        essenceStrength: product.details.essenceStrength,
      } : undefined,
      image: imageRef ? {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageRef,
        },
      } : undefined,
    };

    // 3. Save to Sanity
    try {
      const result = await client.create(sanityProduct);
      console.log(`✅ Sucesso: ${product.name} criado com o ID ${result._id}`);
    } catch (error) {
      console.error(`❌ Erro ao criar ${product.name}:`, error);
    }
  }
  
  console.log("Importação concluída!");
}

importProducts();
