import { useEffect, useRef, useState } from "react";

/* ===================== модель ===================== */
type Cur = "RUB" | "USD" | "THB";
const ORDER: Cur[] = ["RUB", "USD", "THB"];
const META: Record<Cur, { symbol: string; name: string }> = {
  RUB: { symbol: "₽", name: "Российский рубль" },
  USD: { symbol: "$", name: "Доллар США" },
  THB: { symbol: "฿", name: "Тайский бат" },
};

type Rates = { usdThb: number; rubThb: number; updatedAt: number };
const LS_RATES = "taikurs.rates.v1";
const SS_ADMIN = "taikurs.admin.v1";
const ADMIN_PIN = "7391";
const DEFAULT_RATES = { usdThb: 33.5, rubThb: 0.435 };

function loadRates(): Rates {
  try {
    const raw = localStorage.getItem(LS_RATES);
    if (raw) {
      const p = JSON.parse(raw);
      if (p?.usdThb > 0 && p?.rubThb > 0)
        return { usdThb: p.usdThb, rubThb: p.rubThb, updatedAt: p.updatedAt || Date.now() };
    }
  } catch {
    /* приватный режим и т.п. */
  }
  return { ...DEFAULT_RATES, updatedAt: Date.now() };
}
function persistRates(r: Rates) {
  try {
    localStorage.setItem(LS_RATES, JSON.stringify(r));
  } catch {
    /* ignore */
  }
}

/* вся конвертация идёт через бат — кросс-курс нигде не хранится и не показывается */
const toThb = (a: number, c: Cur, r: Rates) =>
  c === "THB" ? a : c === "USD" ? a * r.usdThb : a * r.rubThb;
const convert = (a: number, from: Cur, to: Cur, r: Rates) => {
  const t = toThb(a, from, r);
  return to === "THB" ? t : to === "USD" ? t / r.usdThb : t / r.rubThb;
};

const fmtMoney = (v: number) =>
  new Intl.NumberFormat("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
const fmtRate = (v: number) => {
  const d = v >= 1 ? 2 : 4;
  return new Intl.NumberFormat("ru-RU", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v);
};
const fmtTime = (ts: number) =>
  new Date(ts).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

const sanitizeAmount = (v: string) => {
  let s = v.replace(/\s/g, "").replace(",", ".").replace(/[^\d.]/g, "");
  const dot = s.indexOf(".");
  if (dot !== -1) s = s.slice(0, dot + 1) + s.slice(dot + 1).replace(/\./g, "");
  return s.slice(0, 12);
};

/* ===================== движение ===================== */
function usePrefersReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
    const f = (e: MediaQueryListEvent) => setR(e.matches);
    mq.addEventListener?.("change", f);
    return () => mq.removeEventListener?.("change", f);
  }, []);
  return r;
}

function useAnimatedNumber(target: number, instant: boolean) {
  const [disp, setDisp] = useState(target);
  const prev = useRef(target);
  useEffect(() => {
    if (instant) {
      prev.current = target;
      setDisp(target);
      return;
    }
    const from = prev.current;
    if (Math.abs(target - from) < 0.005) {
      prev.current = target;
      setDisp(target);
      return;
    }
    prev.current = target;
    const t0 = performance.now();
    const dur = 420;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setDisp(from + (target - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, instant]);
  return disp;
}

/* ===================== флаги ===================== */
const FLAG_BG: Record<Cur, string> = {
  RUB: "linear-gradient(180deg,#fff 0 33.4%,#0039A6 33.4% 66.7%,#D52B1E 66.7%)",
  THB: "linear-gradient(180deg,#A51931 0 16.7%,#F4F5F7 16.7% 33.3%,#2D2A4A 33.3% 66.7%,#F4F5F7 66.7% 83.3%,#A51931 83.3%)",
  USD:
    "linear-gradient(#3C3B6E,#3C3B6E) top left/45% 57% no-repeat, linear-gradient(180deg,#B22234 0 7.15%,#F4F5F7 7.15% 14.3%,#B22234 14.3% 21.45%,#F4F5F7 21.45% 28.6%,#B22234 28.6% 35.75%,#F4F5F7 35.75% 42.9%,#B22234 42.9% 50.05%,#F4F5F7 50.05% 57.2%,#B22234 57.2% 64.35%,#F4F5F7 64.35% 71.5%,#B22234 71.5% 78.65%,#F4F5F7 78.65% 85.8%,#B22234 85.8% 92.95%,#F4F5F7 92.95%)",
};
function Flag({ c }: { c: Cur }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-[22px] h-[15px] rounded-[3px] border border-black/20 shadow-sm shrink-0"
      style={{ background: FLAG_BG[c] }}
    />
  );
}

/* ===================== мелкие иконки ===================== */
const I = ({ d, className = "w-5 h-5", sw = 2 }: { d: string; className?: string; sw?: number }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d={d} />
  </svg>
);
const Gear = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-5 h-5"} aria-hidden="true">
    <circle cx="12" cy="12" r="3.2" />
    <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7" />
  </svg>
);
const SwapArrows = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-5 h-5"} style={style} aria-hidden="true">
    <path d="M8 4v14m0 0-3.5-3.5M8 18l3.5-3.5M16 20V6m0 0 3.5 3.5M16 6l-3.5 3.5" />
  </svg>
);
const CopyIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-4 h-4"} aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15H4.5A2.5 2.5 0 0 1 2 12.5v-8A2.5 2.5 0 0 1 4.5 2h8A2.5 2.5 0 0 1 15 4.5V5" />
  </svg>
);
const CheckIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-4 h-4"} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
const BackIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-5 h-5"} aria-hidden="true">
    <path d="M9 5 3 12l6 7h9a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H9Z" />
    <path d="m12 9.5 5 5M17 9.5l-5 5" />
  </svg>
);
const LockIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-5 h-5"} aria-hidden="true">
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5" />
  </svg>
);

