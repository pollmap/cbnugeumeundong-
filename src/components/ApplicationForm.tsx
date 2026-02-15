"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface ApplicationData {
  name: string;
  studentId: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  studentId?: string;
  email?: string;
  phone?: string;
  file?: string;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState<ApplicationData>({
    name: "",
    studentId: "",
    email: "",
    phone: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function validate(): FormErrors {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = "이름을 입력해주세요.";
    } else if (!/^[가-힣a-zA-Z\s]+$/.test(formData.name.trim())) {
      errs.name = "이름은 한글 또는 영어만 입력 가능합니다.";
    }

    if (!formData.studentId.trim()) {
      errs.studentId = "학번을 입력해주세요.";
    } else if (!/^\d+$/.test(formData.studentId.trim())) {
      errs.studentId = "학번은 숫자만 입력 가능합니다.";
    }

    if (!formData.email.trim()) {
      errs.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "올바른 이메일 형식을 입력해주세요.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      errs.phone = "전화번호를 입력해주세요.";
    } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
      errs.phone = "올바른 전화번호를 입력해주세요.";
    }

    if (!file) {
      errs.file = "지원서 파일을 업로드해주세요.";
    } else if (file.size > 10 * 1024 * 1024) {
      errs.file = "파일 크기는 10MB 이하여야 합니다.";
    }

    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    setMessage("");

    try {
      const body = new FormData();
      body.append("name", formData.name.trim());
      body.append("studentId", formData.studentId.trim());
      body.append("email", formData.email.trim());
      body.append("phone", formData.phone.replace(/\D/g, ""));
      if (file) body.append("file", file);

      const res = await fetch("/api/apply", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(
          "지원서가 성공적으로 제출되었습니다! 입력하신 이메일로 확인 메일이 발송됩니다."
        );
        setFormData({ name: "", studentId: "", email: "", phone: "" });
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        setStatus("error");
        setMessage(data.message || "제출 중 오류가 발생했습니다.");
      }
    } catch {
      setStatus("error");
      setMessage("서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = [
      "application/haansofthwp",
      "application/x-hwp",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "application/pdf",
    ];
    const allowedExtensions = [".hwp", ".docx", ".doc", ".pdf"];
    const ext = "." + selected.name.split(".").pop()?.toLowerCase();

    if (!allowedTypes.includes(selected.type) && !allowedExtensions.includes(ext)) {
      setErrors((prev) => ({
        ...prev,
        file: "HWP, Word(.docx), PDF 파일만 업로드 가능합니다.",
      }));
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        file: "파일 크기는 10MB 이하여야 합니다.",
      }));
      return;
    }

    setFile(selected);
    setErrors((prev) => ({ ...prev, file: undefined }));
  }

  if (status === "success") {
    return (
      <div className="bg-navy-900/50 border border-green-500/30 rounded-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-white text-xl font-bold mb-2">제출 완료!</h3>
        <p className="text-gray-400">{message}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 px-6 py-2 text-sm border border-white/20 text-white rounded-lg hover:bg-white/5 transition-colors"
        >
          새로운 지원서 제출
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-400 text-sm">{message}</p>
        </div>
      )}

      {/* 이름 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          이름 <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          placeholder="홍길동"
          className={`w-full bg-navy-800 border ${
            errors.name ? "border-red-500/50" : "border-white/10"
          } rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/25 transition-colors`}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>
        )}
        <p className="text-gray-600 text-xs mt-1">한글 또는 영어만 입력 가능</p>
      </div>

      {/* 학번 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          학번 <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.studentId}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "");
            setFormData({ ...formData, studentId: val });
            if (errors.studentId)
              setErrors({ ...errors, studentId: undefined });
          }}
          placeholder="2024000000"
          className={`w-full bg-navy-800 border ${
            errors.studentId ? "border-red-500/50" : "border-white/10"
          } rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/25 transition-colors`}
        />
        {errors.studentId && (
          <p className="text-red-400 text-xs mt-1.5">{errors.studentId}</p>
        )}
      </div>

      {/* 이메일 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          이메일 <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          placeholder="example@cbnu.ac.kr"
          className={`w-full bg-navy-800 border ${
            errors.email ? "border-red-500/50" : "border-white/10"
          } rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/25 transition-colors`}
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>
        )}
      </div>

      {/* 전화번호 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          전화번호 <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => {
            const formatted = formatPhone(e.target.value);
            setFormData({ ...formData, phone: formatted });
            if (errors.phone) setErrors({ ...errors, phone: undefined });
          }}
          placeholder="010-1234-5678"
          maxLength={13}
          className={`w-full bg-navy-800 border ${
            errors.phone ? "border-red-500/50" : "border-white/10"
          } rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/25 transition-colors`}
        />
        {errors.phone && (
          <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>
        )}
      </div>

      {/* 파일 업로드 */}
      <div>
        <label className="block text-white text-sm font-medium mb-2">
          지원서 파일 <span className="text-red-400">*</span>
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`w-full bg-navy-800 border-2 border-dashed ${
            errors.file ? "border-red-500/50" : "border-white/10"
          } rounded-lg px-4 py-8 text-center cursor-pointer hover:border-gold-500/30 transition-colors`}
        >
          <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
          {file ? (
            <p className="text-gold-500 text-sm font-medium">{file.name}</p>
          ) : (
            <>
              <p className="text-gray-400 text-sm">
                클릭하여 파일을 선택하세요
              </p>
              <p className="text-gray-600 text-xs mt-1">
                HWP, Word(.docx), PDF (최대 10MB)
              </p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".hwp,.docx,.doc,.pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        {errors.file && (
          <p className="text-red-400 text-xs mt-1.5">{errors.file}</p>
        )}
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-gold-500 text-navy-950 font-semibold py-3.5 rounded-lg hover:bg-gold-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            제출 중...
          </>
        ) : (
          "지원서 제출하기"
        )}
      </button>
    </form>
  );
}
