import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { Mark } from "@/components/Logo";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import GiveForm from "@/components/tools/GiveForm";
import { budget, budgetTotal, givingFaqs, missionaries, otherWays, partners } from "@/data/giving";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Give to Lamplight Bible Church online, by text, by check, or in person. See exactly where the money goes, including our missionaries in Arequipa, Peru.",
};

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function GivePage() {
  return (
    <>
      {/* ---------- Hero + form ---------- */}
      <section className="lamp-glow relative overflow-hidden bg-night text-paper" style={{ "--glow-x": "80%", "--glow-y": "30%" } as React.CSSProperties}>
        <Mark className="pointer-events-none absolute -bottom-24 -left-16 h-[26rem] w-[26rem] text-paper opacity-[0.035]" />
        <div className="wrap relative grid items-start gap-12 pt-14 pb-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pt-20">
          <div className="lg:pt-6">
            <p className="eyebrow animate-rise text-gold">Give</p>
            <h1 className="display mt-4 animate-rise [animation-delay:60ms]">
              Generosity,
              <br />
              <em className="text-gold-soft">not pressure.</em>
            </h1>
            <p className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-mist [animation-delay:120ms] sm:text-xl">
              We don&rsquo;t pass a plate and we won&rsquo;t guilt you. If Lamplight has become your church home, giving is
              how we keep the lights on, the Bible open, and the doors wide for the next family.
            </p>
            <figure className="mt-10 max-w-md animate-rise border-l-2 border-gold/60 pl-5 [animation-delay:180ms]">
              <blockquote className="scripture text-xl leading-snug text-paper/90">
                &ldquo;Let each man give according as he has determined in his heart; not grudgingly, or under compulsion; for God
                loves a cheerful giver.&rdquo;
              </blockquote>
              <figcaption className="eyebrow mt-3 text-mist">2 Corinthians 9:7</figcaption>
            </figure>
          </div>
          <div className="animate-rise [animation-delay:120ms]">
            <GiveForm />
          </div>
        </div>
      </section>

      {/* ---------- Where it goes ---------- */}
      <section className="grain section-y">
        <div className="wrap">
          <SectionHead
            eyebrow="Where it goes"
            title={
              <>
                Every dollar, accounted for.
                <br />
                <em>Here&rsquo;s the 2026 budget.</em>
              </>
            }
            lede={`The elders set a ${usd(budgetTotal)} budget last fall. An independent CPA firm audits the books every year, and anyone at Lamplight can ask to see the annual report.`}
          />
          <div className="reveal mt-12 rounded-[1.75rem] bg-paper p-6 ring-1 ring-line sm:p-8">
            <div className="flex h-5 overflow-hidden rounded-full" role="img" aria-label={budget.map((b) => `${b.label} ${b.pct}%`).join(", ")}>
              {budget.map((b) => (
                <span key={b.label} className={`${b.tone} border-r-2 border-paper last:border-r-0`} style={{ width: `${b.pct}%` }} />
              ))}
            </div>
            <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {budget.map((b) => (
                <li key={b.label} className="flex gap-4">
                  <span className={`mt-2 h-3 w-3 shrink-0 rounded-full ${b.tone}`} />
                  <div>
                    <p className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl">{b.pct}%</span>
                      <span className="font-semibold">{b.label}</span>
                    </p>
                    <p className="text-sm text-stone">
                      {usd((budgetTotal * b.pct) / 100)} · {b.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Missions ---------- */}
      <section className="bg-paper section-y">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal relative">
            <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              <Photo name="mountain" alt="Mountains rising above a valley at dusk" sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-3 gap-2 rounded-2xl bg-night p-4 text-center text-paper shadow-xl sm:left-auto sm:w-96">
              {missionaries.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-3xl text-gold-soft">{s.value}</p>
                  <p className="text-xs text-mist">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-6 lg:pt-0">
            <SectionHead
              eyebrow={`Missions · ${missionaries.place}`}
              title={
                <>
                  Twelve cents of every dollar
                  <br />
                  <em>leaves the building.</em>
                </>
              }
              lede={missionaries.body}
            />
            <p className="reveal mt-4 text-sm font-semibold text-ember">
              {missionaries.names}, sent from Lamplight in {missionaries.since}
            </p>
            <ul className="reveal mt-8 grid gap-4 border-t border-line pt-6">
              {partners.map((p) => (
                <li key={p.name}>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-[0.95rem] text-stone">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Other ways ---------- */}
      <section className="grain section-y">
        <div className="wrap">
          <SectionHead eyebrow="Other ways to give" title="However works for you." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherWays.map((w) => (
              <li key={w.title} className="reveal rounded-[1.5rem] bg-paper p-6 ring-1 ring-line">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-soft text-ember">
                  <Icon name={w.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-2xl">{w.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{w.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <SectionHead eyebrow="Questions" title="Honest answers about money." />
            <div className="divide-y divide-line border-y border-line">
              {givingFaqs.map(([q, a]) => (
                <details key={q} className="group reveal py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-[1.45rem] [&::-webkit-details-marker]:hidden">
                    {q}
                    <Icon name="chevron-down" className="h-5 w-5 shrink-0 text-ember transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 max-w-xl leading-relaxed text-stone">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
