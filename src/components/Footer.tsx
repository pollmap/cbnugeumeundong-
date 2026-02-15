import { SITE_NAME } from "@/lib/constants";
import { Mail, Phone } from "lucide-react";

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
              충북대학교 가치투자학회
            </p>
          </div>

          {/* Right — Contact */}
          <div>
            <p className="text-gray-500 text-xs tracking-widest uppercase mb-4">
              Contact Us
            </p>
            <p className="text-white text-sm mb-3">
              회장 이찬희
            </p>
            <div className="space-y-2">
              <a
                href="tel:010-9598-3921"
                className="flex items-center gap-2 text-gray-400 text-sm hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                010-9598-3921
              </a>
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
            Designed &amp; Built by CUFA
          </p>
        </div>
      </div>
    </footer>
  );
}
