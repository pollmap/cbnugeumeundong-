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
            <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-3">
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
      <section className="py-24 px-4 bg-dark-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-3">
                About Us
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                CUFA를 소개합니다
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                CUFA는 충북대학교 금융분석학회입니다. 전국 65개 학회가 엑셀과
                PDF로 리서치할 때, CUFA는 AI 리서치 워크스테이션 위에서
                리서치합니다.
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                단순히 AI를 쓰는 게 아닙니다. AI의 가정을 직접 수정하고
                검증하는 방법론의 내재화가 우리의 차별점입니다.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors"
              >
                자세히 보기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video bg-dark-700 rounded-xl border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-6xl font-bold text-white mb-2 tracking-wider">
                    CUFA
                  </p>
                  <p className="text-gray-500 text-sm">
                    충북대학교 금융분석학회
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
            CUFA와 함께 AI 시대의 투자 전문가로 첫 걸음을 내딛어보세요.
          </p>
          <Link
            href="/join-us/how-to-apply"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            지원하기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
