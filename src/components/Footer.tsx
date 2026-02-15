import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="text-white font-bold text-lg tracking-wider">{SITE_NAME}</span>
            <p className="text-gray-600 text-sm mt-1">
              충북대학교 금융분석학회
            </p>
          </div>

          <p className="text-gray-700 text-xs">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
