import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import ReadingPlan from "@/components/tools/ReadingPlan";
import Button from "@/components/ui/Button";
import { PLAN_WEEKS } from "@/data/readingPlan";

export const metadata: Metadata = {
  title: "Read With Us",
  description: `A ${PLAN_WEEKS}-week Bible reading plan that keeps you a step ahead of the teaching: Isaiah and Jeremiah, a psalm a week, and each Sunday's passage in Romans. Track your streak right here.`,
};

const why = [
  {
    title: "Show up ready",
    body: "Saturday's reading is Sunday's passage. You'll walk in having already wrestled with it, and the teaching lands deeper.",
  },
  {
    title: "Ten minutes a day",
    body: "One chapter, Monday through Saturday. Miss a day? Just pick up where you are. The streak is a nudge, not a grade.",
  },
  {
    title: "Talk about it",
    body: "Home groups discuss the same passages each week, so you'll have people to ask when Jeremiah gets confusing. (He will.)",
  },
];

export default function ReadPage() {
  return (
    <>
      <PageHead
        eyebrow="Read with us"
        title={
          <>
            Stay a step
            <br />
            <em className="text-gold-soft">ahead of Sunday.</em>
          </>
        }
        lede={`A ${PLAN_WEEKS}-week plan that follows the teaching. Read the prophets with the Wednesday study, a psalm on Fridays, and each Saturday the passage we'll open on Sunday. Check off each day, and read the text right here if your Bible's out of reach.`}
      />

      <section className="grain section-y">
        <div className="wrap">
          <ReadingPlan />
        </div>
      </section>

      <section className="bg-paper section-y">
        <div className="wrap grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="reveal aspect-[4/3] overflow-hidden rounded-[1.75rem]">
            <Photo name="bible-coffee" alt="An open Bible beside a cup of coffee" sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionHead eyebrow="Why read along" title="The Bible makes more sense with company." />
            <ol className="mt-8 grid gap-6">
              {why.map((w, n) => (
                <li key={w.title} className="reveal flex gap-4">
                  <span className="font-serif text-3xl text-ember italic">{n + 1}</span>
                  <div>
                    <h3 className="text-2xl">{w.title}</h3>
                    <p className="mt-1 text-stone">{w.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="reveal mt-8">
              <Button href="/groups/" variant="night">
                Find a group to read with
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
