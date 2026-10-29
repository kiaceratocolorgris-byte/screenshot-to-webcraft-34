/* Inline SVG flags: Windows browsers do not render flag emojis, so the
   language switcher draws the flags as SVG to show them on every platform. */

export function USFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 19 10" className={className} role="img" aria-label="Bandera de Estados Unidos">
      <rect width="19" height="10" fill="#B22234" />
      <g fill="#fff">
        <rect y="1.54" width="19" height="0.77" />
        <rect y="3.08" width="19" height="0.77" />
        <rect y="4.62" width="19" height="0.77" />
        <rect y="6.15" width="19" height="0.77" />
        <rect y="7.69" width="19" height="0.77" />
        <rect y="9.23" width="19" height="0.77" />
      </g>
      <rect width="7.6" height="5.38" fill="#3C3B6E" />
      <g fill="#fff">
        {[0.7, 2.1, 3.5, 4.9, 6.3].map((x) =>
          [0.7, 2.3, 3.9].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.32" />),
        )}
      </g>
    </svg>
  );
}

export function ESFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 19 10" className={className} role="img" aria-label="Bandera de España">
      <rect width="19" height="10" fill="#AA151B" />
      <rect y="2.5" width="19" height="5" fill="#F1BF00" />
      <rect x="3.5" y="3.9" width="2" height="2.2" rx="0.3" fill="#AD1519" opacity="0.85" />
    </svg>
  );
}
