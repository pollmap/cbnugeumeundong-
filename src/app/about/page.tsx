import type { Metadata } from "next";
import { ArrowRight, Terminal } from "lucide-react";
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

const REPORT_SECTIONS = [
  { title: "Executive Summary", desc: "투자논거 핵심, Bull/Bear Case, 적정가" },
  { title: "산업 분석", desc: "시장 규모, 밸류체인, 경쟁 구도" },
  { title: "기업 분석", desc: "사업 모델, 매출 구조, 재무 분석" },
  { title: "투자 포인트", desc: "Bull/Bear Case, 촉매, 리스크" },
  { title: "밸류에이션", desc: "DCF, 상대가치, 적정 주가 범위" },
  { title: "리스크 분석", desc: "핵심 리스크, 발생 확률과 영향도" },
];

const PRINCIPLES = [
  {
    tag: "01",
    title: "보고서 중심",
    desc: "모든 활동은 보고서 완성을 향해 수렴한다. 보고서는 수단이자 규율이다.",
  },
  {
    tag: "02",
    title: "자율 + 추적",
    desc: "팀에 자율을 주되, 산출물은 반드시 추적한다. 자율과 방임은 다르다.",
  },
  {
    tag: "03",
    title: "NEXUS 위에서",
    desc: "모든 리서치 기록은 NEXUS 플랫폼에 남긴다. 판단의 이력이 곧 자산이다.",
  },
  {
    tag: "04",
    title: "Weekly IC",
    desc: "매주 투자위원회에서 판단을 검증한다. 검증 없는 확신은 편향이다.",
  },
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
            {CYCLE.map((step, i) => (
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

      {/* ====== INVESTMENT COMMITTEE ====== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Verification
          </p>
          <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-4">
            INVESTMENT COMMITTEE
          </h2>
          <p className="text-gray-500 text-sm mb-12 max-w-xl">
            글로벌 SMIF(Student-Managed Investment Fund)의 표준은 주 1회 IC다.
            CUFA는 이 표준을 따른다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <p className="text-white text-sm font-medium mb-2">
                Weekly IC
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                매주 목요일 운영. 시황 공유, 핵심 토론, 액션아이템 확정.
                리서치 진행 중에는 미완성 상태에서의 실시간 피드백 루프로 기능한다.
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-white text-sm font-medium mb-2">
                반론 담당자 제도
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                매주 1명이 발표팀의 투자논거에 의도적 반대 입장을 취한다.
                확증편향을 방지하고 리스크 인식을 강화하는 것이 목적이다.
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-white text-sm font-medium mb-2">
                투자요약서 사전 회람
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                IC 발표 2일 전까지 A4 1장 분량의 투자요약서를 전체 공유한다.
                미제출 시 발표 불가. 마감은 진짜 마감이다.
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-white text-sm font-medium mb-2">
                라운드 회고
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                라운드 종료 후 투자논거 검증, 밸류에이션 오차 분석, 프로세스 개선을 점검한다.
                목표는 순위가 아닌 보고서 보완이다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== REPORT STANDARD ====== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Output
          </p>
          <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-4">
            REPORT STANDARD
          </h2>
          <p className="text-gray-500 text-sm mb-12 max-w-xl">
            팀당 5주에 걸쳐 20~25페이지 기업분석 보고서를 완성한다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {REPORT_SECTIONS.map((sec) => (
              <div
                key={sec.title}
                className="glass-card p-4 hover:border-[rgba(255,255,255,0.15)] transition-colors"
              >
                <p className="text-white text-sm font-medium mb-1">
                  {sec.title}
                </p>
                <p className="text-gray-600 text-xs">{sec.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== NEXUS ====== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Platform
          </p>
          <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-4">
            NEXUS
          </h2>
          <p className="text-gray-500 text-sm mb-12 max-w-xl">
            CUFA NEXUS는 자체 개발 AI 리서치 워크스테이션이다.
          </p>

          {/* Terminal block */}
          <div className="glass-card p-6 sm:p-8 font-mono text-sm mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="w-4 h-4 text-white" />
              <span className="text-gray-600 text-xs">nexus_terminal</span>
            </div>
            <div className="space-y-2 text-gray-400">
              <p>
                <span className="text-white">$</span> nexus.philosophy
              </p>
              <p className="text-[#10b981]">
                → &quot;Whatever computes, You decide.&quot;
              </p>
              <p className="mt-4">
                <span className="text-white">$</span> nexus.principles
              </p>
              <p className="text-gray-300">
                [1] 결정론적 계산 — 모든 재무 수치는 순수 함수. AI는 숫자를 만들지 않는다.
              </p>
              <p className="text-gray-300">
                [2] AI 해석 보조 — AI는 데이터 해석/요약만 담당. 투자 의견 생성 금지.
              </p>
              <p className="text-gray-300">
                [3] 인간 최종 판단 — Buy/Sell/Hold 판단은 학회원의 몫.
              </p>
              <p className="mt-4">
                <span className="text-white">$</span> nexus.markets
              </p>
              <p className="text-gray-300">
                → 한국 · 일본 · 대만 · 미국
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Data Pipeline", desc: "멀티마켓 데이터 수집/정규화" },
              { label: "Valuation Engine", desc: "복수 밸류에이션 방법론" },
              { label: "Policy Filter", desc: "투자자문 패턴 자동 차단" },
              { label: "Research Loop", desc: "판단 이력과 품질 축적" },
            ].map((item) => (
              <div
                key={item.label}
                className="glass-card p-4 hover:border-[rgba(255,255,255,0.15)] transition-colors"
              >
                <p className="text-white text-xs font-medium mb-1">
                  {item.label}
                </p>
                <p className="text-gray-600 text-[11px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CORE PRINCIPLES ====== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Discipline
          </p>
          <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-12">
            CORE PRINCIPLES
          </h2>

          <div className="space-y-8">
            {PRINCIPLES.map((p) => (
              <div key={p.tag} className="flex gap-6">
                <span className="text-white/20 text-xs font-mono tracking-widest shrink-0 pt-0.5">
                  {p.tag}
                </span>
                <div>
                  <p className="text-white text-sm font-medium mb-1">
                    {p.title}
                  </p>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== POSITIONING ====== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Benchmark
          </p>
          <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-4">
            WHERE WE STAND
          </h2>
          <p className="text-gray-500 text-sm mb-12 max-w-xl">
            글로벌 SMIF(Student-Managed Investment Fund)의 공통점:
            주 1회 IC, 엄격한 리서치 프로세스, 교수 자문위원, 외부 피드백 정기화.
            CUFA는 이 표준 위에 AI 인프라를 얹었다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="glass-card p-6">
              <p className="text-[#7c6af7] text-xs font-mono tracking-wider mb-3">
                GLOBAL STANDARD
              </p>
              <p className="text-white text-sm font-medium mb-2">
                Weekly IC
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                전미 SMIF의 90%가 주 1회 IC를 운영한다.
                CUFA는 설립 첫 학기부터 이 글로벌 표준을 채택했다.
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-[#7c6af7] text-xs font-mono tracking-wider mb-3">
                DIFFERENTIATOR
              </p>
              <p className="text-white text-sm font-medium mb-2">
                AI 인프라
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                NEXUS는 미국 상위 SMIF에도 없는 자체 AI 리서치 인프라다.
                도구의 차이가 프로세스의 차이를 만든다.
              </p>
            </div>
            <div className="glass-card p-6">
              <p className="text-[#7c6af7] text-xs font-mono tracking-wider mb-3">
                NETWORK
              </p>
              <p className="text-white text-sm font-medium mb-2">
                충청권 네트워크
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                지역 투자동아리와의 공동 IR 대회, 상호 IC 참관,
                외부 자문단 피드백을 통해 폐쇄적 성장의 한계를 넘는다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====== ORIGIN ====== */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Origin
          </p>
          <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-4">
            AGENTS OF CHAOS
          </h2>
          <p className="text-gray-500 text-sm mb-8 max-w-2xl leading-relaxed">
            2025년 2학기, CUFA 1기 운영에서 배운 교훈이 지금의 v3.1 매뉴얼을 만들었다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                lesson: "자율 ≠ 방임",
                fix: "역할별 권한/책임을 명확히 그었다. Weekly IC를 도입했다.",
              },
              {
                lesson: "IC가 핵심이다",
                fix: "IC 없이 보고서 품질을 올릴 수 없다. 반론 담당자 제도를 만들었다.",
              },
              {
                lesson: "1인 체제의 한계",
                fix: "평가 결정권을 IC팀장에게 위임했다. 회장이 전부 하면 조직은 안 돌아간다.",
              },
              {
                lesson: "외부 피드백이 필수다",
                fix: "자문단 구성, 오픈 세션, 타 동아리 협업을 제도화했다.",
              },
            ].map((item) => (
              <div key={item.lesson} className="glass-card p-6">
                <p className="text-white text-sm font-medium mb-2">
                  {item.lesson}
                </p>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.fix}
                </p>
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
