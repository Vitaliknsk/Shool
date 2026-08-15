import { useEffect, useState } from "react";
import { ADVANTAGES, CONTACTS, FLEET, IMG, INSTRUCTORS, LOCATIONS, MAP_SRC, STEPS } from "../data";
import { Reveal, useInView } from "../lib";
import { ICONS, SectionHead } from "../ui";
import { IcArrow, IcCheck, IcGauge, IcMetro, IcPin, IcQuote, IcShield, IcSignal, IcStopwatch } from "../icons";

/* ================= ЭТАПЫ ================= */
export function Steps() {
  return (
    <section id="steps" className="relative bg-paper-50 py-20 lg:py-28 overflow-hidden scroll-mt-20" aria-label="Этапы обучения">
      <div className="wrap">
        <SectionHead
          num="03"
          kicker="путь к правам"
          title="6 шагов — и права у тебя"
          lead="Средний путь занимает 2,5 месяца. Вот как он выглядит — без воды и лишних визитов."
        />

        <div className="relative mt-14">
          <div className="hidden lg:block absolute left-8 right-8 top-6 h-0.5 bg-paper-200" aria-hidden="true">
            <div className="roadline absolute inset-0" />
          </div>

          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {STEPS.map((s, i) => {
              const Ic = ICONS[s.icon];
              return (
                <Reveal key={s.title} delay={(i % 3) * 110}>
                  <li className="relative">
                    <div className="hidden lg:block relative z-10 w-12 h-12 rounded-full bg-ink-900 text-paper-50 border-4 border-paper-50 flex items-center justify-center font-display font-black text-sm shadow-lg">
                      {i + 1}
                    </div>
                    <span className="lg:hidden absolute -left-0 top-0 font-display font-black text-7xl text-brand-600/10 leading-none select-none" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="lg:mt-5 relative">
                      <span className="inline-flex w-12 h-12 rounded-xl bg-brand-50 text-brand-600 items-center justify-center">
                        <Ic className="w-6 h-6" />
                      </span>
                      <h3 className="mt-4 font-display font-extrabold text-ink-900 text-xl">{s.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-500 max-w-xs">{s.text}</p>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ================= ПРЕИМУЩЕСТВА ================= */
export function Advantages() {
  return (
    <section className="relative bg-ink-950 py-20 lg:py-28 overflow-hidden" aria-label="Почему мы">
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] rounded-full bg-brand-600/10 blur-3xl" aria-hidden="true" />
      <div className="wrap relative">
        <SectionHead
          num="04"
          kicker="почему мы"
          dark
          title="Учиться удобно. Учиться спокойно"
          lead="Мы убрали всё, за что обычно ругают автошколы: очереди, хамство, «пропавшие» часы практики и навязанные доплаты."
        />

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVANTAGES.map((a, i) => {
            const Ic = ICONS[a.icon];
            return (
              <Reveal key={a.title} delay={(i % 3) * 100}>
                <div className="group h-full rounded-xl border border-paper-50/10 bg-paper-50/[0.04] p-6 sm:p-7 hover:border-brand-600/60 hover:bg-brand-600/10 transition-all duration-300 hover:-translate-y-1.5">
                  <span className="w-12 h-12 rounded-xl bg-brand-600/15 text-brand-400 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-paper-50 group-hover:scale-110 transition-all duration-300">
                    <Ic className="w-6 h-6" />
                  </span>
                  <h3 className="mt-5 font-display font-extrabold text-paper-50 text-lg leading-snug">{a.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-300">{a.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <p className="mt-10 flex items-center gap-3 text-sm font-bold text-ink-300">
            <IcShield className="w-5 h-5 text-brand-500 shrink-0" />
            Всё это зафиксировано в договоре: не выполнили — компенсация по регламенту школы.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
const PHONE_TABS = ["Запись", "Теория", "Чат"] as const;

function PhoneScreen({ tab }: { tab: (typeof PHONE_TABS)[number] }) {
  return (
    <div className="screen-in px-4 pb-5" key={tab}>
      {tab === "Запись" && (
        <>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink-400">Ближайшие слоты · центр</p>
          <div className="mt-2 space-y-2">
            {[
              { day: "Сегодня", time: "18:00", inst: "Анна М.", car: "Kia Rio · АКПП", free: true },
              { day: "Завтра", time: "09:00", inst: "Сергей К.", car: "Vesta SW · МКПП", free: true },
              { day: "Завтра", time: "14:30", inst: "Дмитрий В.", car: "Kia Rio · АКПП", free: false },
            ].map((s, i) => (
              <div key={i} className={`rounded-xl border p-3 ${s.free ? "border-brand-600/40 bg-brand-50" : "border-paper-200 bg-paper-100 opacity-60"}`}>
                <div className="flex items-center justify-between">
                  <p className="font-extrabold text-ink-900 text-sm">{s.day} · {s.time}</p>
                  {s.free ? (
                    <span className="rounded-full bg-brand-600 text-paper-50 text-[9px] font-extrabold px-2.5 py-1 uppercase tracking-wider">Забронировать</span>
                  ) : (
                    <span className="text-[9px] font-extrabold text-ink-400 uppercase tracking-wider">Занято</span>
                  )}
                </div>
                <p className="mt-1 text-[11px] font-semibold text-ink-400">{s.inst} · {s.car}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-ink-900 text-paper-50 p-3">
            <p className="text-[10px] font-bold text-ink-300">Откатано практики</p>
            <div className="mt-1.5 h-1.5 rounded-full bg-ink-700 overflow-hidden">
              <div className="h-full w-[43%] rounded-full bg-brand-500" />
            </div>
            <p className="mt-1 text-[10px] font-extrabold">24 из 56 часов · 43%</p>
          </div>
        </>
      )}

      {tab === "Теория" && (
        <>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink-400">Билет 12 · экзаменационный режим</p>
          <div className="mt-2 rounded-xl border border-paper-200 bg-paper-50 p-3">
            <p className="text-[11px] font-bold text-ink-900 leading-snug">Разрешён ли вам обгон на регулируемом перекрёстке?</p>
            <div className="mt-2 space-y-1.5">
              <p className="rounded-lg bg-brand-50 border border-brand-600/40 text-brand-700 text-[10px] font-bold px-2.5 py-1.5">2. Запрещён</p>
              <p className="rounded-lg border border-paper-200 text-ink-400 text-[10px] font-bold px-2.5 py-1.5">1. Разрешён</p>
            </div>
            <p className="mt-2 flex items-center gap-1 text-[10px] font-extrabold text-[#1d9e50]"><IcCheck className="w-3 h-3" /> Верно! ПДД, п. 11.4</p>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-ink-900 text-paper-50 p-3">
              <p className="font-display font-black text-xl">18/20</p>
              <p className="text-[9px] font-bold text-ink-300 uppercase tracking-wider">правильных сегодня</p>
            </div>
            <div className="rounded-xl bg-brand-600 text-paper-50 p-3">
              <p className="font-display font-black text-xl">72%</p>
              <p className="text-[9px] font-bold uppercase tracking-wider">готовность к экзамену</p>
            </div>
          </div>
        </>
      )}

      {tab === "Чат" && (
        <>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-ink-400">Преподаватель теории · онлайн</p>
          <div className="mt-2 space-y-2">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-paper-100 border border-paper-200 p-2.5">
              <p className="text-[11px] font-semibold text-ink-500 leading-snug">Здравствуйте! Не понимаю разницу между знаком 3.20 и 3.22 🙈</p>
              <p className="text-[9px] font-bold text-ink-300 text-right mt-1">12:04</p>
            </div>
            <div className="max-w-[85%] ml-auto rounded-2xl rounded-tr-sm bg-brand-600 text-paper-50 p-2.5">
              <p className="text-[11px] font-semibold leading-snug">Смотри: 3.20 запрещает обгон, а 3.22 — движение грузовиков. Разберём на видео «Знаки 3.x» — минута 4:10 😉</p>
              <p className="text-[9px] font-bold text-paper-50/70 text-right mt-1">12:06</p>
            </div>
            <div className="max-w-[70%] rounded-2xl rounded-tl-sm bg-paper-100 border border-paper-200 p-2.5">
              <p className="text-[11px] font-semibold text-ink-500 leading-snug">Всё, поняла! Спасибо 🙌</p>
              <p className="text-[9px] font-bold text-ink-300 text-right mt-1">12:07</p>
            </div>
          </div>
          <p className="mt-2 text-[9px] font-bold text-ink-400 text-center">Отвечаем в течение часа · 9:00–20:00</p>
        </>
      )}
    </div>
  );
}

export function AppDemo() {
  const [tab, setTab] = useState<(typeof PHONE_TABS)[number]>("Запись");
  return (
    <section id="app" className="relative bg-paper-100 py-20 lg:py-28 overflow-hidden scroll-mt-20" aria-label="Онлайн-теория и приложение">
      <div className="wrap grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <SectionHead
            num="05"
            kicker="онлайн-теория"
            title="Учи теорию в метро, в очереди, за завтраком"
            lead="Видеоуроки + конспекты + тесты, идентичные экзаменационным. Вопросы преподавателю — в чате. Прогресс видят и ученик, и школа."
          />
          <ul className="mt-8 space-y-4">
            {[
              { icon: IcStopwatch, text: "15–20 минут в день — этого достаточно, чтобы закрыть программу" },
              { icon: IcGauge, text: "Экзаменационный режим: те же 20 вопросов и 2 допустимые ошибки" },
              { icon: IcSignal, text: "Работает офлайн: уроки скачиваются, прогресс синхронизируется" },
            ].map((f, i) => (
              <Reveal key={f.text} delay={i * 90}>
                <li className="flex items-start gap-3.5">
                  <span className="w-10 h-10 rounded-xl bg-paper-50 border border-paper-200 text-brand-600 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5" />
                  </span>
                  <p className="text-[15px] font-semibold text-ink-500 leading-relaxed">{f.text}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a href="#lead" className="btn btn-primary btn-lg">Посмотреть, как работает приложение</a>
              <span className="text-xs font-bold text-ink-400">Демо-доступ пришлём в WhatsApp после заявки</span>
            </div>
          </Reveal>
        </div>

        <Reveal variant="reveal-scale" delay={120}>
          <div className="relative max-w-[340px] mx-auto">
            <div className="absolute -inset-10 bg-brand-600/10 rounded-full blur-3xl" aria-hidden="true" />
            <div className="phone-frame relative bg-paper-50 overflow-hidden">
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-6 bg-ink-950 rounded-full z-10" aria-hidden="true" />
              <div className="pt-12 pb-2 px-4 flex items-center justify-between">
                <div>
                  <p className="font-display font-black text-ink-900 text-base leading-none">ЗА РУЛЁМ</p>
                  <p className="text-[9px] font-bold text-ink-400 mt-0.5">приложение ученика</p>
                </div>
                <span className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-display font-black text-xs">АС</span>
              </div>
              <div className="mx-4 flex gap-1 rounded-full bg-paper-100 border border-paper-200 p-1">
                {PHONE_TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 rounded-full py-2 text-[11px] font-extrabold transition-all ${tab === t ? "bg-ink-900 text-paper-50 shadow" : "text-ink-400 hover:text-ink-900"}`}
                    aria-pressed={tab === t}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="pt-3">
                <PhoneScreen tab={tab} />
              </div>
            </div>

            <div className="floaty absolute -right-6 top-16 sm:-right-16 rounded-xl bg-ink-900 text-paper-50 px-4 py-3 shadow-xl" style={{ ["--tilt" as string]: "3deg" }}>
              <p className="text-[10px] font-bold text-ink-300">Готовность к теории</p>
              <p className="font-display font-black text-lg text-brand-400">72%</p>
            </div>
            <div className="floaty absolute -left-4 bottom-20 sm:-left-14 rounded-xl bg-brand-600 text-paper-50 px-4 py-3 shadow-xl" style={{ ["--tilt" as string]: "-3deg", animationDelay: "1.2s" }}>
              <p className="text-[10px] font-bold text-paper-50/80">Следующее занятие</p>
              <p className="font-display font-black text-lg">Сегодня · 18:00</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= ИНСТРУКТОРЫ И АВТОПАРК ================= */
export function Instructors() {
  return (
    <section id="instructors" className="relative bg-paper-50 py-20 lg:py-28 scroll-mt-20" aria-label="Инструкторы и автопарк">
      <div className="wrap">
        <SectionHead
          num="06"
          kicker="команда и техника"
          title="Инструкторы, которых советуют друзьям"
          lead="Никаких хамов. Если не подошёл инструктор — подберём нового за 1 день, без вопросов."
        />

        <div className="mt-12 grid sm:grid-cols-3 gap-6">
          {INSTRUCTORS.map((ins, i) => (
            <Reveal key={ins.name} delay={i * 110}>
              <article className="group h-full flex flex-col rounded-xl overflow-hidden bg-paper-100 border border-paper-200 hover:-translate-y-2 hover:shadow-[0_35px_70px_-30px_rgba(12,19,34,0.4)] transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={IMG[ins.img as keyof typeof IMG]}
                    alt={`Инструктор автошколы — ${ins.name}`}
                    loading="lazy"
                    className="w-full aspect-[4/4.4] object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                    {ins.cats.map((c) => (
                      <span key={c} className="rounded-full bg-paper-50/95 text-ink-900 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display font-extrabold text-ink-900 text-xl">{ins.name}</h3>
                  <p className="mt-1 text-xs font-bold text-brand-600">{ins.exp}</p>
                  <p className="mt-3 text-sm text-ink-500 leading-relaxed flex-1">{ins.quote}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
          <Reveal variant="reveal-left">
            <div className="relative h-full rounded-xl overflow-hidden group min-h-[320px]">
              <img src={IMG.fleet} alt="Учебные автомобили автошколы: Lada Vesta с АКПП и Kia Rio с МКПП на снежной площадке" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-7">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-brand-400">Автопарк 2022–2023</p>
                <h3 className="mt-2 font-display font-extrabold text-paper-50 text-2xl sm:text-3xl">12 учебных авто: АКПП и МКПП</h3>
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {FLEET.map((car, i) => (
              <Reveal key={car.name} delay={i * 90}>
                <div className="h-full rounded-xl border border-paper-200 bg-paper-100 p-5 flex items-center gap-4 hover:border-brand-600/50 transition-colors">
                  <span className="rounded-lg bg-ink-900 text-paper-50 text-xs font-black px-3 py-2 shrink-0">{car.gearbox}</span>
                  <div className="min-w-0">
                    <p className="font-extrabold text-ink-900 leading-tight">{car.name}</p>
                    <p className="text-xs font-semibold text-ink-400 mt-0.5">{car.year} · {car.points.join(" · ")}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= КАРТА И АДРЕСА ================= */
export function MapSection() {
  return (
    <section id="map" className="relative bg-ink-950 py-20 lg:py-28 overflow-hidden scroll-mt-20" aria-label="Где мы находимся">
      <div className="wrap">
        <SectionHead
          num="07"
          kicker="где мы находимся"
          dark
          title="Центр города — и маршруты у твоего дома"
          lead="Маршрут вождения — в центре Новосибирска, рядом с доступными остановками из любого района."
        />

        <div className="mt-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
          <div className="space-y-4">
            {LOCATIONS.map((loc, i) => (
              <Reveal key={loc.title} delay={i * 100} variant="reveal-left">
                <div className={`rounded-xl border p-6 transition-colors ${loc.main ? "border-brand-600/60 bg-brand-600/10" : "border-paper-50/10 bg-paper-50/[0.04]"} hover:border-brand-500`}>
                  <div className="flex items-start gap-3.5">
                    <span className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${loc.main ? "bg-brand-600 text-paper-50" : "bg-paper-50/10 text-brand-400"}`}>
                      <IcPin className="w-5 h-5" />
                    </span>
                    <div>
                      <p className="font-display font-extrabold text-paper-50">{loc.title}</p>
                      <p className="mt-1 text-sm font-semibold text-paper-50/85">{loc.address}</p>
                      <p className="mt-1.5 flex items-center gap-2 text-xs font-bold text-ink-300">
                        <IcMetro className="w-4 h-4 text-brand-500 shrink-0" /> {loc.metro}
                      </p>
                      <p className="mt-1 text-xs font-semibold text-ink-400">{loc.hours}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <a
                href="https://yandex.ru/maps/65/novosibirsk/house/ulitsa_lenina_12/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-light btn-md w-full"
              >
                Построить маршрут в Яндекс.Картах <IcArrow className="w-4 h-4" />
              </a>
            </Reveal>
          </div>

          <Reveal variant="reveal-scale" delay={150}>
            <div className="relative h-[380px] lg:h-full min-h-[380px] rounded-xl overflow-hidden border border-paper-50/15 shadow-2xl">
              <iframe
                title="Карта: офисы и площадки автошколы ЗА РУЛЁМ в Новосибирске"
                src={MAP_SRC}
                className="absolute inset-0 w-full h-full"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
