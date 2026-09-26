import Link from "next/link";
import { books, type Section } from "@/data/bible";
import { coverage, wednesdayEta } from "@/data/teaching";

const tint: Record<Section, string> = {
  Law: "#6f5d4b",
  History: "#566553",
  "Poetry & Wisdom": "#6d5264",
  "Major Prophets": "#4f5b78",
  "Minor Prophets": "#46636a",
  "Gospels & Acts": "#7b5f39",
  "Paul's Letters": "#5d5079",
  "General Letters": "#50695d",
  Prophecy: "#77473f",
};

/**
 * Every book of the Bible as a spine on a shelf. The gold fill shows how much
 * of the book Lamplight has taught through; a flame marks the current books.
 * Pure CSS hover/focus details, so it works without JavaScript.
 */
export default function Bookshelf({ compact = false }: { compact?: boolean }) {
  const shelves: [string, typeof books][] = [
    ["Old Testament", books.filter((b) => b.testament === "OT")],
    ["New Testament", books.filter((b) => b.testament === "NT")],
  ];
  const row = compact ? 6.25 : 7.5;
  return (
    <div className="grid gap-8">
      {shelves.map(([label, list]) => (
        <div key={label}>
          <p className="eyebrow mb-3 text-mist">{label}</p>
          <ul
            className="grid justify-start gap-x-[3px]"
            style={{
              gridTemplateColumns: `repeat(auto-fill, ${compact ? "1.35rem" : "1.6rem"})`,
              gridAutoRows: `${row}rem`,
              alignItems: "end",
              backgroundImage: `repeating-linear-gradient(to bottom, transparent 0 calc(${row}rem - 4px), rgb(229 171 69 / 0.28) calc(${row}rem - 4px) calc(${row}rem - 2px), transparent calc(${row}rem - 2px) ${row}rem)`,
            }}
          >
            {list.map((b) => {
              const c = coverage[b.name];
              const pct = c ? c.chapters.size / b.chapters : 0;
              const h = (compact ? 2.6 : 3.3) + (Math.log(b.chapters + 1) / Math.log(151)) * (compact ? 2.8 : 3.4);
              const eta = !c ? wednesdayEta(b.index) : null;
              return (
                <li key={b.slug} className="relative pb-[4px]" style={{ height: `${h}rem` }}>
                  <Link
                    href={`/teaching/${b.slug}/`}
                    className="group relative block h-full overflow-visible rounded-t-[3px] rounded-b-[1px] outline-none"
                  >
                    <span className="sr-only">{`${b.name}: ${c ? `${c.chapters.size} of ${b.chapters} chapters taught` : "not yet taught"}`}</span>
                    <span
                      className="absolute inset-0 overflow-hidden rounded-[inherit] ring-1 ring-black/25 transition-transform duration-300 ring-inset group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5"
                      style={{ background: tint[b.section] }}
                    >
                      <span
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gold to-gold-soft"
                        style={{ height: `${Math.round(pct * 100)}%`, opacity: pct ? 0.95 : 0 }}
                      />
                      <span className="absolute inset-x-[3px] top-[7px] h-px bg-white/25" />
                      <span className="absolute inset-x-[3px] bottom-[7px] h-px bg-black/20" />
                      {!compact ? (
                        <span
                          aria-hidden="true"
                          className={`absolute inset-0 flex items-center justify-center text-[0.62rem] font-bold tracking-wide whitespace-nowrap [writing-mode:vertical-rl] rotate-180 ${pct > 0.5 ? "text-night/90" : "text-paper/95"}`}
                        >
                          {b.abbr}
                        </span>
                      ) : null}
                    </span>
                    {c?.current ? (
                      <svg
                        viewBox="0 0 12 16"
                        aria-hidden="true"
                        className="absolute -top-5 left-1/2 h-4 w-3 -translate-x-1/2 animate-flicker text-gold drop-shadow-[0_0_6px_rgb(229_171_69)]"
                      >
                        <path d="M6 0c3 3.4 5 6 5 8.9a5 5 0 0 1-10 0C1 6 3 3.4 6 0Z" fill="currentColor" />
                      </svg>
                    ) : null}
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute bottom-[calc(100%+1.6rem)] left-1/2 z-20 hidden w-56 -translate-x-1/2 rounded-xl bg-paper p-3.5 text-left text-ink shadow-2xl group-hover:block group-focus-visible:block"
                    >
                      <span className="block font-serif text-lg leading-tight">{b.name}</span>
                      <span className="mt-1 block text-[0.8rem] text-stone">
                        {c
                          ? `${c.chapters.size} of ${b.chapters} chapters · ${c.messages} message${c.messages === 1 ? "" : "s"}`
                          : `${b.chapters} chapter${b.chapters === 1 ? "" : "s"} · not yet taught`}
                      </span>
                      <span className="mt-1.5 block text-[0.8rem] font-semibold text-ember">
                        {c?.current === "sunday"
                          ? "Now teaching on Sundays"
                          : c?.current === "wednesday"
                            ? "Now teaching on Wednesdays"
                            : c
                              ? [c.sunday && "Sundays", c.wednesday && "Wednesdays"].filter(Boolean).join(" & ")
                              : eta
                                ? `Wednesdays reach it around ${eta}`
                                : ""}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
