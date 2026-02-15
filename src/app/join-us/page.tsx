import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Join Us",
};

export default function JoinUsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-3">
            Join Us
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            CUFA에 합류하세요
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            투자에 관심 있는 충북대학교 학생이라면 누구나 지원할 수 있습니다.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link
            href="/join-us/how-to-apply"
            className="group bg-dark-900 border border-white/5 rounded-xl p-8 hover:border-white/20 transition-all duration-300 block"
          >
            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-white text-xl font-bold mb-3">How to Apply</h2>
            <p className="text-gray-400 mb-6">
              지원서 양식 다운로드 및 온라인 지원서 제출 방법을 안내합니다.
            </p>
            <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-gray-300 transition-colors">
              지원하러 가기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/join-us/recruitment"
            className="group bg-dark-900 border border-white/5 rounded-xl p-8 hover:border-white/20 transition-all duration-300 block"
          >
            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-white text-xl font-bold mb-3">Recruitment</h2>
            <p className="text-gray-400 mb-6">
              모집 일정, 선발 기준 및 자주 묻는 질문을 확인하세요.
            </p>
            <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-gray-300 transition-colors">
              자세히 보기
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
