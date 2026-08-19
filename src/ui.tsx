import React, { useEffect } from "react";
import { useLockBody } from "./lib";
import {
  IcShield, IcBadge, IcCardPercent, IcTax, IcSend, IcMed, IcBook, IcWheel, IcClipboard,
  IcFlag, IcApp, IcChatPulse, IcStopwatch, IcSwap, IcPhonePlay, IcBus, IcCar, IcMoto,
  IcRoute, IcGauge, IcUsers, IcClock, IcCalendar, IcStar, IcX,
} from "./icons";

/* ---------- карта иконок по ключам из data.ts ---------- */
export const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
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
  dark = false,
  center = false,
}: {
  num: string;
  kicker: string;
  title: React.ReactNode;
  lead?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`relative ${center ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}>
      <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className={`font-display font-black text-sm tracking-widest ${dark ? "text-brand-500" : "text-brand-600"}`}>{num}</span>
        <span className={`h-px w-10 ${dark ? "bg-brand-500/50" : "bg-brand-600/40"}`} aria-hidden="true" />
        <span className={`text-xs font-extrabold uppercase tracking-[0.22em] ${dark ? "text-ink-300" : "text-ink-400"}`}>{kicker}</span>
      </div>
      <h2 className={`mt-4 font-display font-extrabold tracking-tight text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.08] ${dark ? "text-paper-50" : "text-ink-900"}`}>
        {title}
      </h2>
      {lead && <p className={`mt-4 text-base sm:text-lg leading-relaxed ${dark ? "text-ink-300" : "text-ink-500"}`}>{lead}</p>}
    </div>
  );
}

/* ---------- звёзды рейтинга ---------- */
export function Stars({ className = "w-4 h-4", n = 5 }: { className?: string; n?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-brand-500" aria-label={`Оценка ${n} из 5`}>
      {Array.from({ length: n }).map((_, i) => (
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
      <div className="screen-in relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl bg-ink-900 border border-ink-700 shadow-2xl">
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
