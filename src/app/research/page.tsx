import type { Metadata } from "next";
import { FileText, Download, Calendar, Users } from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Research",
};

interface Report {
  title: string;
  team: string;
  date: string;
  summary: string;
  ticker?: string;
  verdict?: "BUY" | "HOLD" | "SELL";
  href: string | null;
}

const reports: Report[] = [];

function VerdictBadge({ verdict }: { verdict: "BUY" | "HOLD" | "SELL" }) {
  const styles = {
    BUY: "bg-signal-green/10 text-signal-green border-signal-green/20",
    HOLD: "bg-white/5 text-gray-300 border-white/20",
    SELL: "bg-signal-red/10 text-signal-red border-signal-red/20",
  };

  return (
    <span
      className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${styles[verdict]}`}
    >
      {verdict}
    </span>
  );
}

export default function ResearchPage() {
  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Research
          </p>
          <h1 className="font-display text-white text-4xl sm:text-5xl tracking-wider mb-6">
            REPORTS
          </h1>
          <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
            AI 워크스테이션과 독자적 분석을 거쳐 작성된 기업분석 리포트.
          </p>
        </div>
      </section>

      {/* Reports */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {reports.length > 0 ? (
            <div className="space-y-6">
              {reports.map((report) => (
                <div
                  key={report.title}
                  className="glass-card p-8 hover:border-[rgba(255,255,255,0.15)] transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-lg font-medium">
                          {report.title}
                        </h3>
                        {report.verdict && (
                          <VerdictBadge verdict={report.verdict} />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-gray-600 text-xs">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {report.team}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {report.date}
                        </span>
                        {report.ticker && (
                          <span className="text-white font-mono text-xs bg-white/5 px-2 py-0.5 rounded border border-white/10">
                            {report.ticker}
                          </span>
                        )}
                      </div>
                    </div>
                    {report.href && (
                      <a
                        href={report.href}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 text-white text-sm rounded hover:border-white/30 transition-colors shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </a>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {report.summary}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-gray-700" />
              </div>
              <p className="text-white text-lg font-display tracking-wider mb-3">
                PREPARING
              </p>
              <p className="text-gray-600 text-sm max-w-sm mx-auto">
                2026년 1학기 첫 번째 리서치 블록 진행 중.
                팀당 5주 블록을 거쳐 작성된 리포트가 이곳에 공개된다.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Report Standard */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Output
          </p>
          <h2 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-4">
            REPORT STANDARD
          </h2>
          <p className="text-gray-500 text-sm mb-12 max-w-xl">
            팀당 5주에 걸쳐 20~25페이지 기업분석 보고서를 완성한다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { title: "Executive Summary", desc: "투자논거 핵심, Bull/Bear Case, 적정가" },
              { title: "산업 분석", desc: "시장 규모, 밸류체인, 경쟁 구도" },
              { title: "기업 분석", desc: "사업 모델, 매출 구조, 재무 분석" },
              { title: "투자 포인트", desc: "Bull/Bear Case, 촉매, 리스크" },
              { title: "밸류에이션", desc: "DCF, 상대가치, 적정 주가 범위" },
              { title: "리스크 분석", desc: "핵심 리스크, 발생 확률과 영향도" },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card p-4 hover:border-[rgba(255,255,255,0.15)] transition-colors"
              >
                <p className="text-white text-sm font-medium mb-1">
                  {item.title}
                </p>
                <p className="text-gray-600 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
