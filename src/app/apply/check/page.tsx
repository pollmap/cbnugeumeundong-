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
        setError(data.message || "An error occurred during lookup.");
      }
    } catch {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
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
            Back to application
          </Link>

          <p className="text-gray-600 text-xs tracking-[0.4em] uppercase mb-4">
            Check Status
          </p>
          <h1 className="font-display text-white text-3xl sm:text-4xl tracking-wider mb-4">
            APPLICATION STATUS
          </h1>
          <p className="text-gray-500 text-sm mb-12">
            Enter your name, student ID, and phone number to verify your application status.
          </p>

          <form onSubmit={handleCheck} className="space-y-5">
            <div>
              <label className="block text-white text-sm mb-2">Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Hong Gil-dong"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Student ID <span className="text-gray-600 text-xs">(10 digits)</span></label>
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
              <label className="block text-white text-sm mb-2">Phone</label>
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
                  Checking...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Check
                </>
              )}
            </button>
          </form>

          {/* Result */}
          {error && (
            <div className="mt-8 border border-[rgba(239,68,68,0.3)] bg-[rgba(239,68,68,0.06)] rounded p-5 text-center">
              <XCircle className="w-10 h-10 text-[#ef4444] mx-auto mb-3" />
              <p className="text-gray-300 text-sm">{error}</p>
            </div>
          )}

          {result && result.found && result.application && (
            <div className="mt-8 border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.06)] rounded p-6 text-center">
              <CheckCircle className="w-12 h-12 text-[#10b981] mx-auto mb-4" />
              <h3 className="font-display text-white text-xl tracking-wider mb-4">
                Application Received
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Name</span>
                  <span className="text-white">{result.application.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Department</span>
                  <span className="text-white">{result.application.department}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-500">Grade</span>
                  <span className="text-white">{result.application.grade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Submitted At</span>
                  <span className="text-white">{formatDate(result.application.submittedAt)}</span>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-5">
                We will contact interview candidates individually after the document review.
              </p>
            </div>
          )}

          {result && !result.found && (
            <div className="mt-8 border border-white/10 rounded p-6 text-center">
              <XCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="font-display text-white text-xl tracking-wider mb-3">
                No Application Found
              </h3>
              <p className="text-gray-500 text-sm mb-5">
                No application was found with the provided information.
              </p>
              <Link
                href="/apply"
                className="inline-block text-sm px-6 py-2 border border-white/30 text-white rounded hover:bg-white/5 transition-colors tracking-wide"
              >
                Apply Now
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
