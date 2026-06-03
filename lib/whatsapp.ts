export const WHATSAPP_NUMBER = '5548988418141';

interface WhatsAppMessageParams {
  productName?: string;
  price?: number;
  customMessage?: string;
}

export function buildWhatsAppURL(params?: WhatsAppMessageParams): string {
  let message = 'Olá! Gostaria de mais informações sobre as velas Lumina.';

  if (params?.customMessage) {
    message = params.customMessage;
  } else if (params?.productName && params?.price) {
    message = `Olá! Tenho interesse no produto: *${params.productName}* (R$ ${params.price.toFixed(2)}). Poderia me dar mais informações?`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
