import type { Metadata } from "next";
import { FileText, Download } from "lucide-react";
import ApplicationForm from "@/components/ApplicationForm";

export const metadata: Metadata = {
  title: "How to Apply",
};

const downloadFiles = [
  {
    label: "한글 파일 (.hwp)",
    filename: "CUFA_지원서.hwp",
    href: "/files/application-form.hwp",
    icon: "HWP",
    color: "bg-white/5 text-gray-300 border-white/10",
  },
  {
    label: "워드 파일 (.docx)",
    filename: "CUFA_지원서.docx",
    href: "/files/application-form.docx",
    icon: "W",
    color: "bg-white/5 text-gray-300 border-white/10",
  },
];

export default function HowToApplyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-sm font-medium tracking-widest uppercase mb-3">
            How to Apply
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            지원 방법
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            아래에서 지원서 양식을 다운로드한 후, 작성하여 온라인으로 제출해주세요.
          </p>
        </div>
      </section>

      {/* Step 1: Download */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <h2 className="text-xl font-bold text-white">
              지원서 양식 다운로드
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {downloadFiles.map((file) => (
              <a
                key={file.href}
                href={file.href}
                download={file.filename}
                className="group bg-dark-900 border border-white/5 rounded-xl p-6 flex items-center gap-4 hover:border-white/20 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-lg border flex items-center justify-center shrink-0 ${file.color}`}
                >
                  <span className="font-bold text-lg">{file.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium mb-1">{file.label}</p>
                  <p className="text-gray-500 text-xs truncate">
                    {file.filename}
                  </p>
                </div>
                <Download className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Step 2: Submit */}
      <section className="py-12 px-4 bg-dark-800">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <h2 className="text-xl font-bold text-white">지원서 제출하기</h2>
          </div>

          <div className="bg-dark-900 border border-white/5 rounded-xl p-6 sm:p-8">
            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* Notice */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-dark-900 border border-white/10 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-semibold mb-2">안내사항</h3>
                <ul className="text-gray-400 text-sm space-y-1.5">
                  <li>
                    - 지원서 제출 후 입력하신 이메일로 확인 메일이 발송됩니다.
                  </li>
                  <li>- 서류 심사 결과는 개별 연락드립니다.</li>
                  <li>
                    - 문의사항은 이메일로 연락해주세요.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
