export const DEFAULT_WHATSAPP_NUMBER = '5548988418141';
export const DEFAULT_WHATSAPP_MESSAGE = 'Olá! Gostaria de mais informações sobre as velas Lumina.';

interface WhatsAppMessageParams {
  productName?: string;
  price?: number;
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
  } else if (params?.productName && params?.price) {
    message = `Olá! Tenho interesse no produto: *${params.productName}* (R$ ${params.price.toFixed(2)}). Poderia me dar mais informações?`;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
