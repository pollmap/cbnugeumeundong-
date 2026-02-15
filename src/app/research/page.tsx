import type { Metadata } from "next";
import { FileText, Download, Calendar, Users } from "lucide-react";

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

const reports: Report[] = [
  // 리포트가 발간되면 아래 형식으로 추가하세요:
  // {
  //   title: "삼성전자 심층 분석 리포트",
  //   team: "리서치팀 A",
  //   date: "2026.05",
  //   summary: "반도체 사이클 회복과 AI 메모리 수요 확대에 따른 밸류에이션 재평가",
  //   ticker: "005930",
  //   verdict: "BUY",
  //   href: "/reports/samsung-2026-1.pdf",
  // },
];

function VerdictBadge({ verdict }: { verdict: "BUY" | "HOLD" | "SELL" }) {
  const styles = {
    BUY: "bg-signal-green/10 text-signal-green border-signal-green/20",
    HOLD: "bg-gold-500/10 text-gold-400 border-gold-500/20",
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
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">
            Research
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            리서치 리포트
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            CUFA 팀 리서치를 통해 발간된 기업분석 리포트입니다. AI 워크벤치와
            독자적 분석을 거쳐 작성되었습니다.
          </p>
        </div>
      </section>

      {/* Reports */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {reports.length > 0 ? (
            <div className="space-y-6">
              {reports.map((report) => (
                <div
                  key={report.title}
                  className="bg-navy-900/50 border border-white/5 rounded-xl p-8 hover:border-gold-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white text-lg font-bold">
                          {report.title}
                        </h3>
                        {report.verdict && (
                          <VerdictBadge verdict={report.verdict} />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-gray-500 text-sm">
                        <span className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {report.team}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {report.date}
                        </span>
                        {report.ticker && (
                          <span className="text-gold-500 font-mono text-xs bg-gold-500/10 px-2 py-0.5 rounded">
                            {report.ticker}
                          </span>
                        )}
                      </div>
                    </div>
                    {report.href && (
                      <a
                        href={report.href}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 text-gold-500 text-sm font-medium rounded-lg hover:bg-gold-500/20 transition-colors shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        PDF 다운로드
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
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-navy-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">
                리포트 준비 중
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-2">
                2026년 1학기 첫 번째 리서치 블록이 진행 중입니다.
              </p>
              <p className="text-gray-600 text-sm">
                팀당 6주 블록을 거쳐 작성된 리포트가 이곳에 공개됩니다.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Report Format Info */}
      <section className="py-16 px-4 bg-navy-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10 text-center">
            리포트 구성
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "투자 요약", desc: "핵심 투자포인트와 적정가 제시" },
              { title: "기업 & 산업 분석", desc: "사업 구조, 경쟁 환경, 산업 트렌드" },
              { title: "재무 분석", desc: "주요 재무지표 분석과 성장성 평가" },
              { title: "밸류에이션", desc: "DCF, 멀티플 등 복수 모델 적용" },
              { title: "AI vs 본인 분석", desc: "AI 산출 vs 수정된 가정 비교 (필수)" },
              { title: "리스크 & 킬조건", desc: "핵심 리스크와 구체적 매도 기준" },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-navy-900/50 border border-white/5 rounded-lg p-5"
              >
                <p className="text-gold-500 font-semibold text-sm mb-1">
                  {item.title}
                </p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
