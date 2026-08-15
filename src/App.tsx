import { useEffect, useState } from "react";
import { useReducedMotion } from "./lib";
import { Header, Hero, Numbers, Promos, Tariffs } from "./sections/TopSections";
import { Steps, Advantages, AppDemo, Instructors, MapSection } from "./sections/MidSections";
import { Reviews, Faq, Quiz, LeadForm, Footer, LegalModals, MobileBar, CookieConsent } from "./sections/BottomSections";

export default function App() {
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
    <div className="font-body">
      <div
        className={`fixed top-0 left-0 z-[60] h-[3px] bg-brand-600 ${reduced ? "" : "transition-[width] duration-150 ease-out"}`}
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <Header />
      <main>
        <Hero />
        <Numbers />
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
