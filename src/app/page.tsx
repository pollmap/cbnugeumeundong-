"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowDown, Terminal } from "lucide-react";
import TypeWriter from "@/components/TypeWriter";
import Footer from "@/components/Footer";
import { APPLY_URL } from "@/lib/constants";

const BackgroundMesh = dynamic(() => import("@/components/BackgroundMesh"), {
  ssr: false,
});

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-8");
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function FadeIn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useFadeIn();
  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

const PANELS = [
  {
    tag: "01",
    title: "RESEARCH",
    subtitle: "NEXUS WORKSTATION",
    lines: [
      "AI assists every step from data collection",
      "to first-draft valuation on the NEXUS platform.",
      "Independent analysis with direct assumption control.",
    ],
    keywords: ["Data Pipeline", "LLM Cross-Review", "Assumption Override"],
  },
  {
    tag: "02",
    title: "PITCH",
    subtitle: "INVESTMENT COMMITTEE",
    lines: [
      "6-week research. 15-minute pitch.",
      "Cross-reviewed against AI counterarguments.",
      "Portfolio inclusion or exclusion decided.",
    ],
    keywords: ["15-min Pitch", "Kill Condition", "Peer Review"],
  },
  {
    tag: "03",
    title: "CO-INVEST",
    subtitle: "JOINT PORTFOLIO",
    lines: [
      "Members form a joint fund and execute real trades.",
      "Kill-condition-based risk management.",
      "Investment journal. Real markets teach.",
    ],
    keywords: ["Risk Mgmt", "Trade Journal", "Real Execution"],
  },
];

const TIMELINE = [
  { label: "Application", desc: "Submit online application" },
  { label: "Document Review", desc: "Motivation and fit assessment" },
  { label: "Interview", desc: "Individual interviews on Mar 5. Time to be arranged." },
  { label: "Final Offer", desc: "Individual notification" },
];

