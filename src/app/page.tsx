"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowDown, Terminal } from "lucide-react";
import TypeWriter from "@/components/TypeWriter";
import Footer from "@/components/Footer";
import { GOOGLE_FORM_URL } from "@/lib/constants";

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
    title: "AI RESEARCH",
    subtitle: "NEXUS WORKSTATION",
    lines: [
      "NEXUS 플랫폼 위에서 AI가 데이터 수집부터",
      "밸류에이션 초벌까지 보조한다.",
      "가정을 직접 수정하고 검증하는 독자적 분석.",
    ],
    keywords: ["Data Pipeline", "LLM Cross-Review", "Assumption Override"],
  },
  {
    tag: "02",
    title: "STOCK PITCH",
    subtitle: "IC SESSION",
    lines: [
      "5주 리서치. 15분 피치.",
      "AI 반론과 크로스 리뷰를 거쳐",
      "편입/편출을 결정한다.",
    ],
    keywords: ["15-min Pitch", "Kill Condition", "Peer Review"],
  },
  {
    tag: "03",
    title: "LIVE FUND",
    subtitle: "REAL CAPITAL",
    lines: [
      "100만원 실전 펀드.",
      "킬조건 기반 리스크 관리.",
      "투자 판단 저널. 실전이 가르친다.",
    ],
    keywords: ["Risk Mgmt", "Trade Journal", "Real Execution"],
  },
];

const TIMELINE = [
  { label: "서류 접수", desc: "구글폼으로 지원서 제출" },
  { label: "서류 심사", desc: "지원 동기 및 적합성 평가" },
  { label: "면접", desc: "투자 관심도 및 학습 의지 확인" },
  { label: "최종 합격", desc: "개별 연락" },
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
            text="AI 시대, 리서치의 기준을 다시 쓴다."
            speed={60}
            delay={800}
            className="text-gray-400 text-base sm:text-lg"
            cursorClassName="text-white"
          />
        </div>
        <div className="flex items-center gap-6">
          <a
            href={GOOGLE_FORM_URL}
            {...(GOOGLE_FORM_URL !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
            <div className="bg-dark-900/80 border border-white/5 rounded-xl p-6 sm:p-8 font-mono text-sm mb-12">
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
                  // 전국 65개 학회가 엑셀과 PDF로 리서치할 때
                </p>
                <p className="text-gray-600">
                  // CUFA는 AI 워크스테이션 위에서 리서치한다.
                </p>
                <p className="mt-4">
                  <span className="text-white">$</span> cufa.philosophy
                </p>
                <p className="text-white">
                  → &quot;AI를 쓰는 게 아니다. AI의 가정을 수정하고
                  검증한다.&quot;
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
                { week: "W1", label: "종목 선정" },
                { week: "W2", label: "산업 분석" },
                { week: "W3", label: "재무 모델링" },
                { week: "W4", label: "밸류에이션" },
                { week: "W5", label: "AI 크로스체크" },
                { week: "W6", label: "IC 피치" },
              ].map((block, i) => (
                <div
                  key={block.week}
                  className="relative bg-dark-800/50 border border-white/5 rounded-lg p-4 text-center group hover:border-white/20 transition-colors"
                >
                  <span className="text-white/50 text-xs font-mono block mb-1">
                    {block.week}
                  </span>
                  <span className="text-white text-sm">{block.label}</span>
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
                  <div className="absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-white/20 border border-white/60" />
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
                  q: "전공 제한이 있나요?",
                  a: "없다. 투자에 관심 있는 충북대 재학생이면 된다.",
                },
                {
                  q: "활동 기간은?",
                  a: "2학기 연속 참여 필수. 6주 리서치 블록 2회 + IC 세션.",
                },
                {
                  q: "휴학생도 지원 가능한가요?",
                  a: "불가. 재학 중인 학생만 지원할 수 있다.",
                },
                {
                  q: "코딩 경험이 필요한가요?",
                  a: "필요 없다. AI 도구 활용은 입회 후 교육한다.",
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
              href={GOOGLE_FORM_URL}
              {...(GOOGLE_FORM_URL !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
