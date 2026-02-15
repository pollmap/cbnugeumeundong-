import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.06),transparent_70%)]" />

      {/* Candlestick-style chart pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.2) 1px, transparent 1px),
            linear-gradient(rgba(212,175,55,0.6) 2px, transparent 2px)
          `,
          backgroundSize: "80px 80px, 80px 80px, 40px 120px",
          backgroundPosition: "0 0, 0 0, 20px 0",
        }}
      />

      {/* Subtle rising chart line */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(165deg, transparent 40%, rgba(212,175,55,0.5) 50%, transparent 60%)",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-gold-500 text-sm font-semibold tracking-[0.3em] uppercase mb-6">
          CBNU VALUE INVESTMENT ASSOCIATION
        </p>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Value{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
            Alpha
          </span>
        </h1>
        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          AI 시대에 투자 리서치가 어떻게 바뀌는지, 우리가 직접 증명합니다.
          CUFA가 함께합니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/join-us/how-to-apply"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 text-navy-950 font-semibold rounded-lg hover:bg-gold-400 transition-all hover:shadow-lg hover:shadow-gold-500/25"
          >
            지원하기
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-all"
          >
            더 알아보기
          </Link>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
    </section>
  );
}
