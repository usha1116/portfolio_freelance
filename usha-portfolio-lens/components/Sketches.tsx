"use client";

import { useState } from "react";

const inr = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

export function InvoiceSketch() {
  const [gst, setGst] = useState(18);
  const rows = [
    { n: "Landing page build", q: 1, r: 18000 },
    { n: "Hosting setup", q: 2, r: 1500 },
  ];
  const sub = rows.reduce((s, r) => s + r.q * r.r, 0);
  const tax = (sub * gst) / 100;
  return (
    <div className="sk invoice">
      <div className="sk-head">Invoice (example)</div>
      <table>
        <tbody>
          {rows.map((r) => (
            <tr key={r.n}>
              <td>{r.n}</td>
              <td className="num">
                {r.q} x {inr.format(r.r)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <fieldset className="chips">
        <legend>GST rate</legend>
        {[5, 12, 18].map((g) => (
          <label key={g} className={gst === g ? "chip on" : "chip"}>
            <input type="radio" name="gst" checked={gst === g} onChange={() => setGst(g)} />
            {g}%
          </label>
        ))}
      </fieldset>
      <dl className="totals" aria-live="polite">
        <div><dt>Subtotal</dt><dd>{inr.format(sub)}</dd></div>
        <div><dt>GST</dt><dd>{inr.format(tax)}</dd></div>
        <div className="grand"><dt>Total</dt><dd>{inr.format(sub + tax)}</dd></div>
      </dl>
    </div>
  );
}

export function SalonSketch() {
  const services = ["Haircut", "Facial", "Manicure"];
  const slots = ["11:00", "14:30", "17:00"];
  const [svc, setSvc] = useState(services[0]);
  const [slot, setSlot] = useState(slots[1]);
  const [booked, setBooked] = useState(false);
  const pick = (fn: () => void) => () => {
    fn();
    setBooked(false);
  };
  return (
    <div className="sk salon">
      <div className="sk-head">Book a visit (example)</div>
      <fieldset className="chips">
        <legend>Service</legend>
        {services.map((s) => (
          <button type="button" key={s} aria-pressed={svc === s} className={svc === s ? "chip on" : "chip"} onClick={pick(() => setSvc(s))}>
            {s}
          </button>
        ))}
      </fieldset>
      <fieldset className="chips">
        <legend>Time</legend>
        {slots.map((s) => (
          <button type="button" key={s} aria-pressed={slot === s} className={slot === s ? "chip on" : "chip"} onClick={pick(() => setSlot(s))}>
            {s}
          </button>
        ))}
      </fieldset>
      <button type="button" className="btn btn-ink small" onClick={() => setBooked(true)}>
        Book it
      </button>
      <p className="sk-result" aria-live="polite">
        {booked ? `Booked: ${svc} at ${slot}.` : "Nothing booked yet."}
      </p>
    </div>
  );
}

const TONES = [
  { name: "Warm", text: "Of course! I'll have it in your inbox by Friday morning." },
  { name: "Neutral", text: "Yes, I'll send the report by Friday." },
  { name: "Direct", text: "Friday. It's coming." },
];

export function ToneSketch() {
  const [i, setI] = useState(0);
  return (
    <div className="sk tone">
      <div className="sk-head">Reply in the right tone (example)</div>
      <p className="bubble in">Can you send the report by Friday?</p>
      <label className="dial">
        <span>Tone: {TONES[i].name}</span>
        <input type="range" min={0} max={2} step={1} value={i} onChange={(e) => setI(Number(e.target.value))} />
      </label>
      <p className="bubble out" aria-live="polite">
        {TONES[i].text}
      </p>
    </div>
  );
}

const ROLES = {
  Student: ["My courses", "Assignments due", "Grades"],
  Teacher: ["My classes", "Create an assignment", "Grade submissions"],
  Admin: ["People and roles", "Classes and terms", "Organisation settings"],
} as const;

export function StudySketch() {
  const [role, setRole] = useState<keyof typeof ROLES>("Student");
  return (
    <div className="sk study">
      <div className="sk-head">Same app, different screens (example)</div>
      <fieldset className="chips">
        <legend>Signed in as</legend>
        {(Object.keys(ROLES) as (keyof typeof ROLES)[]).map((r) => (
          <button type="button" key={r} aria-pressed={role === r} className={role === r ? "chip on" : "chip"} onClick={() => setRole(r)}>
            {r}
          </button>
        ))}
      </fieldset>
      <ul className="menu" aria-live="polite">
        {ROLES[role].map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </div>
  );
}

const SKETCHES: Record<string, () => React.ReactElement> = {
  inoutbilling: InvoiceSketch,
  "beauty-baithak": SalonSketch,
  toneowl: ToneSketch,
  studyunify: StudySketch,
};

/** Use this from server components: the lookup happens on the client side. */
export default function ProjectSketch({ id }: { id: string }) {
  const Sketch = SKETCHES[id];
  return typeof Sketch === "function" ? <Sketch /> : null;
}