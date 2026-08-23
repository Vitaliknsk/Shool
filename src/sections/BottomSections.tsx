import { useEffect, useState } from "react";
import { CONTACTS, FAQS, IMG, NAV, QUIZ_STEPS, RATING_SOURCES, REVIEWS, VIDEO_REVIEWS, quizResult } from "../data";
import { Reveal, maskPhone, phoneDigits, sendLead, goTo } from "../lib";
import { ICONS, Modal, SectionHead, Stars } from "../ui";
import {
  IcWhatsApp, IcTelegram, IcVk, IcPhone, IcPlay, IcArrow, IcCheck, IcShield, IcGift,
  IcChevron, IcWheel, IcSend, IcClock, IcPin, IcCar, IcCookie, IcDoc,
} from "../icons";

/* ================= ОТЗЫВЫ ================= */
export function Reviews() {
  const [video, setVideo] = useState<(typeof VIDEO_REVIEWS)[number] | null>(null);
  return (
    <section id="reviews" className="relative bg-paper-100 py-20 lg:py-28 scroll-mt-20" aria-label="Отзывы выпускников">
      <div className="wrap">
        <SectionHead num="09" kicker="отзывы выпускников" title="Что говорят те, кто уже сдал" lead="Не выбираем «удобные» — публикуем как есть: с именами, датами и проверяемыми источниками." />
        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-3">
            {RATING_SOURCES.map((r) => (
              <a key={r.name} href={r.href} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-paper-200 bg-paper-50 pl-5 pr-4 py-3 hover:border-brand-600/50 hover:-translate-y-0.5 transition-all">
                <span className="font-display font-black text-ink-900 text-xl">{r.score}</span>
                <Stars className="w-3.5 h-3.5" />
                <span className="text-sm">
                  <span className="block font-bold text-ink-900 leading-tight">{r.name}</span>
                  <span className="block text-[11px] text-ink-400 font-semibold">{r.reviews} отзывов</span>
                </span>
                <IcArrow className="w-4 h-4 text-ink-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
              </a>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {VIDEO_REVIEWS.map((v, i) => (
            <Reveal key={v.name} delay={i * 110}>
              <button onClick={() => setVideo(v)} className="group relative w-full overflow-hidden rounded-xl text-left shadow-lg focus:outline-none focus:ring-4 focus:ring-brand-600/40">
                <img src={IMG[v.img as keyof typeof IMG]} alt={`Видеоотзыв курсанта автошколы — ${v.name}`} loading="lazy" decoding="async" className="w-full aspect-[16/9.5] object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]" />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/25 to-ink-950/20 transition-colors group-hover:from-ink-950/80" />
                <span className="absolute top-4 left-4 rounded-full bg-brand-600 text-paper-50 text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5">Видеоотзыв</span>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-600 text-paper-50 flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(217,30,38,0.8)] transition-transform duration-300 group-hover:scale-110">
                  <IcPlay className="w-7 h-7 translate-x-0.5" />
                </span>
                <span className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block font-display font-extrabold text-paper-50 text-[15px] sm:text-lg leading-snug">{v.name}: {v.title}</span>
                    <span className="hidden sm:block text-xs text-ink-200 font-semibold mt-0.5">курсант категории B · запись из учебного авто</span>
                  </span>
                  <span className="rounded-md bg-ink-950/80 text-paper-50 text-xs font-bold px-2 py-1 shrink-0">{v.duration}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 90}>
              <article className="h-full flex flex-col rounded-xl bg-paper-50 border border-paper-200 p-6 shadow-sm hover:shadow-[0_25px_55px_-28px_rgba(12,19,34,0.4)] hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3.5">
                  <img src={IMG[r.img as keyof typeof IMG]} alt={`Курсант автошколы — ${r.name}`} loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover object-top ring-2 ring-brand-600/30" />
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-ink-900 text-[15px] leading-tight truncate">{r.name}</h3>
                    <p className="text-xs text-ink-400 font-semibold mt-0.5">{r.meta}</p>
                  </div>
                </div>
                <div className="mt-3.5 flex items-center gap-2.5">
                  <Stars className="w-3.5 h-3.5" />
                  <span className="text-[11px] text-ink-400 font-semibold">{r.date}</span>
                </div>
                <p className="mt-3.5 text-sm leading-relaxed text-ink-500 flex-1">{r.text}</p>
                <div className="mt-5 pt-4 border-t border-paper-200 flex items-center justify-between">
                  <span className="rounded-full bg-brand-50 text-brand-700 text-[11px] font-extrabold px-3 py-1">{r.source}</span>
                  <span className="flex items-center gap-1 text-[11px] text-ink-400 font-semibold"><IcCheck className="w-3.5 h-3.5 text-brand-600" /> проверенный ученик</span>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal delay={180}>
            <article className="h-full flex flex-col justify-center rounded-xl bg-ink-900 text-paper-50 p-7 relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-brand-600/20 blur-2xl" aria-hidden="true" />
              <p className="font-display font-black text-6xl leading-none">4,9</p>
              <Stars className="w-5 h-5 mt-3 text-brand-500" />
              <p className="mt-3 text-sm text-ink-300 leading-relaxed">средняя оценка по 293 отзывам на трёх площадках — без накруток, модерация площадок это проверяет</p>
              <div className="mt-6 space-y-2">
                {RATING_SOURCES.map((r) => (
                  <a key={r.name} href={r.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between text-sm font-bold text-paper-50/85 hover:text-brand-400 transition-colors">
                    Смотреть на {r.name} <IcArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>

      <Modal open={!!video} onClose={() => setVideo(null)} labelledBy="video-title">
        {video && (
          <div>
            <div className="relative aspect-video overflow-hidden rounded-t-2xl">
              <img src={IMG[video.img as keyof typeof IMG]} alt={`Видеоотзыв — ${video.name}`} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-ink-950/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
                <div className="flex items-end gap-1.5 h-10" aria-hidden="true">
                  {[0.9, 0.5, 1.1, 0.7, 1.3, 0.6].map((d, i) => (
                    <span key={i} className="eq-bar w-1.5 h-full rounded-full bg-brand-500" style={{ animationDelay: `${i * 0.12}s`, animationDuration: `${d}s` }} />
                  ))}
                </div>
                <div className="mt-6 space-y-1.5 text-center max-w-md">
                  {video.transcript.map((line, i) => (
                    <p key={i} className="text-paper-50 text-sm font-semibold screen-in" style={{ animationDelay: `${0.3 + i * 0.55}s`, animationFillMode: "both" }}>{line}</p>
                  ))}
                </div>
              </div>
              <span className="absolute bottom-3 right-3 rounded-md bg-ink-950/85 text-paper-50 text-xs font-bold px-2.5 py-1">{video.duration}</span>
            </div>
            <div className="p-6 sm:p-7">
              <h3 id="video-title" className="font-display font-extrabold text-paper-50 text-xl">{video.name} — {video.title}</h3>
              <p className="mt-1.5 text-sm text-ink-300">Снято в учебном автомобиле с разрешения курсанта. Полные версии — в нашем Telegram-канале.</p>
              <a href={CONTACTS.tg} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-md mt-5">
                <IcTelegram className="w-4 h-4 text-[#4da3e8]" /> Больше видеоотзывов
              </a>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

/* ================= FAQ ================= */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-paper-50 py-20 lg:py-28 scroll-mt-20" aria-label="Частые вопросы">
      <div className="wrap grid lg:grid-cols-[0.85fr_1.15fr] gap-12">
        <div className="lg:sticky lg:top-28 self-start">
          <SectionHead num="10" kicker="частые вопросы" title="Спрашивают перед стартом" lead="Собрали то, что чаще всего пишут в WhatsApp. Если вашего вопроса нет — просто спросите, ответим за пару минут." />
          <Reveal delay={150}>
            <div className="mt-8 rounded-xl border border-paper-200 bg-paper-100 p-6">
              <p className="font-display font-extrabold text-ink-900">Не нашли ответ?</p>
              <p className="text-sm text-ink-500 mt-1.5">Напишите — быстрее, чем звонить. Отвечаем в течение 15 минут в рабочее время.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" data-goal="whatsapp_click" className="btn btn-primary btn-sm"><IcWhatsApp className="w-4 h-4" /> WhatsApp</a>
                <a href={CONTACTS.tg} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm"><IcTelegram className="w-4 h-4 text-[#2aabee]" /> Telegram</a>
                <a href={CONTACTS.phoneHref} className="btn btn-outline btn-sm" data-goal="phone_click"><IcPhone className="w-4 h-4" /> Позвонить</a>
              </div>
            </div>
          </Reveal>
        </div>
        <div>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i * 45, 200)}>
                <div className={`mb-3 rounded-xl border bg-paper-50 overflow-hidden transition-colors ${isOpen ? "border-brand-600/50 shadow-[0_18px_40px_-25px_rgba(217,30,38,0.35)]" : "border-paper-200 hover:border-ink-300"}`}>
                  <button className="w-full flex items-center justify-between gap-4 p-5 text-left" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen}>
                    <span className="font-bold text-[15px] leading-snug text-ink-900">{f.q}</span>
                    <span className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-brand-600 text-paper-50 rotate-180" : "bg-brand-50 text-brand-600"}`}>
                      <IcChevron className="w-5 h-5" />
                    </span>
                  </button>
                  <div className={`acc-body ${isOpen ? "open" : ""}`}>
                    <div className="acc-inner"><p className="px-5 pb-5 text-sm leading-relaxed text-ink-500">{f.a}</p></div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= КВИЗ ================= */
const SideCar = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 48 20" fill="none" className={className} style={style} aria-hidden="true">
    <path d="M2 14h6l4-6h12l5 6h15a2 2 0 0 1 2 2v2H2v-4Z" fill="currentColor" />
    <circle cx="12" cy="16.5" r="3.2" fill="currentColor" stroke="var(--color-ink-950)" strokeWidth="1.6" />
    <circle cx="36" cy="16.5" r="3.2" fill="currentColor" stroke="var(--color-ink-950)" strokeWidth="1.6" />
    <path d="M14 8.6h9.5L26.5 12H14v-3.4Z" fill="var(--color-ink-950)" opacity="0.35" />
  </svg>
);

export function Quiz({ onPlanChosen }: { onPlanChosen: (plan: string) => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [phase, setPhase] = useState<"quiz" | "result" | "done">("quiz");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");

  const progress = phase === "quiz" ? ((step + 1) / (QUIZ_STEPS.length + 1)) * 100 : 100;

  const pick = (v: string) => {
    const next = [...answers.slice(0, step), v];
    setAnswers(next);
    if (step < QUIZ_STEPS.length - 1) setTimeout(() => setStep(step + 1), 240);
    else setTimeout(() => setPhase("result"), 240);
  };

  const reset = () => {
    setStep(0); setAnswers([]); setPhase("quiz"); setName(""); setPhone(""); setErr("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneDigits(phone) !== 11) {
      setErr("Введите номер полностью — например, +7 (913) 123-45-67");
      return;
    }
    setErr("");
    const res = quizResult(answers);
    sendLead({ source: "quiz", plan: res.plan, name, phone });
    onPlanChosen(res.plan);
    setPhase("done");
  };

  const res = phase === "quiz" ? null : quizResult(answers);

  return (
    <section id="quiz" className="relative bg-ink-950 py-20 lg:py-28 scroll-mt-20 overflow-hidden" aria-label="Подбор тарифа">
      <div className="absolute -left-24 -top-24 w-[420px] h-[420px] rounded-full bg-brand-600/10 blur-3xl" aria-hidden="true" />
      <div className="wrap relative">
        <SectionHead num="11" kicker="подбор тарифа" dark center title="Не знаешь, какой тариф выбрать?" lead="Пройди тест за 1 минуту и получи 5 занятий по теории бесплатно + скидку 2 000 ₽ на любой тариф." />
        <Reveal delay={120} variant="reveal-scale">
          <div className="mt-12 max-w-3xl mx-auto rounded-xl bg-ink-850 border border-ink-700 p-6 sm:p-10 shadow-[0_40px_90px_-40px_rgba(7,11,21,0.9)]">
            <div className="relative">
              <div className="h-2 rounded-full bg-ink-700 overflow-hidden">
                <div className="h-full rounded-full bg-brand-600 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <SideCar className="car-bob absolute -top-6 w-10 h-5 text-brand-500 transition-all duration-500" style={{ left: `min(calc(${progress}% - 20px), calc(100% - 40px))` }} />
            </div>
            <p className="mt-3 text-xs font-bold text-ink-300 uppercase tracking-wider">
              {phase === "quiz" ? `Шаг ${step + 1} из ${QUIZ_STEPS.length}` : phase === "result" ? "Результат готов" : "Заявка принята"}
            </p>

            {phase === "quiz" && (
              <div key={step} className="screen-in mt-6">
                <h3 className="font-display font-extrabold text-paper-50 text-xl sm:text-2xl">{QUIZ_STEPS[step].q}</h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {QUIZ_STEPS[step].opts.map((o) => {
                    const Ic = ICONS[o.icon];
                    const selected = answers[step] === o.v;
                    return (
                      <button key={o.v} onClick={() => pick(o.v)}
                        className={`rounded-xl border-2 p-4 text-left transition-all duration-200 hover:-translate-y-1 flex flex-col gap-3 ${selected ? "border-brand-600 bg-brand-600/15" : "border-ink-600 bg-ink-900 hover:border-brand-500"}`}>
                        <Ic className={`w-6 h-6 ${selected ? "text-brand-400" : "text-brand-500"}`} />
                        <span className="font-bold text-sm text-paper-50/90 leading-snug">{o.label}</span>
                      </button>
                    );
                  })}
                </div>
                {step > 0 && (
                  <button onClick={() => setStep(step - 1)} className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-ink-300 hover:text-paper-50 transition-colors">
                    <IcChevron className="w-4 h-4 rotate-90" /> Назад
                  </button>
                )}
              </div>
            )}

            {phase === "result" && res && (
              <div className="screen-in mt-6 text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-600/15 border border-brand-600/40 text-brand-400 text-xs font-extrabold uppercase tracking-wider px-4 py-1.5">
                  <IcWheel className="w-4 h-4" /> Твой результат
                </span>
                <h3 className="mt-4 font-display font-black text-paper-50 text-[1.45rem] leading-tight sm:text-3xl lg:text-4xl">
                  Тариф «{res.plan}» · <span className="text-brand-500 whitespace-nowrap">{res.price}</span>
                </h3>
                <p className="mt-2 text-ink-300 text-sm max-w-md mx-auto">{res.note}. Рассрочка 0% — первый взнос от 5 000 ₽.</p>
                <div className="mt-5 mx-auto max-w-md rounded-xl border border-dashed border-brand-500/70 bg-brand-600/10 p-4 flex items-center justify-center gap-3 text-sm font-bold text-paper-50">
                  <IcGift className="w-6 h-6 text-brand-400 shrink-0" />
                  Бонус: 5 занятий теории бесплатно + скидка 2 000 ₽
                </div>
                <form onSubmit={submit} className="mt-6 max-w-md mx-auto text-left">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input className="field" placeholder="Как тебя зовут?" value={name} onChange={(e) => setName(e.target.value)} aria-label="Имя" />
                    <input className="field" placeholder="+7 (___) ___-__-__" inputMode="tel" value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} aria-label="Телефон" />
                  </div>
                  {err && <p className="mt-2 text-xs font-bold text-brand-400">{err}</p>}
                  <button type="submit" className="btn btn-primary btn-lg w-full mt-4">Получить результат и бонус</button>
                  <p className="mt-3 text-[11px] text-ink-400 text-center">Отправим промокод в WhatsApp и перезвоним за 15 минут. Согласие на обработку ПД — по 152-ФЗ.</p>
                </form>
                <button onClick={reset} className="mt-4 text-sm font-bold text-ink-300 hover:text-paper-50 transition-colors">↺ Пройти ещё раз</button>
              </div>
            )}

            {phase === "done" && (
              <div className="screen-in mt-6 text-center py-6">
                <span className="mx-auto w-16 h-16 rounded-full bg-brand-600 text-paper-50 flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(217,30,38,0.8)]"><IcCheck className="w-8 h-8" /></span>
                <h3 className="mt-5 font-display font-black text-paper-50 text-2xl">Готово, {name || "будущий водитель"}!</h3>
                <p className="mt-2 text-ink-300 text-sm max-w-md mx-auto">
                  Менеджер отправит результат, промокод на 2 000 ₽ и доступ к теории в WhatsApp в течение 15 минут (Пн–Сб, 9:00–20:00).
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" className="btn btn-md bg-[#25d366] text-ink-950 hover:brightness-110"><IcWhatsApp className="w-5 h-5" /> Написать первым</a>
                  <button onClick={reset} className="btn btn-ghost-light btn-md">Пройти ещё раз</button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= ФОРМА ЗАХВАТА ================= */
export function LeadForm({ plan, onClearPlan, onLegal }: { plan: string | null; onClearPlan: () => void; onLegal: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cat, setCat] = useState("B");
  const [agree, setAgree] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneDigits(phone) !== 11) {
      setErr("Проверьте номер: нужно 11 цифр, например +7 (913) 123-45-67");
      return;
    }
    if (!agree) {
      setErr("Нужно согласие на обработку персональных данных — без него не имеем права перезванивать.");
      return;
    }
    setErr("");
    sendLead({ source: "lead_form", plan: plan ?? "—", category: cat, name, phone });
    setDone(true);
  };

  return (
    <section id="lead" className="relative py-20 lg:py-28 overflow-hidden scroll-mt-20" aria-label="Оставить заявку">
      <div className="absolute inset-0">
        <img src={IMG.hero} alt="" aria-hidden="true" loading="lazy" decoding="async" className="w-full h-full object-cover object-right" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/92 to-ink-950/70" />
      </div>
      <div className="wrap relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <SectionHead num="12" kicker="старт" dark title="Оставь заявку — заберёшь скидку 2 000 ₽" lead="Расскажем про тарифы, рассрочку и ближайшую группу. Решение всегда за вами." />
          <Reveal delay={140}>
            <ul className="mt-8 space-y-3.5">
              {["Перезвоним за 15 минут в рабочее время", "Ответим на вопросы — ничего не навязываем", "Поможем с рассрочкой, медкомиссией и вычетом 13%"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-paper-50/90 font-semibold text-[15px]">
                  <span className="w-6 h-6 rounded-full bg-brand-600 text-paper-50 flex items-center justify-center shrink-0"><IcCheck className="w-3.5 h-3.5" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 border-l-2 border-brand-600 pl-4 text-ink-200 text-sm leading-relaxed max-w-md">
              <b className="text-paper-50">Гарантия:</b> перезвоним за 15 минут. Не навязываем — просто ответим на вопросы.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9">
              <p className="text-paper-50/70 text-sm font-bold mb-3">Или напиши нам — отвечаем быстрее, чем звоним:</p>
              <div className="flex flex-wrap gap-3">
                <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" data-goal="whatsapp_click" className="btn btn-md bg-[#25d366] text-ink-950 hover:brightness-110 hover:-translate-y-0.5"><IcWhatsApp className="w-5 h-5" /> WhatsApp</a>
                <a href={CONTACTS.tg} target="_blank" rel="noopener noreferrer" className="btn btn-md bg-[#2aabee] text-paper-50 hover:brightness-110 hover:-translate-y-0.5"><IcTelegram className="w-5 h-5" /> Telegram</a>
                <a href={CONTACTS.phoneHref} data-goal="phone_click" className="btn btn-ghost-light btn-md"><IcPhone className="w-5 h-5" /> {CONTACTS.phoneDisplay}</a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="reveal-scale" delay={120}>
          <div className="rounded-xl bg-paper-50 border-t-4 border-brand-600 p-7 sm:p-9 shadow-[0_50px_100px_-40px_rgba(7,11,21,0.9)]">
            {done ? (
              <div className="screen-in text-center py-8">
                <span className="mx-auto w-16 h-16 rounded-full bg-brand-600 text-paper-50 flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(217,30,38,0.8)]"><IcCheck className="w-8 h-8" /></span>
                <h3 className="mt-5 font-display font-black text-ink-900 text-2xl">Заявка принята!</h3>
                <p className="mt-2 text-ink-500 text-sm max-w-sm mx-auto leading-relaxed">
                  Менеджер перезвонит в течение 15 минут (Пн–Сб, 9:00–20:00). Если удобнее мессенджер — напишите нам прямо сейчас:
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" className="btn btn-md bg-[#25d366] text-ink-950 hover:brightness-110"><IcWhatsApp className="w-5 h-5" /></a>
                  <a href={CONTACTS.tg} target="_blank" rel="noopener noreferrer" className="btn btn-md bg-[#2aabee] text-paper-50 hover:brightness-110"><IcTelegram className="w-5 h-5" /></a>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-display font-extrabold text-ink-900 text-2xl">Получить консультацию</h3>
                <p className="mt-1.5 text-sm text-ink-500">И скидку 2 000 ₽ на любой тариф — закрепим за номером.</p>
                {plan && (
                  <div className="mt-5 flex items-center gap-2 rounded-lg bg-brand-50 border border-brand-600/30 px-4 py-2.5 text-sm font-bold text-brand-700">
                    <IcWheel className="w-4 h-4 shrink-0" />
                    <span className="flex-1">Тариф: «{plan}»</span>
                    <button onClick={onClearPlan} className="text-brand-700/70 hover:text-brand-700 font-extrabold" aria-label="Убрать выбранный тариф">✕</button>
                  </div>
                )}
                <form onSubmit={submit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="lead-name" className="block text-xs font-extrabold uppercase tracking-wider text-ink-400 mb-1.5">Имя</label>
                    <input id="lead-name" className="field" placeholder="Как к вам обращаться?" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="lead-phone" className="block text-xs font-extrabold uppercase tracking-wider text-ink-400 mb-1.5">Телефон *</label>
                    <input id="lead-phone" className="field" placeholder="+7 (___) ___-__-__" inputMode="tel" required value={phone} onChange={(e) => setPhone(maskPhone(e.target.value))} />
                  </div>
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-ink-400 mb-1.5">Категория</label>
                    <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Выбор категории">
                      {["A", "B", "Пока не знаю"].map((c) => (
                        <button type="button" key={c} onClick={() => setCat(c)} aria-pressed={cat === c}
                          className={`rounded-lg border-2 py-2.5 px-1 text-[12.5px] sm:text-sm font-extrabold transition-all leading-tight ${cat === c ? "border-brand-600 bg-brand-600 text-paper-50 shadow-[0_10px_25px_-12px_rgba(217,30,38,0.7)]" : "border-paper-200 text-ink-500 hover:border-brand-300"}`}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                  {err && <p className="rounded-lg bg-brand-50 border border-brand-600/30 text-brand-700 text-[13px] font-bold px-4 py-3" role="alert">{err}</p>}
                  <button type="submit" className="btn btn-primary btn-lg w-full">Получить консультацию и скидку 2 000 ₽</button>
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 w-4 h-4 accent-[#d91e26] shrink-0" />
                    <span className="text-[11.5px] leading-relaxed text-ink-400">
                      Согласен(на) на обработку персональных данных в соответствии со 152-ФЗ «О персональных данных».{" "}
                      <button type="button" onClick={onLegal} className="underline hover:text-brand-600 transition-colors">Политика конфиденциальности</button>
                    </span>
                  </label>
                </form>
                <div className="mt-4 rounded-lg bg-brand-50/60 border border-brand-600/20 px-4 py-3 text-[11px] leading-relaxed text-ink-500">
                  Собираем только имя и телефон, чтобы перезвонить. Обработка — по 152-ФЗ, данные хранятся на серверах в РФ и не передаются третьим лицам. Удалим по первому запросу.{" "}
                  <button type="button" onClick={onLegal} className="text-brand-600 font-bold underline">Подробнее</button>
                </div>
                <p className="mt-5 pt-5 border-t border-paper-200 flex items-center gap-2 text-[11.5px] text-ink-400 font-semibold">
                  <IcShield className="w-4 h-4 text-brand-600 shrink-0" /> Данные защищены по 152-ФЗ и не передаются третьим лицам
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= COOKIES (152-ФЗ) ================= */
export function CookieConsent({ onPrivacy }: { onPrivacy: () => void }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem("zr_cookie_accepted") === "1") return;
    } catch { /* приватный режим — показываем баннер */ }
    const t = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);
  const accept = () => {
    try {
      localStorage.setItem("zr_cookie_accepted", "1");
    } catch { /* ignore */ }
    setVisible(false);
  };
  if (!visible) return null;
  return (
    <div role="region" aria-label="Согласие на использование файлов cookie"
      className="screen-in fixed z-[70] inset-x-3 bottom-[5.4rem] lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:bottom-6 lg:w-full lg:max-w-3xl">
      <div className="relative rounded-xl bg-ink-850/97 border border-ink-600 shadow-[0_30px_80px_-20px_rgba(7,11,21,0.9)] p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4 overflow-hidden">
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand-600" aria-hidden="true" />
        <span className="hidden sm:flex w-11 h-11 rounded-full bg-brand-600/15 text-brand-400 items-center justify-center shrink-0"><IcCookie className="w-6 h-6" /></span>
        <div className="flex-1 min-w-0">
          <p className="text-paper-50 text-sm font-bold leading-snug">Мы используем файлы cookie</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-ink-300">
            Они нужны для работы сайта, аналитики посещаемости (Яндекс.Метрика, Google Analytics) и запоминают ваш выбор — например, согласие на cookie.
            Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
            <button onClick={onPrivacy} className="text-brand-400 underline decoration-brand-500/50 underline-offset-2 hover:text-brand-300 transition-colors">политикой конфиденциальности</button>{" "}
            в соответствии со 152-ФЗ «О персональных данных».
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
          <button onClick={onPrivacy} className="w-10 h-10 rounded-full border border-ink-600 text-ink-300 flex items-center justify-center hover:text-paper-50 hover:border-ink-400 transition-colors" aria-label="Подробнее о cookie"><IcDoc className="w-5 h-5" /></button>
          <button onClick={accept} className="btn btn-primary btn-md flex-1 sm:flex-none">Принять</button>
        </div>
      </div>
    </div>
  );
}

/* ================= ПОДВАЛ ================= */
export function Footer({ onPrivacy, onTerms }: { onPrivacy: () => void; onTerms: () => void }) {
  return (
    <footer className="bg-ink-950 border-t border-paper-50/10 pb-28 lg:pb-10" aria-label="Подвал">
      <div className="wrap pt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_1fr_1fr]">
        <div>
          <a href="#top" className="flex items-center gap-3 w-fit">
            <span className="w-11 h-11 rounded-full bg-brand-600 text-paper-50 flex items-center justify-center"><IcWheel className="w-6 h-6" /></span>
            <span className="font-display font-black text-paper-50 text-lg tracking-wide">ЗА <span className="text-brand-500">РУЛЁМ</span></span>
          </a>
          <p className="mt-5 text-sm leading-relaxed text-ink-300 max-w-xs">
            Автошкола в центре Новосибирска. Учим водить спокойно и по делу — 5 000+ выпускников с 2015 года.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { href: CONTACTS.vk, label: "ВКонтакте", icon: IcVk },
              { href: CONTACTS.tg, label: "Telegram-канал", icon: IcTelegram },
              { href: CONTACTS.wa, label: "WhatsApp", icon: IcWhatsApp },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-11 h-11 rounded-full border border-paper-50/15 text-paper-50/80 flex items-center justify-center hover:border-brand-500 hover:text-brand-400 hover:-translate-y-1 transition-all">
                <s.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
        <nav aria-label="Меню в подвале">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-400 mb-4">Разделы</p>
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="block py-1.5 text-sm font-semibold text-paper-50/70 hover:text-brand-400 transition-colors">{n.label}</a>
          ))}
          <a href="#quiz" className="block py-1.5 text-sm font-semibold text-paper-50/70 hover:text-brand-400 transition-colors">Подбор тарифа</a>
          <a href="#lead" className="block py-1.5 text-sm font-semibold text-paper-50/70 hover:text-brand-400 transition-colors">Записаться</a>
        </nav>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-400 mb-4">Контакты</p>
          <a href={CONTACTS.phoneHref} className="font-display font-extrabold text-paper-50 text-lg hover:text-brand-400 transition-colors">{CONTACTS.phoneDisplay}</a>
          <p className="mt-3 flex items-start gap-2 text-sm text-ink-300"><IcPin className="w-4 h-4 mt-0.5 text-brand-500 shrink-0" /> 630099, Новосибирск, ул. Ленина, 12, офис 305</p>
          <a href={`mailto:${CONTACTS.email}`} className="mt-2 flex items-center gap-2 text-sm text-ink-300 hover:text-brand-400 transition-colors"><IcSend className="w-4 h-4 text-brand-500 shrink-0" /> {CONTACTS.email}</a>
          <p className="mt-2 flex items-center gap-2 text-sm text-ink-300"><IcClock className="w-4 h-4 text-brand-500 shrink-0" /> Пн–Сб, 9:00–20:00</p>
          <div className="mt-4 flex gap-3">
            <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" className="btn btn-md bg-[#25d366] text-ink-950 hover:brightness-110"><IcWhatsApp className="w-4 h-4" /> WhatsApp</a>
            <a href={CONTACTS.tg} target="_blank" rel="noopener noreferrer" className="btn btn-md bg-[#2aabee] text-paper-50 hover:brightness-110"><IcTelegram className="w-4 h-4" /> Telegram</a>
          </div>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-ink-400 mb-4">Реквизиты</p>
          <p className="text-xs leading-relaxed text-ink-400">
            АНО ДПО «Автошкола ЗА РУЛЁМ»<br />
            ИНН 5406825413 · ОГРН 1215400048290<br />
            {CONTACTS.license}
          </p>
          <div className="mt-4 space-y-1.5">
            <button onClick={onPrivacy} className="block text-xs text-ink-300 underline decoration-ink-600 underline-offset-4 hover:text-paper-50 transition-colors">Политика конфиденциальности</button>
            <button onClick={onTerms} className="block text-xs text-ink-300 underline decoration-ink-600 underline-offset-4 hover:text-paper-50 transition-colors">Пользовательское соглашение</button>
          </div>
        </div>
      </div>
      <div className="wrap mt-12 pt-6 border-t border-paper-50/10 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-400">
        <p>© 2026 АНО ДПО «Автошкола ЗА РУЛЁМ». Информация на сайте не является публичной офертой.</p>
        <p className="flex items-center gap-2 font-semibold"><IcCar className="w-4 h-4 text-brand-500" /> Сделано в Новосибирске · за рулём с 2015 года</p>
      </div>
    </footer>
  );
}

/* ================= ЮРИДИЧЕСКИЕ МОДАЛКИ ================= */
export function LegalModals({ doc, onClose }: { doc: "privacy" | "terms" | null; onClose: () => void }) {
  return (
    <Modal open={!!doc} onClose={onClose} labelledBy="legal-title">
      <div className="p-7 sm:p-9">
        <h3 id="legal-title" className="font-display font-extrabold text-paper-50 text-2xl">
          {doc === "privacy" ? "Политика конфиденциальности" : "Пользовательское соглашение"}
        </h3>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-300">
          {doc === "privacy" ? (
            <>
              <p>1. Оставляя заявку на сайте za-rulem.ru, вы даёте согласие АНО ДПО «Автошкола ЗА РУЛЁМ» (ИНН 5406825413) на обработку персональных данных: имени и номера телефона — в соответствии с 152-ФЗ «О персональных данных».</p>
              <p>2. Данные используются только для связи с вами по вопросу обучения: звонок, SMS или сообщение в мессенджере. Мы не передаём их третьим лицам и не используем для сторонней рекламы.</p>
              <p>3. Сайт использует файлы cookie и обезличенную веб-аналитику (Яндекс.Метрика, Google Analytics) для улучшения работы сервиса. Отключить cookie можно в настройках браузера.</p>
              <p>4. Согласие можно отозвать в любой момент — письмом на {CONTACTS.email} или сообщением в WhatsApp. После этого данные удаляются в течение 3 рабочих дней.</p>
            </>
          ) : (
            <>
              <p>1. Цены и состав тарифов, указанные на сайте, актуальны на текущий учебный сезон и фиксируются в договоре на момент его подписания.</p>
              <p>2. Скидки по акциям («Студентам», «Школьникам», «Учись с другом») применяются при предъявлении подтверждающего документа и суммируются с рассрочкой 0%.</p>
              <p>3. Рассрочка предоставляется банком-партнёром; одобрение зависит от банка. Альтернатива — оплата частями непосредственно школе, первый взнос от 5 000 ₽.</p>
              <p>4. Замена инструктора производится бесплатно в течение 1 рабочего дня по заявлению ученика в приложении или по телефону школы.</p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

/* ================= МОБИЛЬНАЯ ПАНЕЛЬ CTA ================= */
export function MobileBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-ink-950/95 backdrop-blur border-t border-paper-50/10 flex gap-2">
      <button onClick={() => goTo("lead")} className="btn btn-primary btn-md flex-1 !text-[13px]">Записаться · −2 000 ₽</button>
      <a href={CONTACTS.wa} target="_blank" rel="noopener noreferrer" data-goal="whatsapp_click" aria-label="Написать в WhatsApp" className="w-12 h-12 rounded-full bg-[#25d366] text-ink-950 flex items-center justify-center shrink-0"><IcWhatsApp className="w-6 h-6" /></a>
      <a href={CONTACTS.tg} target="_blank" rel="noopener noreferrer" aria-label="Написать в Telegram" className="w-12 h-12 rounded-full bg-[#2aabee] text-paper-50 flex items-center justify-center shrink-0"><IcTelegram className="w-6 h-6" /></a>
    </div>
  );
}
