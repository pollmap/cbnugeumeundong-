"use client";

import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Loader2, CheckCircle, XCircle, X } from "lucide-react";
import Footer from "@/components/Footer";

const GRADES = ["Freshman", "Sophomore", "Junior", "Senior"] as const;
const EXPERIENCE = ["None", "< 1 year", "1–3 years", "3+ years"] as const;
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
        className="relative glass-card max-w-md w-full p-8 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-white transition-colors"
          aria-label="Close"
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
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
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
    if (form.canCommit === "No") {
      setSubmitting(false);
      showErrorModal("Applicants unable to commit for 2 consecutive semesters are not eligible.");
      return;
    }

    if (form.motivation.length < MOTIVATION_MIN) {
      setSubmitting(false);
      showErrorModal(
        `Please write at least ${MOTIVATION_MIN} characters for your motivation.\nCurrent: ${form.motivation.length} / Minimum: ${MOTIVATION_MIN}`
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
        showErrorModal(data.message || "An error occurred during submission.");
      }
    } catch {
      setSubmitting(false);
      showErrorModal("Unable to connect to server.\nPlease check your network connection.");
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
      {/* ── Success Modal ── */}
      <Modal open={showSuccess} onClose={() => setShowSuccess(false)}>
        <div className="text-center">
          <CheckCircle className="w-14 h-14 text-[#10b981] mx-auto mb-5" />
          <h2 className="font-display text-white text-2xl tracking-wider mb-3">
            Submitted
          </h2>
          <div className="space-y-2 mb-6">
            <p className="text-gray-300 text-sm">
              Your application has been successfully received!
            </p>
            <p className="text-gray-400 text-sm">
              We will contact interview candidates individually after the document review.
            </p>
          </div>
          <div className="glass-card p-4 mb-6">
            <p className="text-gray-500 text-xs mb-2">Selection Process</p>
            <p className="text-white text-sm tracking-wide">
              Online Application → Document Review → Interview → Final Offer
            </p>
          </div>
          <div className="glass-card p-3 mb-6">
            <p className="text-gray-500 text-xs">
              Applicant: <span className="text-gray-300">{form.name}</span> · <span className="text-gray-300">{form.department}</span>
            </p>
          </div>
          <button
            onClick={() => {
              setShowSuccess(false);
              setForm(initial);
            }}
            className="w-full py-3 bg-white text-black font-semibold text-sm tracking-wider rounded hover:bg-gray-200 transition-colors mb-3"
          >
            Confirm
          </button>
          <Link
            href="/apply/check"
            className="block text-center text-gray-500 text-xs hover:text-gray-300 transition-colors underline underline-offset-4"
          >
            Check application status
          </Link>
        </div>
      </Modal>

      {/* ── Error Modal ── */}
      <Modal open={showError} onClose={() => setShowError(false)}>
        <div className="text-center">
          <XCircle className="w-14 h-14 text-[#ef4444] mx-auto mb-5" />
          <h2 className="font-display text-white text-2xl tracking-wider mb-3">
            Submission Failed
          </h2>
          <div className="border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.06)] rounded-xl p-4 mb-6">
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {errorMsg}
            </p>
          </div>
          <button
            onClick={() => setShowError(false)}
            className="w-full py-3 bg-white text-black font-semibold text-sm tracking-wider rounded hover:bg-gray-200 transition-colors"
          >
            Go back and edit
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
            CUFA Chungbuk University Value Investment Club — New Member Recruitment
          </p>
          <div className="text-gray-600 text-xs space-y-1 mb-4">
            <p>2 consecutive semesters required / Students on leave may apply (must re-enroll upon joining)</p>
          </div>
          <div className="glass-card px-4 py-3 mb-4">
            <p className="text-gray-400 text-xs leading-relaxed">
              Selection Process: <span className="text-white">Online Application</span> → <span className="text-white">Document Review</span> → <span className="text-white">Interview</span> → <span className="text-white">Final Offer</span>
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Interview: Individual interviews on Mar 5 (time to be arranged)
            </p>
          </div>
          <div className="mb-12">
            <Link
              href="/apply/check"
              className="text-gray-600 text-xs hover:text-gray-400 transition-colors underline underline-offset-4"
            >
              Already applied? Check your application status
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div className="space-y-5">
              <p className="text-gray-600 text-xs tracking-widest uppercase">
                Personal Info
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Name{requiredMark}</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Hong Gil-dong"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Student ID{requiredMark}
                    <span className="text-gray-600 text-xs ml-2">(10 digits)</span>
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
                  <label className={labelClass}>Department{requiredMark}</label>
                  <input
                    required
                    type="text"
                    value={form.department}
                    onChange={(e) => set("department", e.target.value)}
                    placeholder="Business Administration"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    Grade{requiredMark}
                    <span className="text-gray-600 text-xs ml-2">(As of Spring 2026)</span>
                  </label>
                  <select
                    required
                    value={form.grade}
                    onChange={(e) => set("grade", e.target.value)}
                    className={`${inputClass} ${!form.grade ? "text-gray-700" : ""}`}
                  >
                    <option value="" disabled>
                      Select
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
                  <label className={labelClass}>Phone{requiredMark}</label>
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
                  <label className={labelClass}>Email{requiredMark}</label>
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

            {/* Eligibility */}
            <div className="space-y-5">
              <p className="text-gray-600 text-xs tracking-widest uppercase">
                Eligibility
              </p>

              <div>
                <label className={labelClass}>
                  Can you commit for 2 consecutive semesters?{requiredMark}
                </label>
                <div className="flex gap-4">
                  {["Yes", "No"].map((opt) => (
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
                {form.canCommit === "No" && (
                  <p className="text-gray-500 text-xs mt-2">
                    Applicants unable to commit for 2 consecutive semesters are not eligible.
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>
                  Are you currently enrolled?{requiredMark}
                  <span className="text-gray-600 text-xs ml-2">
                    (Students on leave may apply, but must re-enroll upon joining)
                  </span>
                </label>
                <div className="flex gap-4">
                  {["Yes, enrolled", "No (on leave)"].map((opt) => (
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
                {form.isEnrolled === "No (on leave)" && (
                  <p className="text-gray-500 text-xs mt-2">
                    You may apply. However, you must be re-enrolled by the time of joining after final acceptance.
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>Investment Experience{requiredMark}</label>
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

            {/* Motivation */}
            <div className="space-y-5">
              <p className="text-gray-600 text-xs tracking-widest uppercase">
                Motivation
              </p>

              <div>
                <label className={labelClass}>
                  Why CUFA?{requiredMark}
                  <span className="text-gray-600 text-xs ml-2">
                    (500+ characters)
                  </span>
                </label>
                <textarea
                  required
                  value={form.motivation}
                  onChange={(e) => set("motivation", e.target.value)}
                  placeholder="Write your motivation for applying to CUFA (500+ characters)."
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
                    <span className="text-gray-700"> / {MOTIVATION_MIN} chars</span>
                  </span>
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  What&apos;s your biggest deep dive?{requiredMark}
                  <span className="text-gray-600 text-xs ml-2">
                    (Any field, write freely)
                  </span>
                </label>
                <textarea
                  required
                  value={form.deepDive}
                  onChange={(e) => set("deepDive", e.target.value)}
                  placeholder="Investing, gaming, music, sports, or any field. Write freely about the topic you've gone deepest on."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-5">
              <p className="text-gray-600 text-xs tracking-widest uppercase">
                Interests
              </p>

              <div>
                <label className={labelClass}>
                  Industries of Interest{requiredMark}
                  <span className="text-gray-600 text-xs ml-2">
                    (Pick 2)
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    value={form.industry1}
                    onChange={(e) => set("industry1", e.target.value)}
                    placeholder="e.g., Semiconductors"
                    className={inputClass}
                  />
                  <input
                    required
                    type="text"
                    value={form.industry2}
                    onChange={(e) => set("industry2", e.target.value)}
                    placeholder="e.g., EV Batteries"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>
                  Companies of Interest{requiredMark}
                  <span className="text-gray-600 text-xs ml-2">
                    (Pick 2)
                  </span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    value={form.company1}
                    onChange={(e) => set("company1", e.target.value)}
                    placeholder="e.g., Samsung Electronics"
                    className={inputClass}
                  />
                  <input
                    required
                    type="text"
                    value={form.company2}
                    onChange={(e) => set("company2", e.target.value)}
                    placeholder="e.g., LG Energy Solution"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/*
              Privacy Policy
              - Collected personal data is used solely for application screening.
              - Automatically deleted after final acceptance or rejection.
            */}
            <div className="glass-card p-5 space-y-4">
              <p className="text-white text-sm font-semibold">
                Privacy Policy Agreement
              </p>
              <div className="bg-[rgba(255,255,255,0.03)] rounded-lg p-4 space-y-3 text-xs text-gray-400 leading-relaxed max-h-48 overflow-y-auto">
                <div>
                  <p className="text-gray-300 font-medium mb-1">1. Data Collected</p>
                  <p>Name, student ID, department, grade, phone, email, investment experience, motivation, industries &amp; companies of interest</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">2. Purpose</p>
                  <p>Document screening and interview process for CUFA new member recruitment</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">3. Retention Period</p>
                  <p>Immediately deleted upon final acceptance or rejection (at most until end of the semester)</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">4. Right to Refuse</p>
                  <p>You may refuse, but refusal will prevent you from applying.</p>
                </div>
                <div>
                  <p className="text-gray-300 font-medium mb-1">5. Third-Party Sharing</p>
                  <p>Collected personal data will not be shared with any third party.</p>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacyAgreed}
                  onChange={(e) => setPrivacyAgreed(e.target.checked)}
                  className="w-4 h-4 accent-white rounded"
                />
                <span className="text-white text-sm">
                  I have read and agree to the collection and use of my personal data.
                </span>
                <span className="text-gray-500 ml-1">*</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !privacyAgreed}
              className="w-full py-4 bg-white text-black font-semibold text-sm tracking-wider rounded hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit
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
