import Link from "next/link";
import Icon from "@/components/Icon";

type Variant = "gold" | "night" | "outline" | "outline-light" | "ghost";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-night hover:bg-gold-soft shadow-[0_10px_30px_-12px_rgb(229_171_69/0.8)]",
  night: "bg-night text-paper hover:bg-night-3",
  outline: "ring-1 ring-inset ring-ink/25 text-ink hover:ring-ink hover:bg-paper",
  "outline-light": "ring-1 ring-inset ring-paper/30 text-paper hover:ring-paper hover:bg-paper/5",
  ghost: "text-ember hover:text-ink underline-offset-4 hover:underline",
};

export default function Button({
  href,
  children,
  variant = "gold",
  arrow = true,
  className = "",
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  external?: boolean;
}) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.98rem] font-semibold transition-colors ${styles[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow ? <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
