"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { funds } from "@/data/giving";

const presets = [25, 50, 100, 250];
const frequencies = [
  { id: "once", label: "One time", perYear: 1, word: "" },
  { id: "week", label: "Weekly", perYear: 52, word: "every week" },
  { id: "2week", label: "Every 2 weeks", perYear: 26, word: "every two weeks" },
  { id: "month", label: "Monthly", perYear: 12, word: "every month" },
] as const;
type Freq = (typeof frequencies)[number]["id"];
type Method = "bank" | "card";

/** Typical processing rates for church giving platforms. */
const fee = (amount: number, method: Method) => (method === "card" ? amount * 0.0215 + 0.3 : amount * 0.008 + 0.3);
const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: n % 1 ? 2 : 0 });

/** A Church Center–style giving form. Concept only: nothing is charged. */
export default function GiveForm() {
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");
  const [fund, setFund] = useState(funds[0].id);
  const [freq, setFreq] = useState<Freq>("month");
  const [method, setMethod] = useState<Method>("bank");
  const [cover, setCover] = useState(true);
  const [done, setDone] = useState(false);

  const base = custom ? Math.max(0, Number(custom) || 0) : amount;
  const f = frequencies.find((x) => x.id === freq)!;
  const extra = cover && base > 0 ? Math.round(fee(base, method) * 100) / 100 : 0;
  const total = base + extra;
  const fundName = funds.find((x) => x.id === fund)!.name;

  const chip =
    "min-h-11 rounded-xl px-3 text-sm font-semibold ring-1 ring-line ring-inset transition-colors aria-pressed:bg-night aria-pressed:text-paper aria-pressed:ring-night";

  if (done) {
    return (
      <div className="rounded-[1.75rem] bg-paper p-7 text-ink shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] sm:p-9" aria-live="polite">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-sage-soft text-sage">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h2 className="mt-6 text-4xl">Thank you.</h2>
        <p className="mt-3 text-lg text-stone">
          {money(total)} to the {fundName}
          {f.word ? `, ${f.word}` : ""}. A receipt would be on its way to your inbox.
        </p>
        {f.perYear > 1 ? (
          <p className="mt-5 rounded-2xl bg-parchment p-4">
            Over a year, that&rsquo;s <strong>{money(base * f.perYear)}</strong> toward what God is doing here.
          </p>
        ) : null}
        <p className="mt-5 text-sm text-stone">Concept site: no payment was taken and no account was created.</p>
        <button type="button" onClick={() => setDone(false)} className="mt-6 min-h-12 rounded-full px-6 font-semibold ring-1 ring-line ring-inset hover:bg-parchment">
          Give again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (base > 0) setDone(true);
      }}
      className="rounded-[1.75rem] bg-paper p-6 text-ink shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="font-serif text-2xl whitespace-nowrap">Give online</p>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-stone">
          <Icon name="shield" className="h-4 w-4 text-sage" /> Secure · Church Center (demo)
        </span>
      </div>

      <fieldset className="mt-6">
        <legend className="eyebrow text-ember">Amount</legend>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={!custom && amount === p}
              onClick={() => {
                setAmount(p);
                setCustom("");
              }}
              className={`${chip} font-serif text-lg`}
            >
              ${p}
            </button>
          ))}
        </div>
        <label className="mt-2 flex h-12 items-center gap-2 rounded-xl bg-parchment px-4 ring-1 ring-line focus-within:ring-2 focus-within:ring-gold">
          <span className="font-serif text-lg text-stone">$</span>
          <input
            inputMode="decimal"
            placeholder="Other amount"
            aria-label="Other amount"
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^\d.]/g, ""))}
            className="w-full bg-transparent font-serif text-lg outline-none"
          />
        </label>
      </fieldset>

      <label className="mt-5 grid gap-1.5">
        <span className="eyebrow text-ember">Fund</span>
        <select value={fund} onChange={(e) => setFund(e.target.value)} className="h-12 rounded-xl bg-parchment px-3 font-semibold ring-1 ring-line outline-none focus:ring-2 focus:ring-gold">
          {funds.map((x) => (
            <option key={x.id} value={x.id}>
              {x.name}
            </option>
          ))}
        </select>
        <span className="text-sm text-stone">{funds.find((x) => x.id === fund)!.note}</span>
      </label>

      <fieldset className="mt-5">
        <legend className="eyebrow text-ember">How often</legend>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {frequencies.map((x) => (
            <button key={x.id} type="button" aria-pressed={freq === x.id} onClick={() => setFreq(x.id)} className={chip}>
              {x.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="eyebrow text-ember">Pay with</legend>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" aria-pressed={method === "bank"} onClick={() => setMethod("bank")} className={chip}>
            Bank account
          </button>
          <button type="button" aria-pressed={method === "card"} onClick={() => setMethod("card")} className={chip}>
            Card
          </button>
        </div>
        <p className="mt-2 text-sm text-stone">Bank transfers cost the church less in fees, so more of your gift goes to ministry.</p>
      </fieldset>

      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl bg-parchment p-4 ring-1 ring-line">
        <input type="checkbox" checked={cover} onChange={(e) => setCover(e.target.checked)} className="mt-1 h-4 w-4 accent-[#945311]" />
        <span className="text-[0.95rem]">
          Add {base > 0 ? money(Math.round(fee(base, method) * 100) / 100) : "the fee"} to cover processing, so the church receives the full {base > 0 ? money(base) : "amount"}.
        </span>
      </label>

      <button type="submit" disabled={base <= 0} className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-gold text-lg font-semibold text-night transition-colors hover:bg-gold-soft disabled:opacity-50">
        {base > 0 ? `Give ${money(total)}${f.word ? ` ${f.word}` : ""}` : "Enter an amount"}
        <Icon name="arrow" className="h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-xs text-stone">Concept site: this is a demo and won&rsquo;t ask for or charge any payment details.</p>
    </form>
  );
}
