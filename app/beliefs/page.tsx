import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import SectionHead from "@/components/SectionHead";
import BeliefRefs from "@/components/tools/BeliefRefs";
import Button from "@/components/ui/Button";
import { baptistNote, beliefs, distinctives } from "@/data/beliefs";

export const metadata: Metadata = {
  title: "What We Believe",
  description:
    "Lamplight's statement of faith, with every point tied to the Scripture it comes from. Tap a reference to read the verses.",
};

const closedHand = [
  "The Bible is God's Word and our final authority.",
  "One God in three persons.",
  "Jesus is fully God and fully man, crucified and bodily risen.",
  "Salvation by grace through faith in Christ alone.",
  "Jesus is coming back.",
];

const openHand = [
  "The timing of the end-times events",
  "How the spiritual gifts work today",
  "Predestination and free will",
  "Bible translations",
  "Schooling choices for your kids",
];

export default function BeliefsPage() {
  return (
    <>
      <PageHead
        eyebrow="What we believe"
        title={
          <>
            Nothing new.
            <br />
            <em className="text-gold-soft">Just what the Book says.</em>
          </>
        }
        lede="Here's our statement of faith in plain English. Every point is tied to the passages it comes from, so you can check our work. Tap any reference to read it."
      />

      {/* ---------- Distinctives ---------- */}
      <section className="bg-paper">
        <div className="wrap grid gap-px overflow-hidden py-12 sm:grid-cols-2 lg:grid-cols-4">
          {distinctives.map((d, n) => (
            <div key={d.title} className="reveal p-6 lg:border-l lg:border-line lg:first:border-l-0">
              <p className="font-serif text-xl text-ember italic">0{n + 1}</p>
              <h2 className="mt-2 text-[1.75rem]">{d.title}</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Statement of faith ---------- */}
      <section className="grain section-y">
        <div className="wrap grid gap-6 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <nav aria-label="Statement of faith" className="lg:sticky lg:top-8 lg:self-start">
            <p className="eyebrow text-ember">Statement of faith</p>
            <ol className="mt-4 hidden gap-1 lg:grid">
              {beliefs.map((b, n) => (
                <li key={b.id}>
                  <a href={`#${b.id}`} className="flex gap-3 rounded-lg py-1.5 text-stone hover:text-ink">
                    <span className="w-5 font-serif text-ember italic">{n + 1}</span>
                    {b.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <ol className="grid gap-5">
            {beliefs.map((b, n) => (
              <li key={b.id} id={b.id} className="reveal scroll-mt-6 rounded-[1.75rem] bg-parchment p-6 ring-1 ring-line sm:p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-2xl text-ember italic">{n + 1}</span>
                  <h2 className="text-[2rem]">{b.title}</h2>
                </div>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed">{b.body}</p>
                <div className="mt-6">
                  <BeliefRefs id={b.id} refs={b.refs} />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Closed hand / open hand ---------- */}
      <section className="lamp-glow bg-night section-y text-paper" style={{ "--glow-x": "50%", "--glow-y": "0%" } as React.CSSProperties}>
        <div className="wrap">
          <SectionHead
            light
            eyebrow="Unity & liberty"
            title={
              <>
                In essentials, unity.
                <br />
                <em className="text-gold-soft">In the rest, a lot of grace.</em>
              </>
            }
            lede="Some things we hold with a closed fist. Other things sincere, Bible-believing Christians have disagreed about for centuries, and you'll find both views in our pews."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="reveal rounded-[1.75rem] bg-night-2 p-7 ring-1 ring-gold/30 sm:p-9">
              <p className="eyebrow text-gold">Closed hand</p>
              <h3 className="mt-2 text-3xl">We won&rsquo;t budge on these</h3>
              <ul className="mt-6 grid gap-3">
                {closedHand.map((x) => (
                  <li key={x} className="flex gap-3">
                    <Icon name="flame" className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal rounded-[1.75rem] bg-night-2 p-7 ring-1 ring-paper/10 sm:p-9">
              <p className="eyebrow text-mist">Open hand</p>
              <h3 className="mt-2 text-3xl">Friends can disagree on these</h3>
              <ul className="mt-6 grid gap-3">
                {openHand.map((x) => (
                  <li key={x} className="flex gap-3 text-mist">
                    <Icon name="heart" className="mt-1 h-4 w-4 shrink-0 text-sage-soft" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Heritage + next step ---------- */}
      <section className="bg-paper section-y">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="Our roots" title="Independent, but not alone." lede={baptistNote} />
          </div>
          <div className="reveal rounded-[1.75rem] bg-parchment p-7 ring-1 ring-line sm:p-9">
            <Icon name="book" className="h-7 w-7 text-ember" />
            <h3 className="mt-5 text-3xl">Want to go deeper?</h3>
            <p className="mt-3 text-stone">
              Foundations is a six-week class on what we believe and why, taught by the pastors. It starts again October 25, Sundays at
              9:00 in Room 204.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/events/#foundations" variant="night">
                Save a seat
              </Button>
              <Button href="mailto:nate@lamplight.example" variant="ghost">
                Ask Pastor Nate
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
