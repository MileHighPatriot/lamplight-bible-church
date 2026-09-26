import type { Metadata } from "next";
import AreaMap from "@/components/AreaMap";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import VisitPlanner from "@/components/tools/VisitPlanner";
import Button from "@/components/ui/Button";
import { mapsHref, site } from "@/data/site";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "What to expect on your first Sunday at Lamplight: service times, parking, kids check-in, and what happens start to finish. Build your own plan in 30 seconds.",
};

const faqs = [
  ["What should I wear?", "Whatever you're comfortable in. You'll see jeans and hiking boots next to slacks and sundresses. Nobody's checking."],
  ["How long is the service?", "About 75 minutes: 25 minutes of singing, then about 40 minutes of teaching from the Bible, and a short prayer to close."],
  ["Will I be singled out?", "Never. We don't ask guests to stand or raise a hand. If you want to say hi, the welcome table is there after. If not, that's fine too."],
  ["Is there an offering?", "We don't pass a plate. There are giving boxes at the back, and you can give online. Guests are never expected to give."],
  ["Are my kids safe?", "Every volunteer is background-checked and trained, classrooms are in a secure hallway, and kids are released only to the adult with the matching tag."],
  ["What Bible do you use?", "The pastor usually reads from the ESV, but bring whatever you have. There are Bibles under every seat, and ours to keep if you don't own one."],
  ["Can I take communion?", "Yes, if you've trusted in Jesus. We take it together the first Sunday of every month. If you're not sure yet, just pass the plate along."],
  ["What if it snows?", "We almost always meet. If we have to cancel, we post it at the top of this site and email everyone by 6:30am. The 10:45 is always streamed."],
];

export default function VisitPage() {
  return (
    <>
      <PageHead
        eyebrow="Plan a visit"
        title={
          <>
            We saved you a seat.
            <br />
            <em className="text-gold-soft">(And a parking spot.)</em>
          </>
        }
        lede="Visiting a new church can feel like a lot. Answer four quick questions and we'll put together exactly what your morning will look like, from where to park to where the kids go."
      />

      <section className="grain section-y">
        <div className="wrap">
          <VisitPlanner />
        </div>
      </section>

      <section className="bg-paper section-y">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <SectionHead eyebrow="Good questions" title="What people ask before their first Sunday" />
            <div className="reveal relative mt-10 aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              <Photo name="worship-warm" alt="A congregation with hands raised in worship under warm light" sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="divide-y divide-line border-y border-line">
            {faqs.map(([q, a]) => (
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
      </section>

      <section className="section-y">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <AreaMap className="w-full rounded-[1.5rem] ring-1 ring-line" />
          <div>
            <SectionHead eyebrow="Getting here" title={<>{site.address.street}<br /><em>{site.address.city}</em></>} />
            <p className="reveal mt-5 text-lg text-stone">{site.directions}</p>
            <p className="reveal mt-3 text-lg text-stone">{site.lightRail}</p>
            <div className="reveal mt-8">
              <Button href={mapsHref} variant="night">
                Open in Maps
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
