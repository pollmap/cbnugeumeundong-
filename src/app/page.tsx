import HeroSection from "@/components/HeroSection";
import ActivityCard from "@/components/ActivityCard";
import { ACTIVITIES } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Activities */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">
              What We Do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              주요 활동
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACTIVITIES.map((activity) => (
              <ActivityCard
                key={activity.title}
                title={activity.title}
                description={activity.description}
                icon={activity.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-4 bg-navy-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">
                About Us
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                금은동을 소개합니다
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                금은동은 충북대학교 학생들이 모여 금융 시장을 공부하고, 실전
                투자 경험을 쌓으며, 미래의 금융 전문가로 성장하기 위해 설립된
                금융투자 동아리입니다.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                정기적인 스터디, 세미나, 모의 투자 대회 등 다양한 활동을 통해
                금융 지식을 쌓고, 실전 투자 감각을 키울 수 있습니다.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-gold-500 font-medium hover:text-gold-400 transition-colors"
              >
                자세히 보기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video bg-navy-800 rounded-xl border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-bold text-gold-500 mb-2">
                    금은동
                  </p>
                  <p className="text-gray-500 text-sm">
                    충북대학교 금융투자 동아리
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            함께 성장할 준비가 되셨나요?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            금은동과 함께 금융 전문가로의 첫 걸음을 내딛어보세요.
          </p>
          <Link
            href="/join-us/how-to-apply"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 text-navy-950 font-semibold rounded-lg hover:bg-gold-400 transition-all hover:shadow-lg hover:shadow-gold-500/25"
          >
            지원하기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
