"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { site } from "@/data/site";
import { SNOW_ALERT_INCHES, status } from "@/data/status";

type Alert = { title: string; body: string };

const KEY = "ll-snow-v1";

/**
 * Snow heads-up. Checks Open-Meteo (free, no key) for snowfall on the next
 * Sunday or Wednesday and shows a banner if it crosses the threshold.
 * A manual closure in data/status.ts always wins. Add ?snow=1 to preview.
 */
export default function SnowBanner() {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (status.closure) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- manual override from data
      setAlert(status.closure);
      return;
    }
    if (new URLSearchParams(location.search).get("snow") === "1") {
      setAlert({
        title: "Snow in the forecast for Sunday (6–9 in).",
        body: "Services are on for now. If anything changes we'll post it here and email everyone by 6:30am. The 10:45 service is always streamed.",
      });
      return;
    }
    try {
      if (sessionStorage.getItem(KEY) === "dismissed") return setHidden(true);
    } catch {}
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${site.geo.lat}&longitude=${site.geo.lon}` +
      "&daily=snowfall_sum&precipitation_unit=inch&timezone=America%2FDenver&forecast_days=7";
    const ctrl = new AbortController();
    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        const days: string[] = json.daily.time;
        const snow: number[] = json.daily.snowfall_sum;
        for (let i = 0; i < days.length; i++) {
          const dow = new Date(`${days[i]}T12:00:00`).getDay();
          if ((dow === 0 || dow === 3) && snow[i] >= SNOW_ALERT_INCHES) {
            const name = dow === 0 ? "Sunday" : "Wednesday";
            const inches = Math.round(snow[i]);
            setAlert({
              title: `Snow in the forecast for ${name} (about ${inches} in).`,
              body: "Services are on for now. If anything changes we'll post it here and email everyone by 6:30am.",
            });
            return;
          }
        }
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  if (!alert || hidden) return null;
  return (
    <div role="status" className="relative z-50 bg-gold-soft text-night">
      <div className="wrap flex items-start gap-3 py-2.5 text-[0.92rem]">
        <Icon name="snow" className="mt-0.5 h-5 w-5 shrink-0" />
        <p className="flex-1">
          <strong>{alert.title}</strong> {alert.body}
        </p>
        <button
          type="button"
          className="-m-1 rounded-full p-1 hover:bg-night/10"
          onClick={() => {
            setHidden(true);
            try {
              sessionStorage.setItem(KEY, "dismissed");
            } catch {}
          }}
        >
          <Icon name="close" className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </button>
      </div>
    </div>
  );
}