export default function Home() {
  return (
    <div className="relative">
      <BackgroundMesh />

      {/* ====== HERO ====== */}
      <section
        id="hero"
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-gray-600 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
          Chungbuk University Financial Analysis
        </p>
        <h1 className="font-display text-white text-6xl sm:text-8xl lg:text-[120px] tracking-[0.4em] sm:tracking-[0.5em] leading-none mb-4">
          CUFA
        </h1>
        <p className="text-gray-500 text-sm sm:text-base tracking-[0.3em] uppercase mb-12">
          Beyond Consensus
        </p>
        <div className="h-8 mb-16">
          <TypeWriter
            text="Rewriting the standard of research."
            speed={60}
            delay={800}
            className="text-gray-400 text-base sm:text-lg"
            cursorClassName="text-white"
          />
        </div>
        <div className="flex items-center gap-6">
          <a
            href={APPLY_URL}

            className="group flex items-center gap-2 px-8 py-3 border border-white/30 text-white text-sm tracking-wider rounded hover:bg-white/5 transition-all"
          >
            APPLY
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#what-we-do"
            className="flex items-center gap-2 text-gray-600 text-sm tracking-wider hover:text-gray-400 transition-colors"
          >
            SCROLL
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ====== WHAT WE DO ====== */}
      <section id="what-we-do" className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-24">
            <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
              What We Do
            </p>
            <h2 className="font-display text-white text-4xl sm:text-5xl tracking-wider">
              OPERATIONS
            </h2>
          </FadeIn>

          <div className="space-y-32">
            {PANELS.map((panel) => (
              <FadeIn key={panel.tag}>
                <div className="max-w-2xl">
                  <span className="text-white/20 text-xs font-mono tracking-widest mb-4 block">
                    {panel.tag}
                  </span>
                  <h3 className="font-display text-white text-3xl sm:text-5xl tracking-wider mb-2">
                    {panel.title}
                  </h3>
                  <p className="text-gray-600 text-xs tracking-[0.3em] uppercase mb-8">
                    {panel.subtitle}
                  </p>
                  <div className="space-y-2 mb-8">
                    {panel.lines.map((line, i) => (
                      <p
                        key={i}
                        className="text-gray-400 text-sm sm:text-base leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {panel.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="text-xs text-white/40 border border-white/10 px-3 py-1 rounded-full"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ====== HOW WE THINK ====== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto w-full">
          <FadeIn>
            <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
              How We Think
            </p>
            <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-12">
              METHODOLOGY
            </h2>
          </FadeIn>

          {/* Terminal block */}
          <FadeIn>
            <div className="glass-card p-6 sm:p-8 font-mono text-sm mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-4 h-4 text-white" />
                <span className="text-gray-600 text-xs">cufa_terminal</span>
              </div>
              <div className="space-y-2 text-gray-400">
                <p>
                  <span className="text-white">$</span> cufa.init
                  <span className="text-white">(</span>
                  <span className="text-gray-300">
                    &quot;beyond_consensus&quot;
                  </span>
                  <span className="text-white">)</span>
                </p>
                <p className="text-gray-600">
                  {"// AI workstation-based research environment"}
                </p>
                <p className="mt-4">
                  <span className="text-white">$</span> cufa.philosophy
                </p>
                <p className="text-[#10b981]">
                  → &quot;AI calculates. You decide.&quot;
                </p>
              </div>
            </div>
          </FadeIn>

          {/* 6-Week Block Diagram */}
          <FadeIn>
            <p className="text-gray-500 text-xs tracking-widest uppercase mb-6">
              6-Week Research Block
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { week: "W1", label: "Stock Pick" },
                { week: "W2", label: "Sector Analysis" },
                { week: "W3", label: "Financial Model" },
                { week: "W4", label: "Valuation" },
                { week: "W5", label: "IC Pitch" },
                { week: "W6", label: "Feedback" },
              ].map((block, i) => (
                <div
                  key={block.week}
                  className="relative glass-card p-4 text-center group transition-all duration-200"
                  style={block.week === "W5" ? { border: "1px solid rgba(124,106,247,0.35)" } : undefined}
                >
                  <span className="text-white/50 text-xs font-mono block mb-1">
                    {block.week}
                  </span>
                  <span className={`text-sm ${block.week === "W5" ? "text-[#7c6af7]" : "text-white"}`}>{block.label}</span>
                  {i < 5 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-4 h-px bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ====== JOIN ====== */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto w-full">
          <FadeIn>
            <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
              Recruitment
            </p>
            <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-12">
              JOIN
            </h2>
          </FadeIn>

          {/* Timeline */}
          <FadeIn className="mb-16">
            <div className="relative pl-8 border-l border-white/10">
              {TIMELINE.map((step, i) => (
                <div key={step.label} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-[#7c6af7] border border-[rgba(124,106,247,0.5)]" />
                  <p className="text-white text-sm font-medium mb-1">
                    <span className="text-white/40 font-mono mr-2">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step.label}
                  </p>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* FAQ */}
          <FadeIn className="mb-16">
            <div className="space-y-6">
              {[
                {
                  q: "Is there a major requirement?",
                  a: "None. Any Chungbuk University student interested in investing is welcome.",
                },
                {
                  q: "How long is the commitment?",
                  a: "2 consecutive semesters required. Every Thursday 7 PM. Two 6-week research blocks + IC review.",
                },
                {
                  q: "Can students on leave of absence apply?",
                  a: "Yes. Must be re-enrolled by the time of joining.",
                },
                {
                  q: "Is coding experience required?",
                  a: "Not at all. AI tool training is provided after joining.",
                },
              ].map((faq) => (
                <div key={faq.q}>
                  <p className="text-white text-sm mb-1">Q. {faq.q}</p>
                  <p className="text-gray-500 text-sm">A. {faq.a}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* CTA */}
          <FadeIn>
            <a
              href={APPLY_URL}
  
              className="group inline-flex items-center gap-2 px-8 py-3 border border-white/30 text-white text-sm tracking-wider rounded hover:bg-white/5 transition-all"
            >
              APPLY NOW
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
