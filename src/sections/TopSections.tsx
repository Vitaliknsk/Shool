import { useState } from "react";
import { CONTACTS, DIRECTIONS, GROUPS, IMG, INSTALLMENT, NAV, PLANS, PROMOS, STATS, TRUST, USP } from "../data";
import { Reveal, maskPhone, phoneDigits, sendLead, useCountUp, useInView, useReducedMotion, useScrollY, fmt, nextGroupDate } from "../lib";
import { ICONS, SectionHead } from "../ui";
import {
  IcWheel, IcPhone, IcWhatsApp, IcTelegram, IcBurger, IcX, IcCheck, IcCross,
  IcArrow, IcScissors, IcPin, IcMoto, IcCar, IcShield, IcCardPercent, IcUsers, IcGift,
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
        <a href="#top" className="flex items-center gap-3" aria-label="Автошкола ЗА РУЛЁМ — на главную">
          <span className="w-11 h-11 rounded-full bg-brand-600 text-paper-50 flex items-center justify-center shadow-[0_10px_25px_-8px_rgba(217,30,38,0.8)]">
            <IcWheel className="w-6 h-6" />
          </span>
          <span className="font-display font-black text-paper-50 text-lg leading-none tracking-wide">
            ЗА <span className="text-brand-500">РУЛЁМ</span>
            <span className="hidden min-[400px]:block text-[10px] font-body font-bold tracking-[0.3em] text-ink-300 mt-1">АВТОШКОЛА · НОВОСИБИРСК</span>
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
          className="md:hidden w-11 h-11 rounded-full border border-paper-50/20 text-paper-50 flex items-center justify-center"
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
            <a href={CONTACTS.phoneHref} className="btn btn-primary btn-md flex-1">
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

/* ================= ФОРМА ЗАХВАТА (мини, в hero) ================= */
function MiniLead() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneDigits(phone) !== 11) {
      setErr("Введите номер полностью: +7 (913) 123-45-67");
      return;
    }
    setErr("");
    sendLead({ source: "hero_form", name, phone });
    setDone(true);
  };

  if (done) {
    return (
      <div className="screen-in rounded-xl bg-paper-50/10 border border-[#25d366]/50 backdrop-blur px-5 py-4 text-center">
        <p className="font-display font-extrabold text-paper-50">Заявка принята! 🎉</p>
        <p className="mt-1 text-sm text-paper-50/80">Перезвоним за 15 минут (Пн–Сб, 9:00–20:00) и закрепим скидку 2 000 ₽.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-xl bg-ink-900/70 border border-paper-50/15 backdrop-blur p-4 sm:p-5">
      <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3">
        <input className="field" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} aria-label="Имя" />
        <input className="field" placeholder="+7 (___) ___-__-__" inputMode="tel" value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} aria-label="Телефон" />
        <button type="submit" className="btn btn-primary btn-md">Записаться</button>
      </div>
      {err && <p className="mt-2 text-xs font-bold text-brand-400">{err}</p>}
      <p className="mt-2.5 text-[11px] text-ink-300 leading-relaxed">
        Перезвоним за 15 минут и закрепим скидку 2 000 ₽. Обработка персональных данных — по 152-ФЗ.
      </p>
    </form>
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
          className={`w-full h-full object-cover object-[65%_center] ${reduced ? "" : "kenburns"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
      </div>

      <div className="wrap relative pt-24 pb-8 sm:pt-28 lg:pb-12 w-full">
        <div className="max-w-3xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 text-paper-50 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] px-3 sm:px-4 py-1.5 sm:py-2">
                <IcPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Новосибирск
              </span>
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold text-paper-50/70">
                <span className="w-2 h-2 rounded-full bg-[#25d366] pulse-dot shrink-0" /> идёт набор · старт {nextGroupDate()}
              </span>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="mt-4 sm:mt-6 font-display font-black text-paper-50 text-[1.55rem] leading-[1.14] sm:text-[2.6rem] sm:leading-[1.06] lg:text-[3.4rem] tracking-tight">
              Получи права категории B за <span className="marker">2,5 месяца</span> в&nbsp;Новосибирске. Рассрочка&nbsp;0%. Начни с&nbsp;<span className="text-brand-500">5&nbsp;000&nbsp;₽</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <ul className="mt-4 flex flex-wrap gap-2">
              {USP.map((u) => (
                <li key={u} className="inline-flex items-center gap-1.5 rounded-full bg-paper-50/10 border border-paper-50/20 text-paper-50 text-[12px] sm:text-[13px] font-bold px-3.5 py-1.5">
                  <IcCheck className="w-3.5 h-3.5 text-brand-400 shrink-0" /> {u}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={230}>
            <div className="mt-6">
              <MiniLead />
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" data-goal="whatsapp_click" className="btn btn-md bg-[#25d366] text-ink-950 hover:brightness-110 hover:-translate-y-0.5 !px-6 !py-3.5 w-full sm:w-auto">
                <IcWhatsApp className="w-5 h-5 shrink-0" /> Написать в WhatsApp
              </a>
              <a href="#tariffs" className="btn btn-ghost-light btn-md w-full sm:w-auto">
                Смотреть тарифы <IcArrow className="w-4 h-4 shrink-0" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={370}>
            <ul className="mt-7 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:gap-x-7 sm:gap-y-3 max-w-xl">
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

export function Numbers() {
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  return (
    <section className="relative bg-paper-100 py-16 lg:py-24" aria-label="Автошкола в цифрах">
      <div className="wrap">
        <SectionHead num="01" kicker="почему нам доверяют" title="Автошкола в цифрах, а не в обещаниях" lead="Каждая цифра проверяема: лицензия — на сайте Рособрнадзора, отзывы — на Яндекс.Картах и 2ГИС." />
        <div ref={ref} className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <StatCard {...s} run={inView} delay={i * 120} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= ДВА НАПРАВЛЕНИЯ (A и B отдельно) ================= */
export function SplitOffers() {
  return (
    <section className="bg-paper-100 pb-16 lg:pb-24" aria-label="Категории A и B">
      <div className="wrap">
        <SectionHead num="02" kicker="два направления" title="Автомобиль или мотоцикл — выбирай своё" lead="Разные программы, сроки и цены. Не смешиваем: у каждой категории — свой оффер." />
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {DIRECTIONS.map((d, i) => {
            const Ic = d.icon === "moto" ? IcMoto : IcCar;
            return (
              <Reveal key={d.id} delay={i * 110} variant="reveal-scale">
                <a href={`#${d.anchor}`} className={`group block h-full rounded-xl p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 ${d.accent ? "bg-ink-900 text-paper-50 ring-2 ring-brand-600 shadow-[0_35px_80px_-30px_rgba(7,11,21,0.7)]" : "bg-paper-50 border border-paper-200 hover:shadow-[0_30px_70px_-30px_rgba(12,19,34,0.35)]"}`}>
                  <div className="flex items-start justify-between">
                    <span className={`w-14 h-14 rounded-xl flex items-center justify-center ${d.accent ? "bg-brand-600 text-paper-50" : "bg-brand-50 text-brand-600"}`}>
                      <Ic className="w-7 h-7" />
                    </span>
                    <span className={`rounded-full text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 ${d.accent ? "bg-brand-600/20 text-brand-400" : "bg-brand-50 text-brand-600"}`}>
                      {d.term}
                    </span>
                  </div>
                  <h3 className={`mt-5 font-display font-extrabold text-2xl ${d.accent ? "text-paper-50" : "text-ink-900"}`}>{d.cat}</h3>
                  <p className={`text-sm font-semibold ${d.accent ? "text-ink-300" : "text-ink-400"}`}>{d.what}</p>
                  <p className={`mt-3 font-display font-black text-3xl ${d.accent ? "text-brand-400" : "text-brand-600"}`}>{d.price}</p>
                  <ul className="mt-5 space-y-2.5">
                    {d.points.map((p) => (
                      <li key={p} className={`flex items-start gap-2.5 text-sm leading-snug ${d.accent ? "text-paper-50/90" : "text-ink-500"}`}>
                        <IcCheck className={`w-4 h-4 shrink-0 mt-0.5 ${d.accent ? "text-brand-400" : "text-brand-600"}`} /> {p}
                      </li>
                    ))}
                  </ul>
                  <span className={`btn btn-md w-full mt-6 ${d.accent ? "btn-primary" : "btn-outline"}`}>
                    {d.cta} <IcArrow className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
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
    <section className="bg-paper-100 pb-10" aria-label="Акции автошколы">
      <div className="wrap">
        <div className="roadline mb-9" aria-hidden="true" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PROMOS.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} variant="reveal-scale">
              <div className={`coupon coupon-notch rounded-xl border-2 border-dashed border-brand-600/60 bg-paper-50 p-4 sm:p-6 text-center ${tilts[i % 4]}`}>
                <p className="font-display font-black text-[1.35rem] sm:text-3xl text-brand-600 leading-none tracking-tight break-words">{p.value}</p>
                <p className="mt-2 font-extrabold text-ink-900 text-sm sm:text-base">{p.title}</p>
                <p className="mt-1 text-[11px] sm:text-xs font-semibold text-ink-400">{p.note}</p>
                <span className="absolute top-3 right-3 text-ink-300" aria-hidden="true"><IcScissors className="w-4 h-4" /></span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= ТАРИФЫ ================= */
