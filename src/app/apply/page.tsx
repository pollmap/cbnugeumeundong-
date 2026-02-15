"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, CheckCircle, XCircle, X } from "lucide-react";
import Footer from "@/components/Footer";

const GRADES = ["1학년", "2학년", "3학년", "4학년"] as const;
const EXPERIENCE = ["없음", "1년 미만", "1~3년", "3년 이상"] as const;
const MOTIVATION_MIN = 500;

interface FormData {
  name: string;
  studentId: string;
  department: string;
  grade: string;
  phone: string;
  email: string;
  canCommit: string;
  isEnrolled: string;
  experience: string;
  motivation: string;
  deepDive: string;
  industry1: string;
  industry2: string;
  company1: string;
  company2: string;
}

const initial: FormData = {
  name: "",
  studentId: "",
  department: "",
  grade: "",
  phone: "",
  email: "",
  canCommit: "",
  isEnrolled: "",
  experience: "",
  motivation: "",
  deepDive: "",
  industry1: "",
  industry2: "",
  company1: "",
  company2: "",
};

function formatPhone(v: string) {
  const d = v.replace(/\D/g, "");
  if (d.length <= 3) return d;
  if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
}

/* ── Modal Component ── */
function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-dark-900 border border-white/10 rounded-lg max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>
        {children}
      </div>
    </div>
  );
}

