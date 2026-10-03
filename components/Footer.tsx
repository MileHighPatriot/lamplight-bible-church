import Link from "next/link";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { footerNav } from "@/data/nav";
import { fullAddress, mapsHref, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-night pb-24 text-paper sm:pb-0">
      <div className="wrap grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr] lg:py-20">
        <div>
          <Logo />
          <p className="scripture mt-6 max-w-sm text-xl leading-snug text-paper/90">&ldquo;{site.verse.text}&rdquo;</p>
          <p className="mt-2 text-sm text-mist">{site.verse.ref}</p>
          <div className="mt-8 grid gap-2.5 text-[0.95rem] text-paper/80">
            <a href={mapsHref} target="_blank" rel="noreferrer" className="flex gap-2.5 hover:text-gold">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {fullAddress}
            </a>
            <a href={site.phoneHref} className="flex gap-2.5 hover:text-gold">
              <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {site.phone} · Office {site.officeHours}
            </a>
            <a href={`mailto:${site.email}`} className="flex gap-2.5 hover:text-gold">
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {site.email}
            </a>
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {footerNav.map((col) => (
            <div key={col.title}>
              <p className="eyebrow text-gold">{col.title}</p>
              <ul className="mt-4 grid gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-paper/80 hover:text-paper">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-mist sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Independent · Non-denominational · Greenwood Village, Colorado.
          </p>
          <p>
            <strong className="text-paper/80">Concept project</strong> designed by{" "}
            <a href="https://5280webs.com" className="underline decoration-gold/60 underline-offset-2 hover:text-gold">
              5280 Web Solutions
            </a>
            . Lamplight is fictional; people and details are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}
