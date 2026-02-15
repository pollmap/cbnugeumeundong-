import type { Metadata } from "next";
import {
  BookOpen,
  TrendingUp,
  Trophy,
  Calendar,
  Cpu,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Activity",
};

const regularActivities = [
  {
    icon: Calendar,
    title: "정기 세션",
    description:
      "매주 목요일 오후 7시, 교육·발표·투심 세션을 진행합니다. 시장 브리핑, 종목 피치, 반론 토론, 포트폴리오 리뷰를 포함합니다.",
    schedule: "매주 목요일 19:00",
  },
  {
    icon: BookOpen,
    title: "팀 리서치",
    description:
      "팀당 3명으로 구성, 6주 블록 동안 1건의 심층 리서치를 수행합니다. 종목 선정부터 밸류에이션, 리포트 작성까지 전 과정을 경험합니다.",
    schedule: "6주 블록 × 2",
  },
  {
    icon: TrendingUp,
    title: "IC 세션 (투자심의)",
    description:
      "5주차에 진행되는 가장 중요한 시간. 워크벤치를 띄우고 발표하며, CRITIC 반론과 저널 기반 질의를 거쳐 편입/편출을 투표합니다.",
    schedule: "블록 5주차",
  },
];

const semesterActivities = [
  {
    icon: Trophy,
    title: "100만원 실전 펀드",
    description:
      "실제 자금 100만원을 운용합니다. 편입/편출은 표결로만, 종목당 최대 30% 제한, 모든 편입에 킬조건(매도 기준) 필수.",
  },
  {
    icon: Cpu,
    title: "NEXUS 플랫폼",
    description:
      "5대 AI 에이전트(MACRO·SCREENER·SECTOR·VALUER·CRITIC)와 밸류에이션 워크벤치, 투자 판단 저널을 활용합니다.",
  },
  {
    icon: FileText,
    title: "리포트 발간",
    description:
      "팀당 학기 2건, 전체 4건의 15~20p 리포트를 발간합니다. AI 원문 vs 본인 분석 비교 섹션이 필수 포함됩니다.",
  },
];

export default function ActivityPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">
            Activity
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            활동 소개
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            CUFA의 다양한 활동을 소개합니다.
          </p>
        </div>
      </section>

      {/* Regular Activity */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">
            Regular Activity
          </h2>
          <div className="space-y-6">
            {regularActivities.map((activity) => (
              <div
                key={activity.title}
                className="bg-navy-900/50 border border-white/5 rounded-xl p-8 flex flex-col md:flex-row gap-6"
              >
                <div className="w-14 h-14 bg-gold-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <activity.icon className="w-7 h-7 text-gold-500" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                    <h3 className="text-white text-lg font-semibold">
                      {activity.title}
                    </h3>
                    <span className="text-gold-500 text-sm bg-gold-500/10 px-3 py-0.5 rounded-full w-fit">
                      {activity.schedule}
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 px-4 bg-navy-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {semesterActivities.map((activity) => (
              <div
                key={activity.title}
                className="bg-navy-900/50 border border-white/5 rounded-xl p-8 text-center"
              >
                <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <activity.icon className="w-7 h-7 text-gold-500" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {activity.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Week Block Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            6주 블록 구조
          </h2>
          <p className="text-gray-500 text-sm text-center mb-10">
            학기당 2블록 진행, 팀당 블록마다 1건 리서치
          </p>
          <div className="space-y-4">
            {[
              { week: "1주차", event: "종목 선정 + 산업 조사 (사업보고서 읽기)" },
              { week: "2주차", event: "재무분석 + 산업분석 심화" },
              { week: "3주차", event: "밸류에이션 모델링 (워크벤치 활용)" },
              { week: "4주차", event: "리포트 초안 완성" },
              { week: "5주차", event: "IC 세션 — 발표 + 반론 토론 + 피드백 + 투표" },
              { week: "6주차", event: "피드백 반영 최종 리포트 제출 + 편입 결정" },
            ].map((item) => (
              <div
                key={item.week}
                className={`flex items-center gap-4 border border-white/5 rounded-lg px-6 py-4 ${
                  item.week === "5주차"
                    ? "bg-gold-500/5 border-gold-500/20"
                    : "bg-navy-900/50"
                }`}
              >
                <span
                  className={`font-bold text-sm w-16 shrink-0 ${
                    item.week === "5주차" ? "text-gold-400" : "text-gold-500"
                  }`}
                >
                  {item.week}
                </span>
                <div
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    item.week === "5주차" ? "bg-gold-400" : "bg-gold-500"
                  }`}
                />
                <span
                  className={
                    item.week === "5주차"
                      ? "text-gold-300 font-medium"
                      : "text-gray-300"
                  }
                >
                  {item.event}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Copy Prevention */}
      <section className="py-16 px-4 bg-navy-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-navy-900/50 border border-gold-500/20 rounded-xl p-8">
            <h3 className="text-gold-500 font-bold text-lg mb-4">
              AI 복붙 3중 방지 시스템
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              리포트 제출 시 AI 원문, 워크벤치 수정 이력, 저널 기록, 최종본이
              동시 제출됩니다. 시스템이 diff(차이점)를 자동 대조합니다.
            </p>
            <p className="text-gray-300 text-sm font-medium">
              AI와 생각이 다른 지점과 그 근거를 적는 것이 핵심입니다.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
