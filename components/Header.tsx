"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import LivePill from "@/components/LivePill";
import Logo from "@/components/Logo";
import { nav } from "@/data/nav";
import { site } from "@/data/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The concept bar (and the snow banner) above the header change height from screen to screen,
  // so the phone menu is placed at the header's measured bottom edge (top-[7.35rem] is the fallback).
  const headerRef = useRef<HTMLElement>(null);
  const [menuTop, setMenuTop] = useState<number>();
  const placeMenu = () => setMenuTop(headerRef.current?.getBoundingClientRect().bottom);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close the menu after navigating
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) window.addEventListener("resize", placeMenu);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", placeMenu);
    };
  }, [open]);

  const isActive = (href: string) => pathname.startsWith(href.replace(/\/$/, ""));

  return (
    <header ref={headerRef} className="relative z-40 bg-night text-paper">
      <div className="border-b border-paper/10">
        <div className="wrap flex min-h-10 items-center justify-between gap-4 py-2 text-[0.85rem] text-paper/85">
          <LivePill />
          <div className="hidden items-center gap-6 md:flex">
            <span className="text-mist">Sundays 9:00 &amp; 10:45 · Wednesdays 7:00</span>
            <Link href="/give/" className="flex items-center gap-1.5 hover:text-gold">
              <Icon name="gift" className="h-4 w-4" /> Give
            </Link>
            <Link href="/prayer/" className="flex items-center gap-1.5 hover:text-gold">
              <Icon name="hands" className="h-4 w-4" /> Prayer
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap flex h-[4.75rem] items-center justify-between gap-6">
        <Link href="/" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-paper/80 transition-colors hover:text-paper aria-[current=page]:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/visit/"
            className="hidden min-h-11 items-center rounded-full bg-gold px-5 font-semibold text-night transition-colors hover:bg-gold-soft sm:inline-flex"
          >
            Plan a visit
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 ring-1 ring-paper/25 ring-inset lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => {
              placeMenu();
              setOpen((v) => !v);
            }}
          >
            <Icon name={open ? "close" : "menu"} />
            <span className="text-sm font-semibold">{open ? "Close" : "Menu"}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        style={menuTop === undefined ? undefined : { top: menuTop }}
        className="fixed inset-x-0 bottom-0 top-[7.35rem] overflow-y-auto bg-night text-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="wrap py-6">
          <ul className="grid gap-0.5">
            {[...nav, { href: "/events/", label: "Events" }, { href: "/give/", label: "Give" }, { href: "/prayer/", label: "Prayer" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between border-b border-paper/10 py-4 font-serif text-[1.75rem]"
                >
                  {item.label}
                  <Icon name="arrow" className="h-5 w-5 text-gold" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-mist">
            Sundays 9:00 &amp; 10:45 · Wednesdays 7:00
            <br />
            {site.address.street}, {site.address.city}
          </p>
        </nav>
      </div>
    </header>
  );
}
