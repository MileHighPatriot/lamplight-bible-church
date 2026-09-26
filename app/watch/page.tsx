import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import LivePlayer from "@/components/tools/LivePlayer";
import SermonNotes from "@/components/tools/SermonNotes";
import Button from "@/components/ui/Button";
import { bookByName } from "@/data/bible";
import { site } from "@/data/site";
import { messages, upcoming } from "@/data/teaching";

export const metadata: Metadata = {
  title: "Watch Live",
  description: "Watch Lamplight live Sundays at 10:45am and Wednesdays at 7pm, or catch up on any message from the archive.",
};

const fmt = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export default function WatchPage() {
  const recent = messages.slice(0, 6);
  const sunday = upcoming.find((u) => u.service === "sunday")!;
  return (
    <>
      <PageHead
        eyebrow="Watch"
        title={
          <>
            Wherever you are,
            <br />
            <em className="text-gold-soft">you&rsquo;re with us.</em>
          </>
        }
        lede="Home sick, traveling for work, or checking us out before you visit? The 10:45 Sunday service and Wednesday night study stream live, and every message is in the archive."
      />
      <section className="bg-night-2 pb-16 text-paper sm:pb-24">
        <div className="wrap relative z-10 -mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <LivePlayer />
          <div className="grid content-start gap-4">
            <div className="rounded-[1.5rem] bg-night p-6 ring-1 ring-paper/10">
              <p className="eyebrow text-gold">Watching from home?</p>
              <p className="mt-2 font-serif text-2xl">Say hello</p>
              <p className="mt-2 text-mist">
                Let us know you tuned in and how we can pray for you. A real person on our team reads every message.
              </p>
              <Link href="/prayer/" className="mt-4 inline-flex items-center gap-2 font-semibold text-gold">
                Send a note <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <a href={site.youtube} className="flex items-center gap-2 rounded-2xl bg-night p-4 text-sm font-semibold ring-1 ring-paper/10 hover:ring-gold">
                <Icon name="play" className="h-4 w-4 text-gold" /> YouTube
              </a>
              <a href="#podcast" className="flex items-center gap-2 rounded-2xl bg-night p-4 text-sm font-semibold ring-1 ring-paper/10 hover:ring-gold">
                <Icon name="headphones" className="h-4 w-4 text-gold" /> Podcast
              </a>
            </div>
            <Button href="/give/" variant="outline-light" className="w-full">
              Give online
            </Button>
          </div>
        </div>
      </section>

      <section className="grain section-y">
        <div className="wrap grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <SermonNotes
            id="2026-09-27"
            title={sunday.title}
            refText={`${sunday.ref} · This Sunday`}
            points={[
              ["We don't always know ", { blank: "what" }, " to pray, but the Spirit helps us in our ", { blank: "weakness" }, "."],
              ["When words fail, the Spirit ", { blank: "intercedes" }, " for us with groanings too deep for words."],
              ["God searches the heart and knows the ", { blank: "mind" }, " of the Spirit."],
              ["The Spirit always prays ", { blank: "according" }, " to the will of God, so no prayer is wasted."],
            ]}
          />
          <div>
            <p className="font-serif text-3xl">Recent messages</p>
            <ul className="mt-5 grid gap-2">
              {recent.map((m) => (
                <li key={m.id}>
                  <Link
                    href={`/teaching/${bookByName[m.passage.book].slug}/?m=${m.id}`}
                    className="group flex items-center gap-4 rounded-2xl bg-paper p-4 ring-1 ring-line hover:ring-gold"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-night text-gold">
                      <Icon name="play" className="ml-0.5 h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-semibold">{m.service === "sunday" ? m.title : m.ref}</span>
                      <span className="block text-sm text-stone">
                        {m.service === "sunday" ? `${m.ref} · Sunday` : "Wednesday"} · {fmt(m.date)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <div id="podcast" className="mt-6 rounded-2xl bg-sage-soft p-5">
              <p className="font-semibold">Lamplight Teaching podcast</p>
              <p className="mt-1 text-[0.95rem] text-stone">
                Every Sunday and Wednesday message, audio only, usually up by Monday morning. Search &ldquo;Lamplight
                Teaching&rdquo; in Apple Podcasts or Spotify.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
