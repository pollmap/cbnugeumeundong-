import type { Metadata } from "next";
import Link from "next/link";
import {
  Calendar,
  CheckCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Recruitment",
};

const timeline = [
  { step: "01", title: "지원서 접수", period: "3월 1일 ~ 3월 14일" },
  { step: "02", title: "서류 심사", period: "3월 15일 ~ 3월 17일" },
  { step: "03", title: "면접", period: "3월 18일 ~ 3월 20일" },
  { step: "04", title: "최종 합격 발표", period: "3월 22일" },
];

const criteria = [
  "충북대학교 재학생 (학과 무관)",
  "금융·투자에 대한 관심과 열정",
  "주 1회 정기 활동 참여 가능",
  "성실하게 학기 활동에 참여할 수 있는 분",
];

const faqs = [
  {
    q: "금융 지식이 없어도 지원할 수 있나요?",
    a: "네! 금융에 대한 관심만 있다면 누구나 지원 가능합니다. 기초부터 차근차근 배울 수 있도록 커리큘럼이 구성되어 있습니다.",
  },
  {
    q: "활동 기간은 어떻게 되나요?",
    a: "기본 1학기 활동이며, 이후 자율적으로 연장 가능합니다. 많은 부원들이 졸업까지 함께합니다.",
  },
  {
    q: "회비가 있나요?",
    a: "학기당 소정의 회비가 있습니다. 자세한 금액은 합격 후 안내드립니다.",
  },
  {
    q: "다른 동아리와 병행 가능한가요?",
    a: "네, 가능합니다. 주 1회 정기 모임에만 참석하시면 됩니다.",
  },
];

export default function RecruitmentPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">
            Recruitment
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            모집 안내
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            2025년 1학기 신입 부원을 모집합니다.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">
            모집 일정
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item) => (
              <div
                key={item.step}
                className="bg-navy-900/50 border border-white/5 rounded-xl p-6 text-center"
              >
                <div className="w-10 h-10 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold-500 font-bold text-sm">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.period}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria */}
      <section className="py-16 px-4 bg-navy-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">
            지원 자격
          </h2>
          <div className="bg-navy-900/50 border border-white/5 rounded-xl p-8">
            <ul className="space-y-4">
              {criteria.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">
            자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-navy-900/50 border border-white/5 rounded-xl p-6"
              >
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                  <h3 className="text-white font-semibold">{faq.q}</h3>
                </div>
                <p className="text-gray-400 pl-8 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-navy-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            지원할 준비가 되셨나요?
          </h2>
          <p className="text-gray-400 mb-8">
            지원서를 다운로드하고 온라인으로 제출하세요.
          </p>
          <Link
            href="/join-us/how-to-apply"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 text-navy-950 font-semibold rounded-lg hover:bg-gold-400 transition-all hover:shadow-lg hover:shadow-gold-500/25"
          >
            지원하러 가기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
