import { Mark } from "@/components/Logo";

/** Dark page header with a soft circle of lamplight. */
export default function PageHead({
  eyebrow,
  title,
  lede,
  children,
  glow = "78% 20%",
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
  glow?: string;
}) {
  const [x, y] = glow.split(" ");
  return (
    <section
      className="lamp-glow relative overflow-hidden bg-night text-paper"
      style={{ "--glow-x": x, "--glow-y": y } as React.CSSProperties}
    >
      <Mark className="pointer-events-none absolute -right-16 -bottom-24 h-[26rem] w-[26rem] text-paper opacity-[0.035]" />
      <div className="wrap relative pt-14 pb-16 sm:pt-20 sm:pb-20">
        <p className="eyebrow animate-rise text-gold">{eyebrow}</p>
        <h1 className="display mt-4 max-w-4xl animate-rise [animation-delay:60ms]">{title}</h1>
        {lede ? (
          <p className="mt-6 max-w-2xl animate-rise text-lg leading-relaxed text-mist [animation-delay:120ms] sm:text-xl">
            {lede}
          </p>
        ) : null}
        {children ? <div className="mt-8 animate-rise [animation-delay:180ms]">{children}</div> : null}
      </div>
    </section>
  );
}
