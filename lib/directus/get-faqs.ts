import { readItems } from '@directus/sdk';
import { directus } from '@/lib/directus';
import type { Faq } from '@/types/types';

const FALLBACK: Faq[] = [
  {
    id: 1,
    question: 'Como faço meu pedido?',
    answer: 'Adicione as velas na cesta e clique em "Enviar Pedido via WhatsApp". Combinamos os detalhes de entrega e pagamento diretamente pelo WhatsApp.',
    sort: 10,
  },
  {
    id: 2,
    question: 'Vocês fazem personalização?',
    answer: 'Sim! Todas as velas podem ser personalizadas com aromas, cores e embalagens especiais. Entre em contato para conversarmos.',
    sort: 20,
  },
  {
    id: 3,
    question: 'Qual o prazo de entrega?',
    answer: 'Para pedidos em Florianópolis, até 3 dias úteis. Para outras cidades, enviamos pelos Correios (PAC ou SEDEX).',
    sort: 30,
  },
  {
    id: 4,
    question: 'As velas são seguras para usar em casa?',
    answer: 'Sim! Usamos ceras 100% vegetais e fragrâncias testadas. Queime no máximo 4 horas por vez e nunca deixe sem supervisão.',
    sort: 40,
  },
];

export async function getFaqs(): Promise<Faq[]> {
  try {
    if (!process.env.NEXT_PUBLIC_DIRECTUS_URL) return FALLBACK;

    const items = await directus.request(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      readItems('faqs' as any, { fields: ['id', 'question', 'answer', 'sort'], sort: ['sort'], limit: 4 })
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const faqs = (items as any[]).map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
      sort: f.sort ?? 0,
    }));

    return faqs.length > 0 ? faqs : FALLBACK;
  } catch (err) {
    console.warn('Falha ao buscar faqs do Directus, usando fallback:', err);
    return FALLBACK;
  }
}
