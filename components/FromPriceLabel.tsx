interface FromPriceLabelProps {
  /** Tamanho do texto e layout do rótulo (ex.: "text-xs", "block text-xs"). */
  className?: string;
}

/**
 * Rótulo "A partir de" exibido antes de todo valor — o preço pode não ser o final.
 */
export default function FromPriceLabel({ className = '' }: FromPriceLabelProps) {
  return (
    <span className={`font-normal text-muted-brown ${className}`}>
      A partir de
    </span>
  );
}
