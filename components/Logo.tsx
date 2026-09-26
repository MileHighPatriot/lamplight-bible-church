/** The mark: an open Bible whose pages form the dish of an oil lamp, with a flame above. */
export function Mark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path
        d="M16 3.2c3.3 3.7 5 6.6 5 9.3a5 5 0 0 1-10 0c0-2.7 1.7-5.6 5-9.3Z"
        fill="var(--color-gold)"
      />
      <path d="M16 9.2c1.4 1.7 2.1 3 2.1 4.1a2.1 2.1 0 0 1-4.2 0c0-1.1.7-2.4 2.1-4.1Z" fill="var(--color-gold-soft)" />
      <path
        d="M2.5 21.4c4.6-2.4 9.1-2.4 13.5 0 4.4-2.4 8.9-2.4 13.5 0v2.9c-4.6-2-9.1-2-13.5.4-4.4-2.4-8.9-2.4-13.5-.4v-2.9Z"
        fill="currentColor"
      />
      <path d="M16 21.4v3.3" stroke="var(--color-night)" strokeWidth="1" opacity="0.5" />
      <path d="M8 27.6h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.45rem] font-medium tracking-tight">Lamplight</span>
        <span className="mt-1 text-[0.62rem] font-bold tracking-[0.24em] uppercase opacity-70">Bible Church</span>
      </span>
    </span>
  );
}
