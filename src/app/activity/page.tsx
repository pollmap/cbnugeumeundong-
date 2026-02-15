import type { Metadata } from "next";
import {
  BookOpen,
  TrendingUp,
  Trophy,
  Calendar,
  Users,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Activity",
};

const regularActivities = [
  {
    icon: BookOpen,
    title: "주간 스터디",
    description:
      "매주 정기적으로 모여 금융·경제 관련 주제를 학습하고 발표합니다. 기본적 분석, 기술적 분석, 재무제표 분석 등 다양한 주제를 다룹니다.",
    schedule: "매주 수요일 18:00",
  },
  {
    icon: TrendingUp,
    title: "모의 투자",
    description:
      "가상 자금으로 실전과 동일한 환경에서 투자를 진행합니다. 투자 일지를 작성하고 결과를 공유하며 서로의 투자 전략을 배웁니다.",
    schedule: "학기 중 상시",
  },
  {
    icon: Users,
    title: "특강 & 세미나",
    description:
      "금융업계 현직자, 교수님 등을 초빙하여 특강을 진행합니다. 실무 경험과 최신 트렌드를 직접 들을 수 있습니다.",
    schedule: "월 1~2회",
  },
];

const semesterActivities = [
  {
    icon: Trophy,
    title: "모의 투자 대회",
    description: "학기별 모의 투자 대회를 통해 우수 투자자를 선정합니다.",
  },
  {
    icon: Calendar,
    title: "MT & 네트워킹",
    description: "학기 초 MT와 정기 네트워킹 행사로 부원 간 친목을 다집니다.",
  },
  {
    icon: BarChart3,
    title: "리서치 프로젝트",
    description:
      "팀별 산업·기업 분석 리포트를 작성하여 발표하는 프로젝트를 진행합니다.",
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
            금은동의 다양한 활동을 소개합니다.
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

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">
            학기별 일정
          </h2>
          <div className="space-y-4">
            {[
              { month: "3월", event: "신입부원 모집 & OT" },
              { month: "4-5월", event: "정규 스터디 & 모의투자 시작" },
              { month: "6월", event: "1학기 모의투자 대회 & 결산" },
              { month: "7-8월", event: "방학 스터디 (선택)" },
              { month: "9월", event: "2학기 OT & 스터디 재개" },
              { month: "10-11월", event: "정규 스터디 & 특강" },
              { month: "12월", event: "2학기 모의투자 대회 & 송년회" },
            ].map((item, i) => (
              <div
                key={item.month}
                className="flex items-center gap-4 bg-navy-900/50 border border-white/5 rounded-lg px-6 py-4"
              >
                <span className="text-gold-500 font-bold text-sm w-16 shrink-0">
                  {item.month}
                </span>
                <div className="w-2 h-2 bg-gold-500 rounded-full shrink-0" />
                <span className="text-gray-300">{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
