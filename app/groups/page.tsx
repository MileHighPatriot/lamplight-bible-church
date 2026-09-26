import type { Metadata } from "next";
import Photo from "@/components/Photo";
import PageHead from "@/components/PageHead";
import SectionHead from "@/components/SectionHead";
import GroupFinder from "@/components/tools/GroupFinder";
import Button from "@/components/ui/Button";
import { groups } from "@/data/groups";

export const metadata: Metadata = {
  title: "Home Groups",
  description: `Find a Lamplight home group near you: ${groups.length} groups across Greenwood Village, Centennial, Englewood, Littleton, Highlands Ranch, Lone Tree, Aurora, the Tech Center, and online.`,
};

export default function GroupsPage() {
  return (
    <>
      <PageHead
        eyebrow="Home groups"
        title={
          <>
            A big church gets small
            <br />
            <em className="text-gold-soft">around a kitchen table.</em>
          </>
        }
        lede="Most groups meet in homes around the south metro, share a meal, and talk through the passage we taught on Sunday. It's the best way to go from knowing faces to having friends."
      />
      <section className="grain section-y">
        <div className="wrap">
          <GroupFinder />
        </div>
      </section>
      <section className="bg-paper section-y">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="reveal aspect-[4/3] overflow-hidden rounded-[1.75rem]">
            <Photo name="friends-laughing" alt="Friends laughing together outdoors" sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover" />
          </div>
          <div>
            <SectionHead
              eyebrow="Lead a group"
              title="Have a living room and a free night?"
              lede="You don't need to be a Bible teacher. Hosts open their home, keep the conversation friendly, and follow the discussion guide we write each week. We'll train you and pair you with a co-host."
            />
            <div className="reveal mt-8">
              <Button href="mailto:grace@lamplight.example" variant="night">
                Talk to Grace about hosting
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
