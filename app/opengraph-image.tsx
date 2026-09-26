import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Newsreader TTFs from Google Fonts (fetched at build time; Satori can't read woff2). */
async function newsreader() {
  const css = await (await fetch("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400")).text();
  const url = (style: string) => css.match(new RegExp(`font-style: ${style};[^}]*?url\\((https:[^)]+\\.ttf)\\)`))![1];
  const [normal, italic] = [url("normal"), url("italic")];
  const load = (u: string) => fetch(u).then((r) => r.arrayBuffer());
  return [
    { name: "Newsreader", data: await load(normal), style: "normal" as const, weight: 400 as const },
    { name: "Newsreader Italic", data: await load(italic), style: "normal" as const, weight: 400 as const },
  ];
}

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "radial-gradient(ellipse at 78% 30%, #3b3326 0%, #1c1d2c 38%, #141729 70%)",
          color: "#fffcf5",
          padding: 72,
          fontFamily: "Newsreader",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <path d="M16 3.2c3.3 3.7 5 6.6 5 9.3a5 5 0 0 1-10 0c0-2.7 1.7-5.6 5-9.3Z" fill="#e5ab45" />
            <path d="M16 9.2c1.4 1.7 2.1 3 2.1 4.1a2.1 2.1 0 0 1-4.2 0c0-1.1.7-2.4 2.1-4.1Z" fill="#f6d99d" />
            <path d="M2.5 21.4c4.6-2.4 9.1-2.4 13.5 0 4.4-2.4 8.9-2.4 13.5 0v2.9c-4.6-2-9.1-2-13.5.4-4.4-2.4-8.9-2.4-13.5-.4v-2.9Z" fill="#fffcf5" />
            <path d="M8 27.6h16" stroke="#fffcf5" strokeWidth="1.6" strokeLinecap="round" opacity="0.55" />
          </svg>
          <span style={{ fontSize: 36 }}>{site.name}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 100, letterSpacing: "-0.03em", lineHeight: 1 }}>Come as you are.</div>
          <div style={{ display: "flex", fontSize: 100, fontFamily: "Newsreader Italic", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#f6d99d" }}>
            We&rsquo;ll open the Book together.
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "#aeb2c8" }}>
            Greenwood Village, CO · Verse by verse · Sundays 9:00 &amp; 10:45
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await newsreader() },
  );
}
