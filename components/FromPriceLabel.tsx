interface FromPriceLabelProps {
  /** Tamanho do texto e layout do rótulo (ex.: "text-xs", "block text-[10px]"). O "A" inicial é sempre 1.5x maior. */
  className?: string;
}

/**
 * Rótulo "A partir de" exibido antes de todo valor — o preço pode não ser o final.
 * O "A" maiúsculo, maior e em negrito dá destaque ao aviso na página.
 */
export default function FromPriceLabel({ className = '' }: FromPriceLabelProps) {
  return (
    <span className={`font-normal text-muted-brown ${className}`}>
      <span className="text-[1.5em] font-bold leading-none text-primary">A</span> partir de
    </span>
  );
}
