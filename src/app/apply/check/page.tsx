"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Search, Loader2, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "");
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
}

interface CheckResult {
  found: boolean;
  application?: {
    name: string;
    department: string;
    grade: string;
    submittedAt: string;
  };
}

export default function CheckPage() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [error, setError] = useState("");

  async function handleCheck(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const res = await fetch("/api/apply/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, studentId, phone }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data);
      } else {
        setError(data.message || "조회 중 오류가 발생했습니다.");
      }
    } catch {
      setError("서버에 연결할 수 없습니다.");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }

  const inputClass =
    "w-full bg-dark-800/50 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-colors";

  return (
    <div className="min-h-screen pt-16">
      <section className="py-24 px-6">
        <div className="max-w-md mx-auto">
          <Link
            href="/apply"
            className="inline-flex items-center gap-1 text-gray-600 text-xs tracking-wide hover:text-gray-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" />
            지원서 작성으로
          </Link>

          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Check Status
          </p>
          <h1 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-4">
            지원 확인
          </h1>
          <p className="text-gray-500 text-sm mb-12">
            이름, 학번, 연락처를 입력하면 지원서 접수 여부를 확인할 수 있습니다.
          </p>

          <form onSubmit={handleCheck} className="space-y-5">
            <div>
              <label className="block text-white text-sm mb-2">이름</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="홍길동"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">학번 <span className="text-gray-600 text-xs">(10자리)</span></label>
              <input
                required
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="2024000000"
                maxLength={10}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">연락처</label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="010-1234-5678"
                maxLength={13}
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-white text-black font-semibold text-sm tracking-wider rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  조회 중...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  조회하기
                </>
              )}
            </button>
          </form>

          {/* 결과 */}
          {error && (
            <div className="mt-8 border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.06)] rounded-xl p-5 text-center">
              <XCircle className="w-10 h-10 text-[#ef4444] mx-auto mb-3" />
              <p className="text-gray-300 text-sm">{error}</p>
            </div>
          )}

          {result && result.found && result.application && (
            <div className="mt-8 border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.06)] rounded-xl p-6 text-center">
              <CheckCircle className="w-12 h-12 text-[#10b981] mx-auto mb-4" />
              <h3 className="font-display text-white text-xl tracking-wider mb-4">
                접수 완료
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">이름</span>
                  <span className="text-white">{result.application.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">학과</span>
                  <span className="text-white">{result.application.department}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">학년</span>
                  <span className="text-white">{result.application.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">접수일시</span>
                  <span className="text-white">{formatDate(result.application.submittedAt)}</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-5">
                서류 심사 후 면접 대상자에게 개별 연락드리겠습니다.
              </p>
            </div>
          )}

          {result && !result.found && (
            <div className="mt-8 glass-card p-6 text-center">
              <XCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="font-display text-white text-xl tracking-wider mb-3">
                지원 내역 없음
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                입력하신 정보로 등록된 지원서를 찾을 수 없습니다.
              </p>
              <Link
                href="/apply"
                className="inline-block text-sm px-6 py-2 border border-white/30 text-white rounded hover:bg-white/5 transition-colors tracking-wide"
              >
                지원하러 가기
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
