import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { APPLY_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: "CUFA 운영 철학과 리서치 프로세스",
};

const CAPABILITIES = [
  {
    title: "산업 구조를 읽는 눈",
    desc: "밸류체인, 경쟁 구도, 구조적 변화를 포착하는 능력. 숫자 이전에 산업의 흐름을 읽는다.",
  },
  {
    title: "숫자로 논증하는 습관",
    desc: "'좋다'는 감이 아니라 재무적으로 증명하는 훈련. 가정에는 반드시 근거가 따른다.",
  },
  {
    title: "판단을 글로 고정하는 규율",
    desc: "20페이지 보고서로 자기 판단을 방어하며 편향을 직면하는 훈련.",
  },
];

const CYCLE = [
  { week: "W1", label: "산업 배정", desc: "팀 구성과 산업 배정. 브레인스토밍." },
  { week: "W2", label: "스크리닝", desc: "기업 후보 탐색. 산업 크로스체크 후 기업 확정." },
  { week: "W3", label: "딥다이브", desc: "섹션 분담. 재무 모델링과 초고 작성." },
  { week: "W4", label: "디펜스", desc: "투자논거 방어 리허설. 상호 반론." },
  { week: "W5", label: "IC 발표", desc: "투자위원회 발표. 심의와 최종 검증." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* ====== HERO ====== */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            About
          </p>
          <h1 className="font-display text-white text-4xl sm:text-5xl tracking-wider mb-6">
            OPERATIONS MANUAL
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl leading-relaxed mb-2">
            CUFA는 충북대학교 가치투자학회다.
            리서치 보고서를 생산하는 조직이며, 모든 판단은 데이터와 토론을 거쳐 사람이 내린다.
          </p>
          <p className="text-gray-500 text-sm max-w-2xl leading-relaxed mb-8">
            이 페이지는 CUFA의 운영 철학과 리서치 프로세스를 공개한 요약본이다.
          </p>
          <p className="text-[#7c6af7] text-sm font-mono tracking-wider">
            &quot;Whatever computes, You decide.&quot;
          </p>
        </div>
      </section>

      {/* ====== PHILOSOPHY ====== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Why We Write
          </p>
          <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-4">
            PHILOSOPHY
          </h2>
          <p className="text-gray-500 text-sm mb-12 max-w-xl">
            보고서는 목적이 아니라 수단이다. 진짜 목적은 세 가지 역량의 체화.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="glass-card p-6 hover:border-[rgba(255,255,255,0.15)] transition-colors"
              >
                <p className="text-white text-sm font-medium mb-3">
                  {cap.title}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== RESEARCH CYCLE ====== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Process
          </p>
          <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-4">
            5-WEEK RESEARCH CYCLE
          </h2>
          <p className="text-gray-500 text-sm mb-12 max-w-xl">
            학기당 2회 라운드. 5주 리서치 → 시험기간 → 5주 리서치.
            시험기간에는 모든 학회 활동을 중단한다.
          </p>

          {/* Timeline */}
          <div className="relative pl-8 border-l border-white/10 mb-12">
            {CYCLE.map((step) => (
              <div key={step.week} className="relative mb-8 last:mb-0">
                <div className="absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-[#7c6af7] border border-[rgba(124,106,247,0.5)]" />
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-white/40 font-mono text-xs">
                    {step.week}
                  </span>
                  <p className="text-white text-sm font-medium">
                    {step.label}
                  </p>
                </div>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Compact grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CYCLE.map((step, i) => (
              <div
                key={step.week}
                className={`relative glass-card p-4 text-center ${
                  step.week === "W5"
                    ? "border-[rgba(124,106,247,0.35)]"
                    : ""
                }`}
              >
                <span className="text-white/50 text-xs font-mono block mb-1">
                  {step.week}
                </span>
                <span
                  className={`text-sm ${
                    step.week === "W5" ? "text-[#7c6af7]" : "text-white"
                  }`}
                >
                  {step.label}
                </span>
                {i < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-4 h-px bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Whatever computes, You decide.
          </p>
          <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-8">
            JOIN CUFA
          </h2>
          <a
            href={APPLY_URL}
            className="group inline-flex items-center gap-2 px-8 py-3 border border-white/30 text-white text-sm tracking-wider rounded hover:bg-white/5 transition-all"
          >
            APPLY NOW
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
