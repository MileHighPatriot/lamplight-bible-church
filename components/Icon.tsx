const paths: Record<string, React.ReactNode> = {
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  "arrow-left": <path d="M19 12H5m6-6-6 6 6 6" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  play: <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />,
  pause: <path d="M8 5v14M16 5v14" />,
  live: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M7.8 7.8a6 6 0 0 0 0 8.4m8.4-8.4a6 6 0 0 1 0 8.4M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14" />
    </>
  ),
  book: (
    <>
      <path d="M3 5.5c3.2-1.3 6.2-1.3 9 .8 2.8-2.1 5.8-2.1 9-.8v13c-3.2-1.3-6.2-1.3-9 .8-2.8-2.1-5.8-2.1-9-.8v-13Z" />
      <path d="M12 6.3v13" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19.5c.6-3.3 3-5.2 6-5.2s5.4 1.9 6 5.2" />
      <path d="M15.5 5.6a3.1 3.1 0 0 1 0 5.9M17.8 14.6c1.7.7 2.8 2.4 3.2 4.9" />
    </>
  ),
  child: (
    <>
      <circle cx="12" cy="6" r="2.6" />
      <path d="M7 11.5 12 10l5 1.5M12 10v5m-3 6 3-6 3 6" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" />,
  hands: (
    <>
      <path d="M12 21V12.5L9.2 4.8a1.3 1.3 0 0 0-2.4.5L7 13l-2.4 3.2A2 2 0 0 0 5 19l2 2" />
      <path d="M12 21V12.5l2.8-7.7a1.3 1.3 0 0 1 2.4.5L17 13l2.4 3.2A2 2 0 0 1 19 19l-2 2" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M3 9h18M12 9v11M12 9c-2.5 0-5-1-5-3a2 2 0 0 1 4-.5L12 9Zm0 0c2.5 0 5-1 5-3a2 2 0 0 0-4-.5L12 9Z" />
    </>
  ),
  phone: <path d="M6.6 3.5h2.8l1.5 4.2-2 1.3a11 11 0 0 0 6.1 6.1l1.3-2 4.2 1.5v2.8a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2Z" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  download: <path d="M12 4v11m-5-5 5 5 5-5M5 20h14" />,
  snow: <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </>
  ),
  train: (
    <>
      <rect x="6" y="3" width="12" height="14" rx="3" />
      <path d="M6 10h12M9 20.5l1.5-3.5m5 3.5-1.5-3.5" />
      <circle cx="9.5" cy="13.5" r=".6" fill="currentColor" />
      <circle cx="14.5" cy="13.5" r=".6" fill="currentColor" />
    </>
  ),
  car: (
    <>
      <path d="M4 16.5V12l2-5h12l2 5v4.5M4 12h16" />
      <path d="M4 16.5h16M6 16.5V19M18 16.5V19" />
      <circle cx="7.5" cy="14" r=".7" fill="currentColor" />
      <circle cx="16.5" cy="14" r=".7" fill="currentColor" />
    </>
  ),
  access: (
    <>
      <circle cx="12" cy="4.5" r="1.8" />
      <path d="M5 8.5h14M12 8.5v5l-3.5 7M12 13.5l3.5 7" />
    </>
  ),
  ear: <path d="M8 9a4.5 4.5 0 1 1 8.2 2.6c-1 1.4-2.2 2-2.2 3.9a2.6 2.6 0 0 1-4.6 1.7M10.5 10a1.8 1.8 0 1 1 3 1.3" />,
  coffee: (
    <>
      <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9Z" />
      <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l11-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  shield: <path d="M12 3.5 5 6v5.5c0 4.3 3 7.6 7 9 4-1.4 7-4.7 7-9V6l-7-2.5Z" />,
  headphones: (
    <>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="3.5" y="14" width="4" height="6" rx="1.5" />
      <rect x="16.5" y="14" width="4" height="6" rx="1.5" />
    </>
  ),
  notes: (
    <>
      <path d="M6 3.5h9l3 3v14H6z" />
      <path d="M9 10h6M9 13.5h6M9 17h4" />
    </>
  ),
  flame: <path d="M12 3c3.6 4.1 5.5 7.3 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 10.3 8.4 7.1 12 3Z" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5Z" />
    </>
  ),
  share: <path d="M12 15V4m-4.5 4.5L12 4l4.5 4.5M5 13v6h14v-6" />,
};

export type IconName = keyof typeof paths;

export default function Icon({ name, className = "h-5 w-5" }: { name: string; className?: string }) {
  const filled = name === "play";
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
