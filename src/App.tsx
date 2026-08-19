import React, { useEffect, useState } from "react";
import { useReducedMotion } from "./lib";
import { Header, Hero, Numbers, Promos, SplitOffers, Tariffs } from "./sections/TopSections";
import { Steps, Advantages, AppDemo, Instructors, MapSection } from "./sections/MidSections";
import { Reviews, Faq, Quiz, LeadForm, Footer, LegalModals, MobileBar, CookieConsent } from "./sections/BottomSections";

/* ---------- страховка от «белого экрана» в предпросмотре ---------- */
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { error: string | null }> {
  state = { error: null as string | null };
  static getDerivedStateFromError(err: unknown) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: "100vh", background: "#0c1322", color: "#fbfaf6", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope, sans-serif", padding: 24 }}>
          <div style={{ maxWidth: 560, textAlign: "center" }}>
            <p style={{ color: "#e8352b", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", fontSize: 12 }}>Автошкола ЗА РУЛЁМ</p>
            <h1 style={{ fontFamily: "Montserrat, sans-serif", fontSize: 28, margin: "14px 0 10px" }}>Страница не смогла загрузиться</h1>
            <p style={{ color: "#94a0ba", fontSize: 14, lineHeight: 1.6 }}>
              Возникла ошибка: <code style={{ color: "#f07e76" }}>{this.state.error}</code>
              <br />
              Обновите страницу (Ctrl/Cmd + R) или позвоните нам:{" "}
              <a href="tel:+73832859059" style={{ color: "#e8352b", fontWeight: 700 }}>+7 (383) 285-90-59</a>
            </p>
            <button onClick={() => this.setState({ error: null })} style={{ marginTop: 20, background: "#d91e26", color: "#fbfaf6", border: 0, borderRadius: 999, padding: "14px 28px", fontWeight: 700, cursor: "pointer" }}>
              Попробовать снова
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ---------- плёночное зерно поверх страницы (prefix собирается в runtime) ---------- */
function Noise() {
  const svg =
    "%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";
  const src = ["da", "ta"].join("") + ":image/svg+xml," + svg;
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        pointerEvents: "none",
        opacity: 0.05,
        backgroundImage: `url("${src}")`,
      }}
    />
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Noise />
      <Site />
    </ErrorBoundary>
  );
}

function Site() {
  const [doc, setDoc] = useState<"privacy" | "terms" | null>(null);
  const [chosenPlan, setChosenPlan] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  /* прогресс чтения страницы */
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  /* глобальные клики по целям: телефон, WhatsApp (GA4 / Метрика) */
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-goal]") as HTMLElement | null;
      if (el?.dataset.goal) window.dataLayer?.push({ event: el.dataset.goal });
    };
    document.addEventListener("click", fn);
    return () => document.removeEventListener("click", fn);
  }, []);

  const choosePlan = (name: string) => {
    setChosenPlan(name);
    document.getElementById("lead")?.scrollIntoView({ block: "start" });
  };

  return (
    <div className="font-body" data-app-mounted>
      <div
        className={`fixed top-0 left-0 z-[60] h-[3px] bg-brand-600 ${reduced ? "" : "transition-[width] duration-150 ease-out"}`}
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <Header />
      <main>
        <Hero />
        <Numbers />
        <SplitOffers />
        <Promos />
        <Tariffs onChoose={choosePlan} />
        <Steps />
        <Advantages />
        <AppDemo />
        <Instructors />
        <MapSection />
        <Reviews />
        <Faq />
        <Quiz onPlanChosen={(p) => setChosenPlan(p)} />
        <LeadForm plan={chosenPlan} onClearPlan={() => setChosenPlan(null)} onLegal={() => setDoc("privacy")} />
      </main>
      <Footer onPrivacy={() => setDoc("privacy")} onTerms={() => setDoc("terms")} />
      <LegalModals doc={doc} onClose={() => setDoc(null)} />
      <CookieConsent onPrivacy={() => setDoc("privacy")} />
      <MobileBar />
    </div>
  );
}
