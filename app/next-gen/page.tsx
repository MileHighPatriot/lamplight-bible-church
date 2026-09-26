import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Monogram from "@/components/Monogram";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import DriveHome from "@/components/tools/DriveHome";
import Button from "@/components/ui/Button";
import { checkIn, rooms, safety, students } from "@/data/nextgen";
import { staff } from "@/data/people";

export const metadata: Metadata = {
  title: "Kids & Students",
  description:
    "Safe, Bible-teaching classes for newborns through 12th grade, Sundays at 9:00 & 10:45 and Wednesdays at 7:00. Secure check-in, background-checked volunteers, and the same passage the adults hear.",
};

const toneBar: Record<string, string> = {
  gold: "bg-gold",
  sage: "bg-sage",
  clay: "bg-clay",
  dusk: "bg-dusk",
};

export default function NextGenPage() {
  const leaders = staff.filter((p) => p.name === "Rachel Kim" || p.name === "Jordan Pike");
  const kidsRooms = rooms.filter((r) => r.id !== "students");

  return (
    <>
      <PageHead
        eyebrow="Kids & Students · Newborn – 12th grade"
        title={
          <>
            Safe rooms, kind leaders,
            <br />
            <em className="text-gold-soft">and a Bible at every age.</em>
          </>
        }
        lede="Every Sunday at 9:00 and 10:45, and Wednesdays at 7:00, your kids learn the same passage you do, taught at their level. You'll know exactly where they are and who they're with."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#rooms">Find your kid&rsquo;s room</Button>
          <Button href="#students" variant="outline-light">
            Students, grades 6–12
          </Button>
        </div>
      </PageHead>

      {/* ---------- Rooms ---------- */}
      <section id="rooms" className="grain section-y scroll-mt-4">
        <div className="wrap">
          <SectionHead
            eyebrow="Sundays at 9:00 & 10:45"
            title={
              <>
                A room for every age,
                <br />
                <em>all down one secure hallway.</em>
              </>
            }
            lede="Kids classes run during both Sunday services and Wednesday nights. Check in at the kids desk inside the east doors, and a greeter will walk you to the right room."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {kidsRooms.map((r) => (
              <li key={r.id} className="reveal relative flex flex-col overflow-hidden rounded-[1.5rem] bg-paper p-6 ring-1 ring-line">
                <span aria-hidden className={`absolute inset-x-0 top-0 h-1.5 ${toneBar[r.tone]}`} />
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[1.8rem]">{r.name}</h3>
                  <span className="rounded-full bg-parchment px-3 py-1 text-xs font-bold whitespace-nowrap text-stone ring-1 ring-line">{r.room}</span>
                </div>
                <p className="mt-1 font-semibold text-ember">{r.ages}</p>
                <ul className="mt-4 grid flex-1 gap-2 text-[0.95rem] text-stone">
                  {r.rhythm.map((x) => (
                    <li key={x} className="flex gap-2">
                      <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-sage" />
                      {x}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-sm font-semibold">
                  <Icon name="users" className="h-4 w-4 text-ember" /> {r.ratio}
                </p>
              </li>
            ))}
            <li className="reveal flex flex-col justify-between rounded-[1.5rem] bg-night p-6 text-paper">
              <div>
                <p className="eyebrow text-gold">First Sunday?</p>
                <p className="mt-3 font-serif text-[1.7rem] leading-tight">Tell us their ages and we&rsquo;ll map out your whole morning.</p>
              </div>
              <div className="mt-6">
                <Button href="/visit/">Plan your visit</Button>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- Same passage ---------- */}
      <section className="bg-paper section-y">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Same passage, every age"
              title={
                <>
                  Kids hear the same Bible
                  <br />
                  <em>you do. Just smaller words.</em>
                </>
              }
              lede="Our kids curriculum follows the Sunday teaching, so a four-year-old and their parents go home talking about the same verses. Here's this week's, with questions for the car ride."
            />
            <div className="reveal mt-10 hidden aspect-[4/5] w-[70%] overflow-hidden rounded-t-full rounded-b-[1.75rem] lg:block">
              <Photo name="kids-reading" alt="Two children reading a book together in the sunlight" sizes="28vw" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="reveal">
            <DriveHome />
          </div>
        </div>
      </section>

      {/* ---------- Check-in & safety ---------- */}
      <section className="lamp-glow bg-night section-y text-paper" style={{ "--glow-x": "15%", "--glow-y": "10%" } as React.CSSProperties}>
        <div className="wrap">
          <SectionHead
            light
            eyebrow="Check-in & safety"
            title={
              <>
                You&rsquo;ll never wonder
                <br />
                <em className="text-gold-soft">where your kids are.</em>
              </>
            }
            lede="Safety is the first thing parents ask about, so we'll answer it plainly. These policies aren't suggestions. Every volunteer agrees to them in writing."
          />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {checkIn.map((s, n) => (
              <li key={s.title} className="reveal rounded-[1.5rem] bg-night-2 p-6 ring-1 ring-paper/10">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 text-gold">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-3xl text-paper/25 italic">{n + 1}</span>
                </div>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-mist">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="reveal aspect-[3/2] overflow-hidden rounded-[1.75rem]">
              <Photo name="kid-laughing" alt="A young child laughing" sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
            </div>
            <div className="reveal">
              <h3 className="text-3xl">Our non-negotiables</h3>
              <ul className="mt-6 grid gap-3.5">
                {safety.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage text-paper">
                      <Icon name="check" className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-mist">{x}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Students ---------- */}
      <section id="students" className="grain section-y scroll-mt-4">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead
              eyebrow={`Lamplight Students · ${students.grades}`}
              title={
                <>
                  Real questions,
                  <br />
                  <em>real answers from the Book.</em>
                </>
              }
              lede={`Middle and high schoolers meet in The Loft on ${students.when.replace("Wednesdays", "Wednesday nights")}. On Sundays they sit in the service with their families. ${students.series}.`}
            />
            <div className="reveal mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-paper p-5 ring-1 ring-line">
                <Icon name="pin" className="h-5 w-5 text-ember" />
                <p className="mt-3 font-semibold">{students.where}</p>
              </div>
              <div className="rounded-2xl bg-paper p-5 ring-1 ring-line">
                <Icon name="sun" className="h-5 w-5 text-ember" />
                <p className="mt-3 text-[0.95rem]">{students.trip}</p>
              </div>
            </div>
            <p className="reveal mt-8 eyebrow text-stone">Students come from</p>
            <ul className="reveal mt-3 flex flex-wrap gap-2">
              {students.schools.map((s) => (
                <li key={s} className="rounded-full bg-sage-soft px-3 py-1 text-sm font-semibold text-sage">
                  {s}
                </li>
              ))}
            </ul>
            <div className="reveal mt-8">
              <Link href="/events/#students-lockin" className="inline-flex items-center gap-2 font-semibold text-ember hover:underline">
                Fall Lock-in, Nov 20 <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="reveal self-start rounded-[1.75rem] bg-paper p-6 ring-1 ring-line sm:p-8">
            <p className="eyebrow text-ember">A Wednesday night in The Loft</p>
            <ol className="mt-6 grid">
              {students.rhythm.map((r, n) => (
                <li key={r.time} className="relative grid grid-cols-[4.5rem_1fr] gap-4 pb-6 last:pb-0">
                  {n < students.rhythm.length - 1 ? <span aria-hidden className="absolute top-8 bottom-0 left-[2.2rem] w-px bg-line" /> : null}
                  <span className="relative z-10 h-fit rounded-full bg-night py-1 text-center font-serif text-lg text-gold-soft">{r.time}</span>
                  <div>
                    <p className="font-semibold">{r.label}</p>
                    <p className="text-[0.95rem] text-stone">{r.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- Leaders ---------- */}
      <section className="bg-paper section-y">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <div className="grid gap-4">
            {leaders.map((p) => (
              <div key={p.name} className="reveal flex gap-5 rounded-[1.5rem] bg-parchment p-6 ring-1 ring-line">
                <Monogram name={p.name} tone={p.tone} />
                <div>
                  <h3 className="text-2xl">{p.name}</h3>
                  <p className="text-sm font-semibold text-ember">{p.role}</p>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{p.bio}</p>
                  <a href={`mailto:${p.email}`} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ember hover:underline">
                    <Icon name="mail" className="h-4 w-4" /> {p.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div>
            <SectionHead
              eyebrow="Serve with kids"
              title="Sixty volunteers. Room for a few more."
              lede="Most of our kids volunteers serve one Sunday a month, alongside a partner, with the lesson prepped for you. It's the best seat in the building."
            />
            <div className="reveal mt-8 flex flex-wrap gap-3">
              <Button href="mailto:rachel@lamplight.example" variant="night">
                Ask Rachel about serving
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
