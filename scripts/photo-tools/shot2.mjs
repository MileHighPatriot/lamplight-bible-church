import { chromium } from "playwright";
const [out, w, ...pages] = process.argv.slice(2);
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: Number(w), height: Number(w) < 600 ? 844 : 900 } });
for (const spec of pages) {
  const [u, n, click] = spec.split("|");
  await p.goto(u, { waitUntil: "networkidle" });
  await p.addStyleTag({ content: ".reveal{animation:none!important}" });
  if (click) { await p.click(click); await p.waitForTimeout(2500); }
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 180)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}/${n}.png`, fullPage: true });
  console.log(n, await p.evaluate(() => [document.documentElement.scrollWidth, document.title]));
}
await b.close();
