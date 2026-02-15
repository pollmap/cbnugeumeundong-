import type { Metadata } from "next";
import { Target, Eye, Cpu, BarChart3, BookOpen, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
};

const values = [
  {
    icon: Cpu,
    title: "AI 방법론 내재화",
    description:
      "AI 결과를 복붙하지 않습니다. 밸류에이션 워크벤치에서 AI의 가정을 직접 수정하고 검증하여 독자적 관점을 강화합니다.",
  },
  {
    icon: Target,
    title: "실전 투자",
    description:
      "100만원 펀드를 직접 운용합니다. 모든 편입에는 킬조건이 있고, 종목당 최대 30% 제한으로 리스크를 관리합니다.",
  },
  {
    icon: Lightbulb,
    title: "기록과 검증",
    description:
      "투자 판단 저널에 종목·방향·확신도를 기록하면, 3개월 후 실제 주가와 비교해 자동 채점됩니다. 나만의 투자 성적표입니다.",
  },
];

const fields = [
  {
    icon: BarChart3,
    title: "기업분석 리서치",
    description: "재무제표·산업분석·밸류에이션을 통한 본질적 가치 산출",
  },
  {
    icon: Cpu,
    title: "AI 워크벤치",
    description: "NEXUS 기반 밸류에이션 모델링, AI 가정 슬라이더 직접 수정",
  },
  {
    icon: BookOpen,
    title: "투자심의(IC)",
    description: "스톡피치 발표 + CRITIC 반론 + 포트폴리오 리뷰 및 투표",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-3">
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            CUFA를 소개합니다
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            CUFA는 충북대학교 금융분석학회입니다. AI 리서치 워크스테이션
            &ldquo;NEXUS&rdquo;를 기반으로, 전국 어디에도 없는 방식으로 투자
            리서치를 수행합니다.
          </p>
        </div>
      </section>

      {/* What makes CUFA different */}
      <section className="py-16 px-4 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            CUFA는 뭐가 다른가
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { before: "데이터 수집 1주일", after: "AI 30분 수집, 핵심만 집중" },
              { before: "엑셀 밸류에이션 1주일", after: "AI 초벌 1시간, 가정 뜯어보기" },
              { before: "선배 1명 피드백", after: "AI 반론 + 크로스 리뷰 + 실시간 토론" },
              { before: "AI 결과 복붙", after: "분석 로그 vs 최종 리포트 diff 비교 평가" },
            ].map((item) => (
              <div
                key={item.before}
                className="bg-dark-900 border border-white/5 rounded-xl p-6 flex items-center gap-4"
              >
                <div className="flex-1">
                  <p className="text-gray-500 text-sm line-through mb-1">
                    {item.before}
                  </p>
                  <p className="text-white font-medium text-sm">
                    {item.after}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-dark-900 border border-white/5 rounded-xl p-8">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white text-xl font-bold mb-4">Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              AI 시대에 투자 리서치 방법론을 재정의하고, 독자적 분석 역량을
              갖춘 투자 인재를 양성합니다.
            </p>
          </div>
          <div className="bg-dark-900 border border-white/5 rounded-xl p-8">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white text-xl font-bold mb-4">Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              전국 65개 학회가 엑셀과 PDF로 리서치할 때, AI 리서치
              워크스테이션 위에서 리서치하는 유일한 학회.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            핵심 가치
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="text-center bg-dark-900 border border-white/5 rounded-xl p-8"
              >
                <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {v.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fields */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            활동 분야
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fields.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 bg-dark-900 border border-white/5 rounded-xl p-6"
              >
                <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-16 px-4 bg-dark-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-6">
            한 학기 뒤 여러분이 얻는 것
          </h2>
          <p className="text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            학기가 끝나면 &ldquo;15분 스톡 피치&rdquo;를 할 수 있는 사람이
            됩니다. 증권사 면접에서 산업/재무/밸류/리스크/킬조건까지 15분간
            논리적으로 답할 수 있습니다.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { label: "기업분석", desc: "재무제표와 산업을 이해하고 본질적 가치 산출" },
              { label: "투자 의사결정", desc: "실시간 반론 대응 및 실전 펀드 운용" },
              { label: "AI 리서치 방법론", desc: "AI의 가정을 직접 수정 및 검증" },
              { label: "기록과 검증", desc: "투자 판단 저널 기록 → 자동 채점 성적표" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-dark-900 border border-white/5 rounded-lg p-5 text-left"
              >
                <p className="text-white font-semibold text-sm mb-1">
                  {item.label}
                </p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