export function Tariffs({ onChoose }: { onChoose: (name: string) => void }) {
  return (
    <section id="tariffs" className="relative bg-paper-100 py-14 lg:py-20 scroll-mt-20" aria-label="Форматы и тарифы">
      <div className="wrap">
        <SectionHead num="03" kicker="форматы и тарифы" title="Выбери свой формат — без скрытых доплат" lead="Цена из договора — финальная. Топливо, экзамены и сопровождение уже включены. Рассрочка 0% — от 5 000 ₽ первый взнос." />
        <div className="mt-12 grid lg:grid-cols-2 gap-5 lg:gap-6">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 90}>
              <article className={`relative h-full flex flex-col rounded-xl p-5 sm:p-8 transition-all duration-300 hover:-translate-y-2 min-w-0 ${plan.dark ? "bg-ink-900 text-paper-50 shadow-[0_35px_80px_-30px_rgba(7,11,21,0.7)] ring-2 ring-brand-600" : "bg-paper-50 border border-paper-200 hover:shadow-[0_30px_70px_-30px_rgba(12,19,34,0.35)]"}`}>
                {plan.tag && (
                  <span className="absolute -top-3.5 left-7 rounded-full bg-brand-600 text-paper-50 text-[11px] font-extrabold uppercase tracking-wider px-4 py-1.5 shadow-[0_10px_25px_-8px_rgba(217,30,38,0.8)]">{plan.tag}</span>
                )}
                <div className="flex items-start justify-between gap-3">
                  <div>
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
                      <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.on ? (plan.dark ? "bg-brand-600 text-paper-50" : "bg-brand-50 text-brand-600") : plan.dark ? "bg-ink-700 text-ink-400" : "bg-paper-200 text-ink-400"}`}>
                        {f.on ? <IcCheck className="w-3 h-3" /> : <IcCross className="w-3 h-3" />}
                      </span>
                      <span className={`min-w-0 break-words ${f.on ? (plan.dark ? "text-paper-50/90" : "text-ink-500") : plan.dark ? "text-ink-400 line-through decoration-ink-600" : "text-ink-400 line-through decoration-paper-300"}`}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => onChoose(plan.name)} className={`btn btn-lg w-full mt-7 ${plan.dark ? "btn-primary" : "btn-outline"}`}>Выбрать тариф</button>
              </article>
            </Reveal>
          ))}
        </div>

        {/* условия рассрочки + наборы групп */}
        <div className="mt-10 grid lg:grid-cols-2 gap-5">
          <Reveal delay={120}>
            <div className="h-full rounded-xl bg-ink-900 text-paper-50 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-brand-600 text-paper-50 flex items-center justify-center"><IcCardPercent className="w-6 h-6" /></span>
                <h3 className="font-display font-extrabold text-xl">Рассрочка 0% — условия открыто</h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {[
                  ["Банк-партнёр", INSTALLMENT.bank],
                  ["Срок", INSTALLMENT.terms],
                  ["Переплата", INSTALLMENT.overpay],
                  ["Первый взнос", INSTALLMENT.first],
                  ["Документы", INSTALLMENT.docs],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-start justify-between gap-4 text-sm">
                    <span className="text-ink-300 font-semibold shrink-0">{k}</span>
                    <span className="text-paper-50 font-bold text-right">{v}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 rounded-lg bg-brand-600/15 border border-brand-600/40 px-4 py-3 text-sm font-bold text-brand-400">
                Пример: {INSTALLMENT.example}
              </p>
              <p className="mt-3 text-xs text-ink-300 leading-relaxed">{INSTALLMENT.fallback}.</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="h-full rounded-xl bg-paper-50 border border-paper-200 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><IcUsers className="w-6 h-6" /></span>
                <h3 className="font-display font-extrabold text-xl text-ink-900">Ближайшие наборы групп</h3>
              </div>
              <div className="mt-5 space-y-3">
                {GROUPS().map((g) => {
                  const pct = Math.round((g.left / 12) * 100);
                  return (
                    <div key={g.date} className="rounded-lg border border-paper-200 bg-paper-100 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-extrabold text-ink-900">{g.date}</p>
                        <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full ${g.left <= 4 ? "bg-brand-600 text-paper-50" : "bg-brand-50 text-brand-600"}`}>
                          осталось {g.left} мест
                        </span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-ink-400">{g.schedule}</p>
                      <div className="mt-2.5 h-1.5 rounded-full bg-paper-200 overflow-hidden">
                        <div className={`h-full rounded-full ${g.left <= 4 ? "bg-brand-600" : "bg-brand-400"}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <a href="#lead" className="btn btn-outline btn-md w-full mt-5">Забронировать место <IcArrow className="w-4 h-4 shrink-0" /></a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
