import { initials, type Person } from "@/data/people";

const tones: Record<Person["tone"], string> = {
  gold: "bg-gold-soft text-ember",
  sage: "bg-sage-soft text-sage",
  dusk: "bg-night-3 text-gold-soft",
  clay: "bg-[#f1d9cb] text-clay-deep",
};

/** Round two-letter monogram standing in for a staff photo. */
export default function Monogram({ name, tone, className = "h-16 w-16 text-2xl" }: { name: string; tone: Person["tone"]; className?: string }) {
  return (
    <span aria-hidden className={`inline-grid shrink-0 place-items-center rounded-full font-serif italic ${tones[tone]} ${className}`}>
      {initials(name)}
    </span>
  );
}
