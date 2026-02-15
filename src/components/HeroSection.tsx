import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-dark-950">
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-gray-500 text-sm font-medium tracking-[0.3em] uppercase mb-6">
          Chungbuk University Financial Analysis
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
          Beyond Consensus
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          AI 시대에 투자 리서치가 어떻게 바뀌는지, 우리가 직접 증명합니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/join-us/how-to-apply"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            지원하기
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-colors"
          >
            더 알아보기
          </Link>
        </div>
      </div>
    </section>
  );
}