export default function ApplyPage() {
  const [form, setForm] = useState<FormData>(initial);
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function set(key: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function showErrorModal(msg: string) {
    setErrorMsg(msg);
    setShowError(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // Client-side validation with specific reasons
    if (form.canCommit === "아니오") {
      setSubmitting(false);
      showErrorModal("2학기 연속 참여가 불가능한 경우 지원할 수 없습니다.");
      return;
    }

    if (form.isEnrolled === "아니오") {
      setSubmitting(false);
      showErrorModal("현재 재학 중인 학생만 지원 가능합니다.\n(휴학생은 지원 불가)");
      return;
    }

    if (form.motivation.length < MOTIVATION_MIN) {
      setSubmitting(false);
      showErrorModal(
        `지원 동기를 ${MOTIVATION_MIN}자 이상 작성해주세요.\n현재 ${form.motivation.length}자 / 최소 ${MOTIVATION_MIN}자`
      );
      return;
    }

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitting(false);
        setShowSuccess(true);
      } else {
        setSubmitting(false);
        showErrorModal(data.message || "제출 중 오류가 발생했습니다.");
      }
    } catch {
      setSubmitting(false);
      showErrorModal("서버에 연결할 수 없습니다.\n네트워크 연결을 확인해주세요.");
    }
  }

  const inputClass =
    "w-full bg-dark-800/50 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder:text-gray-700 focus:outline-none focus:border-white/30 transition-colors";
  const labelClass = "block text-white text-sm mb-2";
  const requiredMark = <span className="text-gray-500 ml-1">*</span>;
  const motivationLen = form.motivation.length;
  const motivationOk = motivationLen >= MOTIVATION_MIN;

  return (
    <div className="min-h-screen pt-16">
      {/* ── 제출 완료 팝업 ── */}
      <Modal open={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="text-center">
          <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-5" />
          <h2 className="font-display text-white text-2xl tracking-wider mb-3">
            제출 완료
          </h2>
          <div className="space-y-2 mb-6">
            <p className="text-gray-300 text-sm">
              지원서가 정상적으로 접수되었습니다!
            </p>
            <p className="text-gray-400 text-sm">
              서류 심사 후 면접 대상자에게 개별 연락드리겠습니다.
            </p>
          </div>
          <div className="border border-white/10 rounded p-4 mb-6">
            <p className="text-gray-500 text-xs mb-2">전형 절차</p>
            <p className="text-white text-sm tracking-wide">
              온라인 지원서 제출 → 서류 심사 → 면접 → 최종 합격
            </p>
          </div>
          <div className="bg-dark-800/50 border border-white/5 rounded p-3 mb-6">
            <p className="text-gray-500 text-xs">
              지원자: <span className="text-gray-300">{form.name}</span> · <span className="text-gray-300">{form.department}</span>
            </p>
          </div>
          <button
            onClick={() => {
              setShowSuccess(false);
              setForm(initial);
            }}
            className="w-full py-3 bg-white text-black font-semibold text-sm tracking-wider rounded hover:bg-gray-200 transition-colors mb-3"
          >
            확인
          </button>
          <Link
            href="/apply/check"
            className="block text-center text-gray-500 text-xs hover:text-gray-300 transition-colors underline underline-offset-4"
          >
            접수 여부 다시 확인하기
          </Link>
        </div>
      </Modal>

      {/* ── 제출 실패 팝업 ── */}
      <Modal open={showError} onClose={() => setShowError(false)}>
        <div className="text-center">
          <XCircle className="w-14 h-14 text-red-400 mx-auto mb-5" />
          <h2 className="font-display text-white text-2xl tracking-wider mb-3">
            제출 불가
          </h2>
          <div className="border border-red-500/20 bg-red-500/5 rounded p-4 mb-6">
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {errorMsg}
            </p>
          </div>
          <button
            onClick={() => setShowError(false)}
            className="w-full py-3 bg-white text-black font-semibold text-sm tracking-wider rounded hover:bg-gray-200 transition-colors"
          >
            돌아가서 수정하기
          </button>
        </div>
      </Modal>

      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Application
          </p>
          <h1 className="font-display text-white text-4xl sm:text-5xl tracking-wider mb-4">
            APPLY
          </h1>
          <p className="text-gray-500 text-sm mb-2">
            충북대학교 가치투자학회 CUFA 신규 회원 모집
          </p>
          <div className="text-gray-600 text-xs space-y-1 mb-4">
            <p>2학기 연속 참여 필수 / 휴학생 지원 불가</p>
          </div>
          <div className="border border-white/10 rounded px-4 py-3 mb-4">
            <p className="text-gray-400 text-xs leading-relaxed">
              전형 절차: <span className="text-white">온라인 지원서 제출</span> → <span className="text-white">서류 심사</span> → <span className="text-white">면접</span> → <span className="text-white">최종 합격</span>
            </p>
            <p className="text-gray-600 text-xs mt-1">
              서류 합격자에 한해 면접 일정을 개별 안내합니다.
            </p>
          </div>
          <div className="mb-12">
            <Link
              href="/apply/check"
              className="text-gray-600 text-xs hover:text-gray-400 transition-colors underline underline-offset-4"
            >
              이미 지원하셨나요? 접수 여부 확인하기
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 인적사항 */}
            <div className="space-y-5">
              <p className="text-gray-600 text-xs tracking-widest uppercase">
                Personal Info
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>이름{requiredMark}</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="홍길동"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    학번{requiredMark}
                    <span className="text-gray-600 text-xs ml-2">(10자리)</span>
                  </label>
                  <input
                    required
                    type="text"
                    value={form.studentId}
                    onChange={(e) => set("studentId", e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="2024000000"
                    maxLength={10}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>학과{requiredMark}</label>
                  <input
                    required
                    type="text"
                    value={form.department}
                    onChange={(e) => set("department", e.target.value)}
                    placeholder="경영학과"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    학년{requiredMark}
                    <span className="text-gray-600 text-xs ml-2">(2026년 1학기 기준)</span>
                  </label>
                  <select
                    required
                    value={form.grade}
                    onChange={(e) => set("grade", e.target.value)}
                    className={`${inputClass} ${!form.grade ? "text-gray-700" : ""}`}
                  >
                    <option value="" disabled>
                      선택
                    </option>
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>연락처{requiredMark}</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", formatPhone(e.target.value))}
                    placeholder="010-1234-5678"
                    maxLength={13}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>이메일{requiredMark}</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="example@cbnu.ac.kr"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* 자격 확인 */}
            <div className="space-y-5">
              <p className="text-gray-600 text-xs tracking-widest uppercase">
                Eligibility
              </p>

              <div>
                <label className={labelClass}>
                  2학기 연속 참여가 가능합니까?{requiredMark}
                </label>
                <div className="flex gap-4">
                  {["예", "아니오"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 text-center py-3 border rounded text-sm cursor-pointer transition-colors ${
                        form.canCommit === opt
                          ? "border-white/40 text-white bg-white/5"
                          : "border-white/10 text-gray-600 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="canCommit"
                        value={opt}
                        checked={form.canCommit === opt}
                        onChange={(e) => set("canCommit", e.target.value)}
                        className="sr-only"
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {form.canCommit === "아니오" && (
                  <p className="text-gray-500 text-xs mt-2">
                    2학기 연속 참여가 불가능한 경우 지원할 수 없습니다.
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  현재 재학 중입니까?{requiredMark}
                  <span className="text-gray-600 text-xs ml-2">
                    (휴학생 지원 불가)
                  </span>
                </label>
                <div className="flex gap-4">
                  {["예, 재학 중입니다", "아니오"].map((opt) => (
                    <label
                      key={opt}
                      className={`flex-1 text-center py-3 border rounded text-sm cursor-pointer transition-colors ${
                        form.isEnrolled === opt
                          ? "border-white/40 text-white bg-white/5"
                          : "border-white/10 text-gray-600 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="isEnrolled"
                        value={opt}
                        checked={form.isEnrolled === opt}
                        onChange={(e) => set("isEnrolled", e.target.value)}
                        className="sr-only"
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>투자 경험{requiredMark}</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {EXPERIENCE.map((opt) => (
                    <label
                      key={opt}
                      className={`text-center py-3 border rounded text-sm cursor-pointer transition-colors ${
                        form.experience === opt
                          ? "border-white/40 text-white bg-white/5"
                          : "border-white/10 text-gray-600 hover:border-white/20"
                      }`}
                    >
                      <input
                        type="radio"
                        name="experience"
                        value={opt}
                        checked={form.experience === opt}
                        onChange={(e) => set("experience", e.target.value)}
                        className="sr-only"
                        required
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 서술 */}
            <div className="space-y-5">
              <p className="text-gray-600 text-xs tracking-widest uppercase">
                Motivation
              </p>

              <div>
                <label className={labelClass}>
                  지원 동기{requiredMark}
                  <span className="text-gray-600 text-xs ml-2">
                    (500자 이상)
                  </span>
                </label>
                <textarea
                  required
                  value={form.motivation}
                  onChange={(e) => set("motivation", e.target.value)}
                  placeholder="CUFA에 지원하게 된 동기를 500자 이상으로 작성해주세요."
                  rows={6}
                  className={`${inputClass} resize-none`}
                />
                <div className="flex justify-end mt-1.5">
                  <span
                    className={`text-xs tabular-nums ${
                      motivationOk ? "text-gray-500" : "text-gray-600"
                    }`}
                  >
                    <span className={motivationLen > 0 && !motivationOk ? "text-white" : ""}>
                      {motivationLen}
                    </span>
                    <span className="text-gray-700"> / {MOTIVATION_MIN}자</span>
                  </span>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  본인이 한 가장 큰 덕질은?{requiredMark}
                  <span className="text-gray-600 text-xs ml-2">
                    (분야 무관, 자유롭게)
                  </span>
                </label>
                <textarea
                  required
                  value={form.deepDive}
                  onChange={(e) => set("deepDive", e.target.value)}
                  placeholder="투자, 게임, 음악, 운동, 덕질 등 어떤 분야든 좋습니다. 본인이 가장 깊게 파본 경험을 자유롭게 적어주세요."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* 관심 산업 & 기업 */}
            <div className="space-y-5">
              <p className="text-gray-600 text-xs tracking-widest uppercase">
                Interests
              </p>

              <div>
                <label className={labelClass}>
                  관심 산업{requiredMark}
                  <span className="text-gray-600 text-xs ml-2">
                    (2개)
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    value={form.industry1}
                    onChange={(e) => set("industry1", e.target.value)}
                    placeholder="예: 반도체"
                    className={inputClass}
                  />
                  <input
                    required
                    type="text"
                    value={form.industry2}
                    onChange={(e) => set("industry2", e.target.value)}
                    placeholder="예: 2차전지"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  관심 기업{requiredMark}
                  <span className="text-gray-600 text-xs ml-2">
                    (2개)
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    value={form.company1}
                    onChange={(e) => set("company1", e.target.value)}
                    placeholder="예: 삼성전자"
                    className={inputClass}
                  />
                  <input
                    required
                    type="text"
                    value={form.company2}
                    onChange={(e) => set("company2", e.target.value)}
                    placeholder="예: LG에너지솔루션"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 bg-white text-black font-semibold text-sm tracking-wider rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  제출 중...
                </>
              ) : (
                <>
                  제출하기
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
