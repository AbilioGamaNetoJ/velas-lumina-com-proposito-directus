export const DEFAULT_WHATSAPP_NUMBER = '5548988418141';
export const DEFAULT_WHATSAPP_MESSAGE = 'Olá! Gostaria de mais informações sobre as velas Lumina.';

interface WhatsAppMessageParams {
  productName?: string;
  price?: number;
  notifyMe?: boolean;
  customMessage?: string;
  number?: string;
  defaultMessage?: string;
}

export function buildWhatsAppURL(params?: WhatsAppMessageParams): string {
  const number = params?.number ?? DEFAULT_WHATSAPP_NUMBER;
  const defaultMsg = params?.defaultMessage ?? DEFAULT_WHATSAPP_MESSAGE;

  let message = defaultMsg;
  if (params?.customMessage) {
    message = params.customMessage;
  } else if (params?.notifyMe && params?.productName) {
    message = `Olá! Gostaria de ser avisado(a) quando o produto *${params.productName}* estiver disponível novamente.`;
  } else if (params?.productName && params?.price) {
    message = `Olá! Tenho interesse no produto: *${params.productName}* (a partir de R$ ${params.price.toFixed(2)}, valor sujeito a confirmação). Poderia me dar mais informações?`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export interface CartOrderItem {
  name: string;
  category: string;
  quantity: number;
  price: number;
  quantityLabel?: string;
}

export function buildCartOrderMessage(brandName: string, items: CartOrderItem[]): string {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  let message = `*${brandName} - Meu Pedido*\n\n`;
  message += `Olá, vim do site da ${brandName} e gostaria de fazer um pedido!\n\n`;

  items.forEach((item, index) => {
    message += `*${index + 1}. ${item.name}*\n`;
    message += `   - Categoria: ${item.category}\n`;
    if (item.quantityLabel) {
      message += `   - Opção: ${item.quantityLabel}\n`;
    }
    message += `   - Qtd: ${item.quantity}x, a partir de R$ ${item.price.toFixed(2)} cada\n\n`;
  });

  message += `---------------------------------\n`;
  message += `*Valor Total Estimado: a partir de R$ ${subtotal.toFixed(2)}*\n`;
  message += `_Os valores acima são "a partir de" e podem não ser o valor final. O valor definitivo será confirmado no atendimento._`;

  return message;
}
