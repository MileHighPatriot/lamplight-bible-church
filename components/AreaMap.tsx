/**
 * Hand-drawn style map of the church's corner of the Tech Center: I-25,
 * Orchard Road, the E/H light rail line and its stations. Not to scale.
 */
export default function AreaMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 380" role="img" aria-labelledby="map-title" className={className}>
      <title id="map-title">
        Map: Lamplight is just east of I-25 on Orchard Road, a six-minute walk from Orchard light rail station.
      </title>
      <rect width="520" height="380" rx="24" fill="var(--color-paper)" />
      {/* blocks */}
      <g fill="var(--color-linen)">
        <rect x="40" y="40" width="120" height="60" rx="8" />
        <rect x="40" y="130" width="100" height="90" rx="8" />
        <rect x="40" y="252" width="130" height="90" rx="8" />
        <rect x="330" y="40" width="150" height="70" rx="8" />
        <rect x="360" y="210" width="120" height="130" rx="8" />
        <rect x="300" y="250" width="40" height="90" rx="8" />
      </g>
      {/* park */}
      <path d="M395 125c30-6 70 4 78 30 6 22-18 38-50 36-34-2-58-16-52-38 3-14 10-25 24-28Z" fill="var(--color-sage-soft)" />
      <text x="424" y="163" textAnchor="middle" fontSize="11" fill="var(--color-sage)" fontWeight="600">Park</text>
      {/* roads */}
      <g stroke="var(--color-line)" strokeWidth="14" strokeLinecap="round" fill="none">
        <path d="M20 118H500" />
        <path d="M20 236H500" />
        <path d="M290 20V360" />
      </g>
      <g fontSize="11" fontWeight="700" fill="var(--color-stone)" letterSpacing="0.08em">
        <text x="440" y="110">BELLEVIEW</text>
        <text x="420" y="228" fill="var(--color-ink)">ORCHARD RD</text>
        <text x="298" y="372" transform="rotate(-90 298 372)" dx="40">YOSEMITE ST</text>
      </g>
      {/* I-25 */}
      <path d="M205 10C190 110 214 190 196 270S178 350 184 380" stroke="#c8b99a" strokeWidth="22" fill="none" strokeLinecap="round" />
      <path d="M205 10C190 110 214 190 196 270S178 350 184 380" stroke="var(--color-paper)" strokeWidth="2" strokeDasharray="10 10" fill="none" />
      <g transform="translate(166 62)">
        <path d="M0 0h26v18c0 7-6 12-13 14C6 30 0 25 0 18Z" fill="#2b5aa8" stroke="#fff" strokeWidth="1.5" />
        <text x="13" y="20" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fff">25</text>
      </g>
      {/* light rail */}
      <path d="M226 14C212 110 236 190 218 270S200 350 206 380" stroke="var(--color-dusk)" strokeWidth="3" fill="none" />
      {[
        [221, 118, "Belleview"],
        [226, 236, "Orchard"],
        [212, 340, "Arapahoe at Village Ctr"],
      ].map(([x, y, n]) => (
        <g key={n as string}>
          <circle cx={x as number} cy={y as number} r="7" fill="var(--color-paper)" stroke="var(--color-dusk)" strokeWidth="3" />
          <text x={(x as number) - 14} y={(y as number) + 22} fontSize="10.5" fontWeight="600" fill="var(--color-dusk)" textAnchor="end">
            {n} Stn
          </text>
        </g>
      ))}
      {/* walking route */}
      <path d="M233 236H310" stroke="var(--color-gold)" strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" fill="none" />
      <text x="258" y="258" fontSize="10" fill="var(--color-ember)" fontWeight="700">6 min walk</text>
      {/* church */}
      <g transform="translate(326 176)">
        <rect x="-12" y="-6" width="96" height="46" rx="10" fill="var(--color-night)" />
        <path d="M6 1c3 3.4 4.6 6 4.6 8.4a4.6 4.6 0 0 1-9.2 0C1.4 7 3 4.4 6 1Z" fill="var(--color-gold)" transform="translate(-2 6)" />
        <text x="16" y="13" fontSize="12" fontWeight="700" fill="var(--color-paper)">Lamplight</text>
        <text x="16" y="29" fontSize="10" fill="var(--color-mist)">Parking in back</text>
        <path d="M30 40l8 12 8-12Z" fill="var(--color-night)" />
      </g>
      <g transform="translate(470 330)" fill="var(--color-stone)" fontSize="11" fontWeight="700">
        <path d="M0-26l6 14h-12Z" fill="var(--color-stone)" />
        <text x="0" y="4" textAnchor="middle">N</text>
      </g>
    </svg>
  );
}
