import { SITE_NAME } from "@/lib/constants";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
          {/* Left — Branding */}
          <div>
            <span className="font-display text-white text-2xl tracking-[0.2em] block mb-2">
              {SITE_NAME}
            </span>
            <p className="text-gray-600 text-xs tracking-wide">
              Chungbuk University Value Investment Club
            </p>
          </div>

          {/* Right — Contact */}
          <div>
            <p className="text-gray-500 text-xs tracking-widest uppercase mb-4">
              Contact Us
            </p>
            <p className="text-white text-sm mb-3">
              President Lee Chan-hee
            </p>
            <div className="space-y-2">
              <a
                href="mailto:lch6817556@gmail.com"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                lch6817556@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom — Copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-700 text-xs">
            &copy; {new Date().getFullYear()} CUFA. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Designed &amp; Built by 이찬희
          </p>
        </div>
      </div>
    </footer>
  );
}
