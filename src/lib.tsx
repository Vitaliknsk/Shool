import React, { useEffect, useRef, useState } from "react";

/* ---------- prefers-reduced-motion ---------- */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", fn);
    return () => mq.removeEventListener?.("change", fn);
  }, []);
  return reduced;
}

/* ---------- появление блока во вьюпорте ---------- */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

/* ---------- Reveal: fade-in-up при скролле ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "" | "reveal-left" | "reveal-scale";
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${variant} ${inView ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ---------- счётчик цифр ---------- */
export function useCountUp(target: number, run: boolean, duration = 1600, decimals = 0) {
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(target * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration, reduced]);
  return val.toFixed(decimals).replace(".", ",");
}

export const fmt = (n: number) => new Intl.NumberFormat("ru-RU").format(n);

/* ---------- скролл позиции ---------- */
export function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

/* ---------- блокировка скролла для модалок ---------- */
export function useLockBody(open: boolean) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
}

/* ---------- маска телефона +7 ---------- */
export function maskPhone(input: string): string {
  const raw = input.replace(/\D/g, "");
  if (!raw) return "";
  let d = raw;
  if (d.startsWith("8")) d = "7" + d.slice(1);
  if (!d.startsWith("7")) d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length > 0) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ") " + p.slice(3, 6);
  if (p.length >= 6) out += "-" + p.slice(6, 8);
  if (p.length >= 8) out += "-" + p.slice(8, 10);
  return out;
}

export const phoneDigits = (masked: string) => masked.replace(/\D/g, "").length;

/* ---------- «отправка» лида (CRM/Telegram-бот подключаются здесь) ---------- */
export function sendLead(payload: Record<string, string>) {
  // AmoCRM / Битрикс24: fetch(CRM_WEBHOOK, { method: "POST", body: JSON.stringify(payload) })
  // Telegram-бот: fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, ...)
  window.dataLayer?.push({ event: "lead_submit", ...payload });
  console.info("[CRM] lead captured:", payload);
}
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/* ---------- плавный переход к якорю ---------- */
export function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ block: "start" });
}

/* ---------- ближайший набор группы (первый понедельник след. месяца) ---------- */
export function nextGroupDate() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  while (d.getDay() !== 1) d.setDate(d.getDate() + 1);
  return d.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
}
