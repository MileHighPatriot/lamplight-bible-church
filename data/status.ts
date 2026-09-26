/**
 * Manual service-status override. When the elders cancel or move services
 * (usually snow), set `closure` and the banner shows on every page.
 * Leave it null the rest of the time; the forecast check still runs.
 */
export const status: { closure: null | { title: string; body: string } } = {
  closure: null,
};

/** Forecast snowfall (inches) on a service day that triggers the heads-up banner. */
export const SNOW_ALERT_INCHES = 3;