/* ===================== селектор валюты ===================== */
function Seg({ value, onChange, label }: { value: Cur; onChange: (c: Cur) => void; label: string }) {
  const idx = ORDER.indexOf(value);
  return (
    <div className="relative grid grid-cols-3 rounded-full bg-black/30 border border-white/10 p-1" role="radiogroup" aria-label={label}>
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-1 rounded-full bg-gold-500 shadow-[0_6px_18px_-6px_rgba(240,180,41,0.8)]"
        style={{ width: "calc((100% - 8px) / 3)", transform: `translateX(${idx * 100}%)`, transition: "transform .35s cubic-bezier(.22,1,.36,1)" }}
      />
      {ORDER.map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={value === c}
          title={META[c].name}
          onClick={() => onChange(c)}
          className={`relative z-10 flex items-center justify-center gap-2 rounded-full py-2.5 transition-colors duration-300 ${
            value === c ? "text-pine-950" : "text-pine-200 hover:text-white"
          }`}
        >
          <Flag c={c} />
          <span className="font-display font-bold text-[13px] tracking-wide">{c}</span>
        </button>
      ))}
    </div>
  );
}

/* ===================== админ: настройки курсов ===================== */
function FieldRow({ code, value, onChange }: { code: Cur; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-pine-300">
        1 {code} → THB
      </span>
      <div className="mt-1.5 flex items-center gap-2.5 rounded-xl border border-white/10 bg-black/30 px-3.5 focus-within:border-gold-500/60 transition-colors">
        <Flag c={code} />
        <span className="font-mono text-sm text-pine-300">→</span>
        <Flag c="THB" />
        <input
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/[^\d.,]/g, "").slice(0, 10))}
          className="w-full bg-transparent py-3 text-right font-mono text-lg font-semibold text-white outline-none"
          placeholder="0.00"
        />
        <span className="font-mono text-gold-400 text-lg">฿</span>
      </div>
    </label>
  );
}

