import { chromium } from "playwright";
import fs from "fs";
const [out, tag, ...terms] = process.argv.slice(2);
fs.mkdirSync(`${out}/${tag}`, { recursive: true });
const b = await chromium.launch({ channel: "chrome", headless: true, args: ["--disable-blink-features=AutomationControlled"] });
const ctx = await b.newContext({ userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36" });
const p = await ctx.newPage();
const all = [];
const seen = new Set();
for (const t of terms) {
  await p.goto(`https://stocksnap.io/search/${encodeURIComponent(t)}`, { waitUntil: "domcontentloaded" });
  await p.waitForTimeout(3500);
  for (let i = 0; i < 3; i++) { await p.mouse.wheel(0, 4000); await p.waitForTimeout(900); }
  const imgs = await p.$$eval("img", (els) => els.map((e) => e.src).filter((s) => s.includes("cdn.stocksnap.io/img-thumbs")));
  for (const s of imgs) {
    const file = s.split("/").pop();
    if (seen.has(file)) continue;
    seen.add(file);
    all.push({ term: t, file, id: file.replace(/\.jpg$/, "").split("_").pop() });
  }
  console.log(t, imgs.length);
}
fs.writeFileSync(`${out}/${tag}/index.json`, JSON.stringify(all, null, 1));
await b.close();
