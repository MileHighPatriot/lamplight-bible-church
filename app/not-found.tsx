import { Mark } from "@/components/Logo";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="lamp-glow relative overflow-hidden border-b border-paper/10 bg-night text-paper" style={{ "--glow-x": "50%", "--glow-y": "30%" } as React.CSSProperties}>
      <div className="wrap flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <Mark className="h-14 w-14 animate-flicker text-paper" />
        <p className="eyebrow mt-8 text-gold">404 · Page not found</p>
        <h1 className="display mt-4 max-w-3xl">
          This page wandered off.
          <br />
          <em className="text-gold-soft">We&rsquo;ll leave the light on.</em>
        </h1>
        <p className="scripture mt-6 max-w-lg text-xl text-mist">&ldquo;I will seek that which was lost.&rdquo; Ezekiel 34:16</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/teaching/" variant="outline-light">
            Browse the teaching
          </Button>
        </div>
      </div>
    </section>
  );
}
