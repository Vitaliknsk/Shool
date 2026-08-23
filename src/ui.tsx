import { useLockBody, useReducedMotion } from "./lib";
import { useEffect } from "react";
import {
  IcX, IcStar, IcShield, IcBadge, IcCardPercent, IcTax, IcSend, IcMed, IcBook, IcWheel,
  IcClipboard, IcFlag, IcApp, IcChatPulse, IcStopwatch, IcSwap, IcPhonePlay, IcBus,
  IcCar, IcMoto, IcRoute, IcGauge, IcUsers, IcClock, IcCalendar,
} from "./icons";

export const ICONS: Record<string, (p: { className?: string }) => JSX.Element> = {
  shield: IcShield,
  badge: IcBadge,
  card: IcCardPercent,
  tax: IcTax,
  send: IcSend,
  med: IcMed,
  book: IcBook,
  wheel: IcWheel,
  clipboard: IcClipboard,
  flag: IcFlag,
  app: IcApp,
  chat: IcChatPulse,
  stopwatch: IcStopwatch,
  swap: IcSwap,
  phoneplay: IcPhonePlay,
  bus: IcBus,
  car: IcCar,
  moto: IcMoto,
  route: IcRoute,
  gauge: IcGauge,
  users: IcUsers,
  clock: IcClock,
  calendar: IcCalendar,
};

/* ---------- заголовок раздела ---------- */
export function SectionHead({
  num,
  kicker,
  title,
  lead,
  dark,
  center,
}: {
  num: string;
  kicker: string;
  title: string;
  lead?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? "max-w-2xl mx-auto text-center" : "max-w-2xl"}>
      <p className={`flex ${center ? "justify-center" : ""} items-center gap-3 text-xs font-extrabold uppercase tracking-[0.22em] ${dark ? "text-brand-400" : "text-brand-600"}`}>
        <span className={`font-display font-black text-sm ${dark ? "text-paper-50/25" : "text-ink-300"}`}>{num}</span>
        <span className={`h-px w-8 ${dark ? "bg-brand-500/60" : "bg-brand-600/50"}`} aria-hidden="true" />
        {kicker}
      </p>
      <h2 className={`mt-4 font-display font-black tracking-tight text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.08] ${dark ? "text-paper-50" : "text-ink-900"}`}>
        {title}
      </h2>
      {lead && <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? "text-ink-300" : "text-ink-500"}`}>{lead}</p>}
    </div>
  );
}

/* ---------- звёзды рейтинга ---------- */
export function Stars({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-brand-500" aria-label="Оценка 5 из 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <IcStar key={i} className={className} />
      ))}
    </span>
  );
}

/* ---------- модальное окно ---------- */
export function Modal({
  open,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  const reduced = useReducedMotion();
  useLockBody(open);
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <button aria-label="Закрыть" className="absolute inset-0 bg-ink-950/85 backdrop-blur-sm cursor-default" onClick={onClose} />
      <div className={`screen-in relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl bg-ink-900 border border-ink-700 shadow-2xl ${reduced ? "" : ""}`}>
        <button
          onClick={onClose}
          aria-label="Закрыть окно"
          className="absolute right-4 top-4 z-10 w-10 h-10 rounded-full bg-ink-800/90 border border-ink-700 text-paper-50 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition-colors"
        >
          <IcX className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}
