import { useState } from "react";
import {
  CONTACTS, GROUPS, GROUP_CAPACITY, IMG, INSTALLMENT, NAV, PLANS, PROMOS, STATS, TRACKS, TRUST, USP,
} from "../data";
import { Reveal, maskPhone, nextGroupDate, nextMondays, phoneDigits, sendLead, useCountUp, useInView, useReducedMotion, useScrollY, fmt } from "../lib";
import { ICONS, SectionHead } from "../ui";
import {
  IcWheel, IcPhone, IcWhatsApp, IcTelegram, IcBurger, IcX, IcCheck, IcCross,
  IcArrow, IcClock, IcScissors, IcPin, IcMoto, IcCar, IcUsers, IcCardPercent, IcDoc, IcShield,
} from "../icons";

/* ================= ШАПКА ================= */
export function Header() {
  const y = useScrollY();
  const [menu, setMenu] = useState(false);
  const scrolled = y > 40;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menu ? "bg-ink-950/95 backdrop-blur-md shadow-[0_10px_40px_-20px_rgba(7,11,21,0.9)]" : "bg-gradient-to-b from-ink-950/80 to-transparent"
      }`}
    >
      <div className="wrap flex items-center justify-between h-[68px] lg:h-[76px]">
        <a href="#top" className="flex items-center gap-3 min-w-0" aria-label="Автошкола ЗА РУЛЁМ — на главную">
          <span className="w-11 h-11 rounded-full bg-brand-600 text-paper-50 flex items-center justify-center shadow-[0_10px_25px_-8px_rgba(217,30,38,0.8)] shrink-0">
            <IcWheel className="w-6 h-6" />
          </span>
          <span className="font-display font-black text-paper-50 text-lg leading-none tracking-wide min-w-0">
            ЗА <span className="text-brand-500">РУЛЁМ</span>
            <span className="hidden min-[430px]:block text-[10px] font-body font-bold tracking-[0.24em] text-ink-300 mt-1">АВТОШКОЛА · НОВОСИБИРСК</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Основное меню">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="relative text-sm font-semibold text-paper-50/80 hover:text-paper-50 transition-colors group">
              {n.label}
              <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-brand-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2.5">
          <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" data-goal="whatsapp_click" aria-label="Написать в WhatsApp"
            className="w-10 h-10 rounded-full bg-[#25d366]/15 border border-[#25d366]/40 text-[#25d366] flex items-center justify-center hover:bg-[#25d366] hover:text-ink-950 transition-all">
            <IcWhatsApp className="w-5 h-5" />
          </a>
          <a href={CONTACTS.tg} target="_blank" rel="noopener noreferrer" aria-label="Написать в Telegram"
            className="w-10 h-10 rounded-full bg-[#2aabee]/15 border border-[#2aabee]/40 text-[#4da3e8] flex items-center justify-center hover:bg-[#2aabee] hover:text-paper-50 transition-all">
            <IcTelegram className="w-5 h-5" />
          </a>
          <a href={CONTACTS.phoneHref} data-goal="phone_click" className="ml-2 flex flex-col items-end leading-tight group">
            <span className="font-display font-extrabold text-paper-50 text-[15px] group-hover:text-brand-400 transition-colors">{CONTACTS.phoneDisplay}</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-300">ежедневно 9:00–20:00</span>
          </a>
        </div>

        <button
          className="md:hidden w-11 h-11 rounded-full border border-paper-50/20 text-paper-50 flex items-center justify-center shrink-0"
          onClick={() => setMenu(!menu)}
          aria-label={menu ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menu}
        >
          {menu ? <IcX className="w-6 h-6" /> : <IcBurger className="w-6 h-6" />}
        </button>
      </div>

      {menu && (
        <nav className="md:hidden screen-in bg-ink-950 border-t border-paper-50/10 px-5 pb-7 pt-3" aria-label="Мобильное меню">
          {NAV.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setMenu(false)}
              className="flex items-center justify-between py-3.5 border-b border-paper-50/10 font-display font-bold text-paper-50 text-lg"
              style={{ animationDelay: `${i * 40}ms` }}>
              {n.label}
              <IcArrow className="w-4 h-4 text-brand-500" />
            </a>
          ))}
          <div className="mt-6 flex items-center gap-3">
            <a href={CONTACTS.phoneHref} data-goal="phone_click" className="btn btn-primary btn-md flex-1">
              <IcPhone className="w-4 h-4" /> Позвонить
            </a>
            <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-12 h-12 rounded-full bg-[#25d366] text-ink-950 flex items-center justify-center">
              <IcWhatsApp className="w-6 h-6" />
            </a>
            <a href={CONTACTS.tg} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-12 h-12 rounded-full bg-[#2aabee] text-paper-50 flex items-center justify-center">
              <IcTelegram className="w-6 h-6" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

/* ================= ФОРМА ЗАХВАТА НА ПЕРВОМ ЭКРАНЕ ================= */
function HeroForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneDigits(phone) !== 11) {
      setErr("Введите номер полностью — например, +7 (913) 123-45-67");
      return;
    }
    setErr("");
    sendLead({ source: "hero_form", category: "B", name, phone });
    setDone(true);
  };

  return (
    <div className="rounded-xl bg-paper-50 text-ink-900 border-t-4 border-brand-600 p-6 shadow-[0_40px_90px_-30px_rgba(7,11,21,0.9)]">
      {done ? (
        <div className="screen-in text-center py-5">
          <span className="mx-auto w-14 h-14 rounded-full bg-brand-600 text-paper-50 flex items-center justify-center">
            <IcCheck className="w-7 h-7" />
          </span>
          <p className="mt-4 font-display font-extrabold text-xl">Заявка принята!</p>
          <p className="mt-1.5 text-sm text-ink-500">Перезвоним за 15 минут (Пн–Сб, 9:00–20:00) и закрепим скидку 2 000 ₽.</p>
          <div className="mt-4 flex justify-center gap-2.5">
            <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-11 h-11 rounded-full bg-[#25d366] text-ink-950 flex items-center justify-center"><IcWhatsApp className="w-5 h-5" /></a>
            <a href={CONTACTS.tg} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-11 h-11 rounded-full bg-[#2aabee] text-paper-50 flex items-center justify-center"><IcTelegram className="w-5 h-5" /></a>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-brand-600 pulse-dot shrink-0" />
            <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-600">Идёт набор · старт {nextGroupDate()}</p>
          </div>
          <p className="mt-2 font-display font-extrabold text-xl leading-snug">Забронируй место в группе и скидку 2 000 ₽</p>
          <form onSubmit={submit} className="mt-4 space-y-3">
            <input className="field" placeholder="Как к вам обращаться?" value={name} onChange={(e) => setName(e.target.value)} aria-label="Имя" />
            <input className="field" placeholder="+7 (___) ___-__-__" inputMode="tel" value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} aria-label="Телефон" />
            {err && <p className="text-xs font-bold text-brand-600" role="alert">{err}</p>}
            <button type="submit" className="btn btn-primary btn-lg w-full">Записаться со скидкой 2 000 ₽</button>
          </form>
          <p className="mt-3 text-[11px] leading-relaxed text-ink-400">
            Перезвоним за 15 минут. Отправляя форму, вы соглашаетесь на обработку персональных данных по 152-ФЗ.
          </p>
        </>
      )}
    </div>
  );
}

/* ================= HERO ================= */
export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="top" className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-ink-950">
      <div className="absolute inset-0">
        <img
          src={IMG.hero}
          alt="Учебный автомобиль автошколы ЗА РУЛЁМ на зимней улице Новосибирска"
          decoding="async"
          className={`w-full h-full object-cover object-[65%_center] ${reduced ? "" : "kenburns"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
      </div>

      <div className="wrap relative pt-24 pb-8 sm:pt-28 lg:pb-14 w-full">
        <div className="grid lg:grid-cols-[1fr_390px] gap-8 lg:gap-12 items-end">
          <div className="max-w-3xl min-w-0">
            <Reveal>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 text-paper-50 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] px-3 sm:px-4 py-1.5 sm:py-2">
                  <IcPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Новосибирск
                </span>
                <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold text-paper-50/70">
                  <span className="w-2 h-2 rounded-full bg-[#25d366] pulse-dot shrink-0" /> набор открыт · старт {nextGroupDate()}
                </span>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="mt-4 sm:mt-6 font-display font-black text-paper-50 text-[1.55rem] leading-[1.14] sm:text-[2.6rem] sm:leading-[1.06] lg:text-[3.3rem] tracking-tight">
                Получи права категории B за <span className="marker">2,5 месяца</span> в&nbsp;Новосибирске. Рассрочка&nbsp;0%. Начни с&nbsp;<span className="text-brand-500">5&nbsp;000&nbsp;₽</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Ключевые условия">
                {USP.map((u) => {
                  const Ic = ICONS[u.icon];
                  return (
                    <li key={u.text} className="inline-flex items-center gap-2 rounded-full border border-paper-50/25 bg-paper-50/5 backdrop-blur-sm px-3.5 py-2 text-[11.5px] sm:text-[13px] font-bold text-paper-50/90">
                      <Ic className="w-4 h-4 text-brand-500 shrink-0" /> {u.text}
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-3.5 text-[13.5px] sm:text-lg text-paper-50/85 max-w-2xl leading-snug sm:leading-relaxed font-medium">
                Лицензированная автошкола · теория онлайн · практика в центре · <b className="text-paper-50">5&nbsp;000+ выпускников</b>
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
                <a href="#lead" className="btn btn-primary btn-lg w-full sm:w-auto">
                  Записаться онлайн <IcArrow className="w-5 h-5 shrink-0" />
                </a>
                <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" data-goal="whatsapp_click" className="btn btn-md bg-[#25d366] text-ink-950 hover:brightness-110 hover:-translate-y-0.5 !px-6 !py-4 w-full sm:w-auto sm:!py-[1.05rem]">
                  <IcWhatsApp className="w-5 h-5 shrink-0" /> Написать в WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={330}>
              <ul className="mt-6 sm:mt-9 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3 max-w-xl">
                {TRUST.map((t) => {
                  const Ic = ICONS[t.icon];
                  return (
                    <li key={t.text} className="flex items-center gap-2 text-[11.5px] sm:text-sm font-bold text-paper-50/85 leading-tight">
                      <Ic className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-brand-500 shrink-0" />
                      {t.text}
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={250} variant="reveal-scale">
            <HeroForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= ЦИФРЫ ================= */
function StatCard({ value, decimals, suffix, label, format, run, delay }: { value: number; decimals: number; suffix: string; label: string; format?: boolean; run: boolean; delay: number }) {
  const v = useCountUp(value, run, 1500 + delay, decimals);
  return (
    <div className="group min-w-0 rounded-xl bg-paper-50 border border-paper-200 p-6 sm:p-8 hover:border-brand-600/50 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-25px_rgba(217,30,38,0.35)] transition-all duration-300">
      <p className="font-display font-black text-[2rem] sm:text-5xl text-ink-900 leading-none tracking-tight whitespace-nowrap">
        {format ? fmt(Number(v.replace(/\s/g, "")) || 0) : v}
        <span className="text-brand-600">{suffix}</span>
      </p>
      <p className="mt-3 text-sm font-semibold text-ink-400 leading-snug">{label}</p>
    </div>
  );
}

function Gauge({ run }: { run: boolean }) {
  return (
    <svg viewBox="0 0 200 118" className="w-full max-w-[260px]" aria-hidden="true">
      <path d="M18 100 A82 82 0 0 1 182 100" fill="none" stroke="var(--color-paper-200)" strokeWidth="10" strokeLinecap="round" />
      <path d="M18 100 A82 82 0 0 1 140 26" fill="none" stroke="var(--color-brand-600)" strokeWidth="10" strokeLinecap="round" />
      {[0, 30, 60, 90, 120, 150, 180].map((a) => {
        const rad = ((180 - a) * Math.PI) / 180;
        const x1 = 100 + Math.cos(rad) * 64;
        const y1 = 100 - Math.sin(rad) * 64;
        const x2 = 100 + Math.cos(rad) * 72;
        const y2 = 100 - Math.sin(rad) * 72;
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-ink-300)" strokeWidth="2" />;
      })}
      <line x1="100" y1="100" x2="100" y2="34" stroke="var(--color-brand-600)" strokeWidth="4" strokeLinecap="round" className="needle" style={{ transform: run ? "rotate(96deg)" : "rotate(-90deg)" }} />
      <circle cx="100" cy="100" r="7" fill="var(--color-ink-900)" />
    </svg>
  );
}

export function Numbers() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  return (
    <section className="relative bg-paper-100 py-20 lg:py-28" aria-label="Автошкола в цифрах">
      <div className="wrap">
        <SectionHead
          num="01"
          kicker="почему нам доверяют"
          title="Автошкола в цифрах, а не в обещаниях"
          lead="Каждая цифра проверяема: лицензия — на сайте Рособрнадзора, отзывы — на Яндекс.Картах и 2ГИС."
        />

        <div ref={ref} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <StatCard {...s} run={inView} delay={i * 120} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <Reveal delay={120}>
            <div className="h-full flex items-center gap-5 rounded-xl bg-ink-900 text-paper-50 p-6 sm:p-8 relative overflow-hidden">
              <span className="absolute -right-10 -bottom-10 opacity-[0.07]" aria-hidden="true">
                <IcWheel className="w-56 h-56" />
              </span>
              <div className="relative min-w-0">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-brand-400">
                  <IcCheck className="w-4 h-4" /> Премия отрасли
                </div>
                <p className="mt-3 font-display font-extrabold text-2xl sm:text-3xl leading-tight">«Лучшая автошкола РФ — 2024»</p>
                <p className="mt-2 text-sm text-ink-300 leading-relaxed max-w-md">
                  По версии Национальной премии в сфере подготовки водителей. Диплом № 14/24 — покажем в офисе вместе с лицензией.
                </p>
                <p className="mt-3 text-[11px] text-ink-400">Источник: оргкомитет премии «Автошкола года», 2024</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="h-full rounded-xl bg-paper-50 border border-paper-200 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
              <Gauge run={inView} />
              <p className="mt-2 font-display font-extrabold text-ink-900 text-lg">87% сдают город с первого раза</p>
              <p className="mt-1 text-xs font-semibold text-ink-400">по данным внутренних экзаменов за 2025 год</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= ДВА НАПРАВЛЕНИЯ: A и B раздельно ================= */
export function SplitOffers() {
  return (
    <section id="formats" className="bg-paper-100 pb-16 lg:pb-24 scroll-mt-20" aria-label="Категории A и B">
      <div className="wrap">
        <SectionHead
          num="02"
          kicker="два направления"
          title="Автомобиль или мотоцикл — выбирай своё"
          lead="Разные программы, цены и сроки. У каждого направления — свои тарифы и своя кнопка записи."
        />
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {TRACKS.map((t, i) => {
            const Ic = t.id === "a" ? IcMoto : IcCar;
            return (
              <Reveal key={t.id} delay={i * 120}>
                <article className={`group relative h-full rounded-xl overflow-hidden p-7 sm:p-9 transition-all duration-300 hover:-translate-y-2 ${
                  t.dark ? "bg-ink-900 text-paper-50 shadow-[0_35px_80px_-30px_rgba(7,11,21,0.7)]" : "bg-paper-50 border border-paper-200 hover:shadow-[0_30px_70px_-30px_rgba(12,19,34,0.35)]"
                }`}>
                  <span className={`absolute -right-8 -bottom-8 opacity-[0.06] ${t.dark ? "text-paper-50" : "text-ink-900"}`} aria-hidden="true">
                    <Ic className="w-52 h-52" />
                  </span>
                  <div className="relative min-w-0">
                    <div className="flex items-center gap-3">
                      <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${t.dark ? "bg-brand-600 text-paper-50" : "bg-brand-50 text-brand-600"}`}>
                        <Ic className="w-6 h-6" />
                      </span>
                      <div>
                        <p className={`text-[11px] font-extrabold uppercase tracking-[0.2em] ${t.dark ? "text-brand-400" : "text-brand-600"}`}>Категория {t.cat}</p>
                        <h3 className={`font-display font-extrabold text-xl ${t.dark ? "text-paper-50" : "text-ink-900"}`}>{t.vehicle === "автомобиль" ? "Права на автомобиль" : "Права на мотоцикл"}</h3>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <p className={`font-display font-black text-3xl sm:text-4xl tracking-tight ${t.dark ? "text-paper-50" : "text-ink-900"}`}>{t.price}</p>
                      <p className={`text-sm font-bold ${t.dark ? "text-ink-300" : "text-ink-400"}`}>· срок {t.term}</p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {t.points.map((p) => (
                        <li key={p} className={`flex items-start gap-2 text-sm font-semibold ${t.dark ? "text-paper-50/80" : "text-ink-500"}`}>
                          <IcCheck className={`w-4 h-4 mt-0.5 shrink-0 ${t.dark ? "text-brand-400" : "text-brand-600"}`} /> {p}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href="#tariffs" className={`btn btn-md ${t.dark ? "btn-primary" : "btn-outline"}`}>
                        {t.cta} <IcArrow className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= АКЦИИ ================= */
export function Promos() {
  const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
  return (
    <section className="bg-paper-100 pb-10 lg:pb-14" aria-label="Акции автошколы">
      <div className="wrap">
        <div className="roadline mb-10" aria-hidden="true" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PROMOS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} variant="reveal-scale">
              <div className={`coupon coupon-notch rounded-xl border-2 border-dashed border-brand-600/60 bg-paper-50 p-4 sm:p-6 text-center ${tilts[i % 4]}`} style={{ ["--tilt" as never]: ["-2deg", "1deg", "-1deg", "2deg"][i % 4] }}>
                <p className="font-display font-black text-xl sm:text-2xl xl:text-3xl text-brand-600 leading-none tracking-tight break-words">{p.value}</p>
                <p className="mt-2 font-extrabold text-ink-900 text-sm sm:text-base">{p.title}</p>
                <p className="mt-1 text-[11px] sm:text-xs font-semibold text-ink-400">{p.note}</p>
                <span className="absolute top-3 right-3 text-ink-300" aria-hidden="true">
                  <IcScissors className="w-4 h-4" />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= БЛИЖАЙШИЕ НАБОРЫ ГРУПП ================= */
function GroupDates() {
  const dates = nextMondays(GROUPS.length);
  return (
    <div className="mt-10 rounded-xl bg-ink-900 text-paper-50 p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-400">Ближайшие наборы групп</p>
          <h3 className="mt-1 font-display font-extrabold text-xl sm:text-2xl">Места в группах на {dates[0].toLocaleDateString("ru-RU", { month: "long" })} тают</h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-600/15 border border-brand-600/40 text-brand-400 text-xs font-extrabold px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-brand-500 pulse-dot" /> осталось {GROUPS.reduce((s, g) => s + g.seats, 0)} мест из {GROUPS.length * GROUP_CAPACITY}
        </span>
      </div>
      <div className="mt-6 grid md:grid-cols-3 gap-4">
        {GROUPS.map((g, i) => {
          const d = dates[i];
          const pct = Math.round((g.seats / GROUP_CAPACITY) * 100);
          return (
            <div key={g.name} className={`rounded-lg border p-4 ${g.seats <= 4 ? "border-brand-600/60 bg-brand-600/10" : "border-paper-50/10 bg-paper-50/[0.04]"}`}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="font-display font-black text-2xl leading-none">
                  {d.getDate()} <span className="text-base font-extrabold text-ink-300">{d.toLocaleDateString("ru-RU", { month: "long" })}</span>
                </p>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink-400">пн</p>
              </div>
              <p className="mt-2 font-extrabold text-[15px]">{g.name} группа</p>
              <p className="text-xs font-semibold text-ink-300">{g.schedule}</p>
              <div className="mt-3 h-1.5 rounded-full bg-ink-700 overflow-hidden">
                <div className={`h-full rounded-full ${g.seats <= 4 ? "bg-brand-500" : "bg-[#25d366]"}`} style={{ width: `${pct}%` }} />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <p className={`text-[11px] font-extrabold ${g.seats <= 4 ? "text-brand-400" : "text-ink-300"}`}>осталось {g.seats} из {GROUP_CAPACITY} мест</p>
                <a href="#lead" className="text-[11px] font-extrabold text-paper-50 hover:text-brand-400 transition-colors inline-flex items-center gap-1">
                  Забронировать <IcArrow className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================= УСЛОВИЯ РАССРОЧКИ ================= */
function InstallmentTerms() {
  const facts = [
    { icon: IcCardPercent, k: "Банк-партнёр", v: `${INSTALLMENT.bank} · ${INSTALLMENT.months}` },
    { icon: IcClock, k: "Оформление", v: `${INSTALLMENT.decision}, ${INSTALLMENT.docs}` },
    { icon: IcCheck, k: "Переплата", v: `${INSTALLMENT.overpay} · пример: ${INSTALLMENT.example}` },
    { icon: IcDoc, k: "Первый взнос", v: `${INSTALLMENT.firstPay} при оплате частями школе` },
  ];
  return (
    <div className="mt-10 rounded-xl bg-ink-900 text-paper-50 p-7 sm:p-9 relative overflow-hidden">
      <span className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-brand-600/15 blur-3xl" aria-hidden="true" />
      <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 items-center relative">
        <div className="min-w-0">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-400">Рассрочка без мелкого шрифта</p>
          <p className="mt-2 font-display font-black text-6xl sm:text-7xl leading-none tracking-tight">
            0<span className="text-brand-500">%</span>
          </p>
          <p className="mt-2 font-extrabold text-lg">переплаты — цена из договора не меняется</p>
          <p className="mt-4 text-xs leading-relaxed text-ink-400">
            Рассрочку предоставляет {INSTALLMENT.license}. Не является публичной офертой. {INSTALLMENT.alt}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {facts.map((f) => (
            <div key={f.k} className="rounded-lg border border-paper-50/10 bg-paper-50/[0.04] p-4 hover:border-brand-600/50 transition-colors">
              <f.icon className="w-5 h-5 text-brand-400" />
              <p className="mt-2 text-[10px] font-extrabold uppercase tracking-wider text-ink-400">{f.k}</p>
              <p className="mt-1 text-sm font-bold leading-snug">{f.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================= ТАРИФЫ ================= */
export function Tariffs({ onChoose }: { onChoose: (name: string) => void }) {
  return (
    <section id="tariffs" className="relative bg-paper-100 py-14 lg:py-20 scroll-mt-20" aria-label="Форматы и тарифы">
      <div className="wrap">
        <SectionHead
          num="03"
          kicker="форматы и тарифы"
          title="Выбери свой формат — без скрытых доплат"
          lead="Цена из договора — финальная. Топливо, экзамены и сопровождение уже включены. Рассрочка 0% — от 5 000 ₽ первый взнос."
        />

        <Reveal delay={100}>
          <GroupDates />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 90}>
              <article
                className={`relative h-full min-w-0 flex flex-col rounded-xl p-5 sm:p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.dark
                    ? "bg-ink-900 text-paper-50 shadow-[0_35px_80px_-30px_rgba(7,11,21,0.7)] ring-2 ring-brand-600"
                    : "bg-paper-50 border border-paper-200 hover:shadow-[0_30px_70px_-30px_rgba(12,19,34,0.35)]"
                }`}
              >
                {plan.tag && (
                  <span className="absolute -top-3.5 left-7 rounded-full bg-brand-600 text-paper-50 text-[11px] font-extrabold uppercase tracking-wider px-4 py-1.5 shadow-[0_10px_25px_-8px_rgba(217,30,38,0.8)]">
                    {plan.tag}
                  </span>
                )}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className={`font-display font-extrabold text-2xl ${plan.dark ? "text-paper-50" : "text-ink-900"}`}>{plan.name}</h3>
                    {plan.id === "moto" && (
                      <span className={`mt-1 inline-flex items-center gap-1.5 text-xs font-bold ${plan.dark ? "text-ink-300" : "text-ink-400"}`}>
                        <IcMoto className="w-4 h-4 text-brand-500" /> мотоцикл
                      </span>
                    )}
                  </div>
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-black text-sm shrink-0 ${plan.dark ? "bg-brand-600 text-paper-50" : "bg-brand-50 text-brand-600"}`}>
                    {plan.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>

                <p className={`mt-5 font-display font-black text-[2rem] sm:text-4xl tracking-tight break-words leading-none ${plan.dark ? "text-paper-50" : "text-ink-900"}`}>
                  <span className="whitespace-nowrap">{fmt(plan.price)} <span className="text-[1.4rem] sm:text-2xl">₽</span></span>
                </p>
                <p className={`mt-1 text-sm font-bold ${plan.dark ? "text-brand-400" : "text-brand-600"}`}>{plan.monthly} в рассрочку 0%</p>

                <ul className="mt-6 space-y-3 flex-1 min-w-0">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-start gap-2.5 text-sm leading-snug min-w-0">
                      <span
                        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          f.on
                            ? plan.dark ? "bg-brand-600 text-paper-50" : "bg-brand-50 text-brand-600"
                            : plan.dark ? "bg-ink-700 text-ink-400" : "bg-paper-200 text-ink-400"
                        }`}
                      >
                        {f.on ? <IcCheck className="w-3 h-3" /> : <IcCross className="w-3 h-3" />}
                      </span>
                      <span className={`min-w-0 break-words ${f.on ? (plan.dark ? "text-paper-50/90" : "text-ink-500") : plan.dark ? "text-ink-400 line-through decoration-ink-600" : "text-ink-400 line-through decoration-paper-300"}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button onClick={() => onChoose(plan.name)} className={`btn btn-lg w-full mt-7 ${plan.dark ? "btn-primary" : "btn-outline"}`}>
                  Выбрать тариф
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <InstallmentTerms />
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-6 rounded-xl bg-paper-50 border border-paper-200 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <IcUsers className="w-6 h-6 text-brand-600 shrink-0" />
              <p className="text-sm font-semibold text-ink-500">
                <b className="text-ink-900">Корпоративным клиентам и таксопаркам</b> — отдельные условия и график. Скидки суммируются с акциями.
              </p>
            </div>
            <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
              Обсудить в WhatsApp <IcArrow className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