function AdminModal({
  open,
  onClose,
  rates,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  rates: Rates;
  onApply: (r: { usdThb: number; rubThb: number }) => void;
}) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(SS_ADMIN) === "1";
    } catch {
      return false;
    }
  });
  const [pin, setPin] = useState("");
  const [err, setErr] = useState(false);
  const [dUsd, setDUsd] = useState(String(rates.usdThb));
  const [dRub, setDRub] = useState(String(rates.rubThb));
  const [saveErr, setSaveErr] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (open) {
      setPin("");
      setErr(false);
      setSaveErr(false);
      setSaved(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && unlocked) {
      setDUsd(String(rates.usdThb));
      setDRub(String(rates.rubThb));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, unlocked]);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  if (!open) return null;

  const press = (d: string) => {
    if (err) return;
    const next = (pin + d).slice(0, 4);
    setPin(next);
    if (next.length === 4) {
      if (next === ADMIN_PIN) {
        setUnlocked(true);
        try {
          sessionStorage.setItem(SS_ADMIN, "1");
        } catch {
          /* ignore */
        }
      } else {
        setErr(true);
        setTimeout(() => {
          setPin("");
          setErr(false);
        }, 500);
      }
    }
  };

  const save = () => {
    const u = parseFloat(dUsd.replace(",", "."));
    const r = parseFloat(dRub.replace(",", "."));
    if (!(u > 0) || !(r > 0)) {
      setSaveErr(true);
      return;
    }
    setSaveErr(false);
    onApply({ usdThb: u, rubThb: r });
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  const logout = () => {
    try {
      sessionStorage.removeItem(SS_ADMIN);
    } catch {
      /* ignore */
    }
    setUnlocked(false);
    setPin("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Настройки курсов">
      <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-label="Закрыть" />
      <div className="modal-in board relative w-full max-w-sm rounded-[22px] border border-gold-500/25 p-6 sm:p-7 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9)]">
        <button
          onClick={onClose}
          aria-label="Закрыть окно"
          className="absolute right-4 top-4 w-9 h-9 rounded-full border border-white/10 text-pine-200 flex items-center justify-center hover:text-white hover:border-white/30 transition-colors"
        >
          <I d="M6 6l12 12M18 6L6 18" className="w-4 h-4" />
        </button>

        {!unlocked ? (
          <div className="text-center">
            <span className="mx-auto w-12 h-12 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center">
              <LockIcon className="w-6 h-6" />
            </span>
            <h2 className="mt-4 font-display font-bold text-white text-lg">Служебный доступ</h2>
            <p className="mt-1 text-sm text-pine-300">Введите PIN-код администратора</p>
            <div className={`mt-5 flex justify-center gap-3 ${err ? "shake" : ""}`}>
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-200 ${
                    i < pin.length ? (err ? "bg-[#e5484d] border-[#e5484d]" : "bg-gold-400 border-gold-400") : "border-white/25"
                  }`}
                />
              ))}
            </div>
            {err && <p className="mt-2 text-xs font-bold text-[#e5484d]">Неверный PIN-код</p>}
            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
                <button key={d} onClick={() => press(d)} className="key">
                  {d}
                </button>
              ))}
              <span aria-hidden="true" />
              <button onClick={() => press("0")} className="key">
                0
              </button>
              <button onClick={() => setPin((p) => p.slice(0, -1))} aria-label="Стереть цифру" className="key flex items-center justify-center">
                <BackIcon />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 pr-8">
              <span className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-400 flex items-center justify-center shrink-0">
                <Gear className="w-5 h-5" />
              </span>
              <div>
                <h2 className="font-display font-bold text-white text-lg leading-tight">Курсы конвертера</h2>
                <p className="text-xs text-pine-300 mt-0.5">задаются вручную · базовая валюта — бат</p>
              </div>
            </div>
            <div className="mt-5 space-y-3.5">
              <FieldRow code="USD" value={dUsd} onChange={setDUsd} />
              <FieldRow code="RUB" value={dRub} onChange={setDRub} />
            </div>
            {saveErr && <p className="mt-3 text-xs font-bold text-[#e5484d]">Введите числа больше нуля</p>}
            <button
              onClick={save}
              className="mt-5 w-full rounded-xl bg-gold-500 text-pine-950 font-bold py-3.5 hover:bg-gold-400 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              {saved ? (
                <>
                  <CheckIcon /> Сохранено
                </>
              ) : (
                "Сохранить курсы"
              )}
            </button>
            <p className="mt-3 text-[11px] text-pine-300/70 text-center">Применяется сразу · хранится на этом устройстве</p>
            <button
              onClick={logout}
              className="mt-4 w-full text-center text-xs font-bold text-pine-300 hover:text-white underline underline-offset-4 decoration-pine-600 transition-colors"
            >
              Выйти из режима администратора
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===================== приложение ===================== */
export default function App() {
  const reduced = usePrefersReduced();
  const [rates, setRates] = useState<Rates>(loadRates);
  const [amount, setAmount] = useState("1000");
  const [from, setFrom] = useState<Cur>("RUB");
  const [to, setTo] = useState<Cur>("THB");
  const [spin, setSpin] = useState(0);
  const [copied, setCopied] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const num = parseFloat(amount.replace(",", ".")) || 0;
  const result = convert(num, from, to, rates);
  const pairRate = convert(1, from, to, rates);
  const disp = useAnimatedNumber(result, reduced);

  const setFromSafe = (c: Cur) => {
    if (c === to) setTo(from);
    setFrom(c);
  };
  const setToSafe = (c: Cur) => {
    if (c === from) setFrom(to);
    setTo(c);
  };
  const swap = () => {
    setFrom(to);
    setTo(from);
    setSpin((s) => s + 180);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(fmtMoney(result));
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* ignore */
    }
  };

  const applyRates = (r: { usdThb: number; rubThb: number }) => {
    const next = { ...r, updatedAt: Date.now() };
    setRates(next);
    persistRates(next);
  };

  return (
    <div className="relative min-h-screen text-white font-body overflow-x-clip">
      {/* фоновая «банкнотная» сцена */}
      <div aria-hidden="true" className="watermark">฿</div>

      <div className="relative z-10">
        {/* шапка */}
        <header className="wrap flex items-center justify-between pt-6 sm:pt-8">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-full bg-gold-500 text-pine-950 flex items-center justify-center font-display font-black text-xl shadow-[0_12px_30px_-10px_rgba(240,180,41,0.9)]">
              ฿
            </span>
            <div>
              <p className="font-display font-black text-white text-lg tracking-wide leading-none">
                ТАЙ<span className="text-gold-400">·</span>КУРС
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-pine-300 mt-1">RUB · USD · THB</p>
            </div>
          </div>
          <button
            onClick={() => setAdminOpen(true)}
            aria-label="Настройки курсов (для администратора)"
            title="Для администратора"
            className="w-11 h-11 rounded-full border border-white/15 text-pine-200 flex items-center justify-center hover:text-gold-400 hover:border-gold-500/60 hover:rotate-45 transition-all duration-300"
          >
            <Gear />
          </button>
        </header>

        {/* конвертер */}
        <main className="wrap pb-14">
          <div className="card-rise board mx-auto mt-8 sm:mt-12 max-w-xl rounded-[22px] border border-gold-500/20 p-5 sm:p-8 shadow-[0_45px_100px_-35px_rgba(0,0,0,0.85)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-pine-300">Курс обмена · сегодня</p>
              <span className="flex items-center gap-2 text-[11px] font-bold text-pine-200">
                <span className="w-2 h-2 rounded-full bg-gold-400 text-gold-400 pulse-dot" />
                актуально
              </span>
            </div>

            {/* отдаёте */}
            <div className="mt-6">
              <label htmlFor="amount" className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-pine-300">
                Вы отдаёте
              </label>
              <div className="mt-2 flex items-center gap-2 rounded-xl bg-black/30 border border-white/10 px-4 focus-within:border-gold-500/70 transition-colors">
                <input
                  id="amount"
                  inputMode="decimal"
                  autoComplete="off"
                  value={amount}
                  onChange={(e) => setAmount(sanitizeAmount(e.target.value))}
                  placeholder="0"
                  className="w-full bg-transparent py-3.5 font-mono text-[26px] sm:text-[28px] font-semibold text-white placeholder-white/20 outline-none"
                />
                <span className="font-mono text-xl text-gold-400 shrink-0">{META[from].symbol}</span>
              </div>
              <div className="mt-3">
                <Seg value={from} onChange={setFromSafe} label="Валюта, которую отдаёте" />
              </div>
            </div>

            {/* swap */}
            <div className="flex items-center gap-4 mt-5 mb-5">
              <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
              <button
                onClick={swap}
                aria-label="Поменять валюты местами"
                className="w-12 h-12 rounded-full bg-gold-500 text-pine-950 flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(240,180,41,0.9)] hover:bg-gold-400 hover:scale-105 active:scale-95 transition-all"
              >
                <SwapArrows
                  className="w-5 h-5"
                  {...{ style: { transform: `rotate(${spin}deg)`, transition: reduced ? "none" : "transform .45s cubic-bezier(.34,1.3,.5,1)" } }}
                />
              </button>
              <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
            </div>

            {/* получаете */}
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-pine-300">Вы получаете</p>
              <div className="mt-2 rounded-xl bg-black/20 border border-gold-500/25 px-4 py-3.5 flex items-baseline gap-2" aria-live="polite">
                <span className={`font-mono text-[26px] sm:text-3xl font-bold tracking-tight break-all ${num > 0 ? "text-gold-400" : "text-white/25"}`}>
                  {fmtMoney(disp)}
                </span>
                <span className="font-mono text-xl text-gold-400/80 shrink-0">{META[to].symbol}</span>
              </div>
              <div className="mt-3">
                <Seg value={to} onChange={setToSafe} label="Валюта, которую получаете" />
              </div>
            </div>

            {/* курс пары */}
            <div
              key={`${from}-${to}-${rates.updatedAt}`}
              className="rate-flash mt-6 pt-4 border-t border-dashed border-white/15 flex items-center justify-between gap-3"
            >
              <p className="font-mono text-[13px] text-pine-200">
                1 {from} = <span className="text-gold-400 font-semibold">{fmtRate(pairRate)}</span> {META[to].symbol}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-semibold text-pine-300/70 hidden sm:inline">обновлено {fmtTime(rates.updatedAt)}</span>
                <button
                  onClick={copy}
                  aria-label="Скопировать результат"
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                    copied ? "border-gold-500 text-gold-400 bg-gold-500/10" : "border-white/15 text-pine-200 hover:text-gold-400 hover:border-gold-500/60"
                  }`}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-center text-[11px] font-semibold text-pine-300/60 mt-7">
            Курс устанавливается вручную и обновляется в течение дня
          </p>
        </main>
      </div>

      <AdminModal open={adminOpen} onClose={() => setAdminOpen(false)} rates={rates} onApply={applyRates} />
    </div>
  );
}
