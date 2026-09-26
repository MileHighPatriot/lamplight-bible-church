import type { Metadata } from "next";
import Icon from "@/components/Icon";
import PageHead from "@/components/PageHead";
import Photo from "@/components/Photo";
import SectionHead from "@/components/SectionHead";
import PrayerForm from "@/components/tools/PrayerForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Prayer Requests",
  description:
    "Send a prayer request to the pastors and prayer team at Lamplight Bible Church. Keep it private, share it with the team, or ask a pastor to reach out.",
};

const ways = [
  { icon: "users", title: "Sundays at 8:30am", body: "The prayer team meets in Room 204 before first service to pray over every request by name. Anyone is welcome to join them." },
  { icon: "hands", title: "After every service", body: "Someone from the prayer team is at the front after both services. Come up and they'll pray with you right there." },
  { icon: "phone", title: "In a crisis", body: `Call the church at ${site.phone}. After hours, the message gives you the on-call pastor's number.` },
];

export default function PrayerPage() {
  return (
    <>
      <PageHead
        eyebrow="Prayer"
        title={
          <>
            You don&rsquo;t have to
            <br />
            <em className="text-gold-soft">carry it alone.</em>
          </>
        }
        lede="Whatever you're facing, we'd count it a privilege to pray for you. Every request is read by a pastor and prayed over by name. You can keep it private, and you never need to be part of Lamplight to ask."
      />

      <section className="grain section-y">
        <div className="wrap grid items-start gap-12 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
          <div className="lg:sticky lg:top-8">
            <figure className="reveal">
              <blockquote className="scripture text-2xl leading-snug sm:text-[1.9rem]">
                &ldquo;In the same way, the Spirit also helps our weaknesses, for we don&rsquo;t know how to pray as we ought.&rdquo;
              </blockquote>
              <figcaption className="eyebrow mt-4 text-stone">Romans 8:26 · This Sunday&rsquo;s passage</figcaption>
            </figure>
            <div className="reveal mt-10 hidden aspect-[3/2] overflow-hidden rounded-[1.75rem] lg:block">
              <Photo name="praying" alt="A young woman with head bowed in prayer" sizes="34vw" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="reveal">
            <PrayerForm />
          </div>
        </div>
      </section>

      <section className="bg-paper section-y">
        <div className="wrap">
          <SectionHead eyebrow="Other ways" title="Rather pray with someone in person?" />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {ways.map((w) => (
              <li key={w.title} className="reveal rounded-[1.5rem] bg-parchment p-6 ring-1 ring-line sm:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-soft text-ember">
                  <Icon name={w.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-2xl">{w.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{w.body}</p>
              </li>
            ))}
          </ul>
          <p className="reveal mt-10 max-w-3xl rounded-2xl bg-night p-5 text-sm text-mist sm:p-6">
            <strong className="text-paper">If you&rsquo;re in danger or thinking about ending your life,</strong> please call or text{" "}
            <a href="tel:988" className="font-semibold text-gold underline-offset-4 hover:underline">
              988
            </a>{" "}
            (the Suicide &amp; Crisis Lifeline) or call 911. Then let us know. We want to walk with you.
          </p>
        </div>
      </section>
    </>
  );
}
