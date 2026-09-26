import Link from "next/link";
import Icon from "@/components/Icon";

/** Fixed bottom bar on phones: plan a visit + watch. */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-parchment/95 p-2.5 backdrop-blur sm:hidden [padding-bottom:max(0.625rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-[1.3fr_1fr] gap-2">
        <Link href="/visit/" className="flex min-h-12 items-center justify-center rounded-full bg-gold font-semibold text-night">
          Plan a visit
        </Link>
        <Link href="/watch/" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-night font-semibold text-paper">
          <Icon name="play" className="h-3.5 w-3.5" /> Watch
        </Link>
      </div>
    </div>
  );
}
