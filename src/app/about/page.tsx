import type { Metadata } from "next";
import { Target, Eye, Users, BarChart3, BookOpen, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
};

const values = [
  {
    icon: Target,
    title: "실전 중심",
    description: "이론에만 그치지 않고 실제 투자 경험을 통해 배웁니다.",
  },
  {
    icon: Users,
    title: "함께 성장",
    description: "동료들과 함께 토론하고 공유하며 성장합니다.",
  },
  {
    icon: Lightbulb,
    title: "지속적 학습",
    description: "끊임없이 변화하는 금융 시장에 대해 학습합니다.",
  },
];

const fields = [
  { icon: BarChart3, title: "주식", description: "국내·해외 주식 분석 및 투자" },
  { icon: BookOpen, title: "경제·금융", description: "거시경제 및 금융시장 분석" },
  { icon: Eye, title: "리서치", description: "산업·기업 분석 리포트 작성" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">
            About Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            금은동을 소개합니다
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            금은동은 2010년에 설립된 충북대학교 금융투자 동아리입니다. 금융
            시장에 대한 열정을 가진 학생들이 모여 함께 공부하고 성장합니다.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-navy-900/30">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-navy-900/50 border border-white/5 rounded-xl p-8">
            <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-gold-500" />
            </div>
            <h3 className="text-white text-xl font-bold mb-4">Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              금융 지식의 대중화와 실전 투자 교육을 통해 충북대학교 학생들의
              금융 역량을 강화하고, 미래 금융 인재를 양성합니다.
            </p>
          </div>
          <div className="bg-navy-900/50 border border-white/5 rounded-xl p-8">
            <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-gold-500" />
            </div>
            <h3 className="text-white text-xl font-bold mb-4">Vision</h3>
            <p className="text-gray-400 leading-relaxed">
              충청권 최고의 대학생 금융투자 동아리로 성장하여, 졸업 후에도
              지속적으로 연결되는 금융 네트워크를 구축합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            핵심 가치
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => (
              <div
                key={v.title}
                className="text-center bg-navy-900/50 border border-white/5 rounded-xl p-8"
              >
                <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <v.icon className="w-7 h-7 text-gold-500" />
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
      <section className="py-16 px-4 bg-navy-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            활동 분야
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fields.map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 bg-navy-900/50 border border-white/5 rounded-xl p-6"
              >
                <div className="w-10 h-10 bg-gold-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <f.icon className="w-5 h-5 text-gold-500" />
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
    </div>
  );
}
