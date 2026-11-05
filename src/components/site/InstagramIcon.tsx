type IconProps = { className?: string };

/** Glifo oficial de Instagram con su degradado original (morado → rosado → naranja). */
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="ig-gradient" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FCB045" />
          <stop offset="0.5" stopColor="#FD1D1D" />
          <stop offset="1" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <g stroke="url(#ig-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </g>
    </svg>
  );
}
