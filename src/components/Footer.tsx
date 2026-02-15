import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-2 text-center">
        <span className="font-display text-white text-lg tracking-[0.2em]">
          {SITE_NAME}
        </span>
        <p className="text-gray-600 text-xs tracking-wide">
          충북대학교 가치투자학회
        </p>
        <p className="text-gray-700 text-xs mt-2">
          &copy; {new Date().getFullYear()} CUFA
        </p>
      </div>
    </footer>
  );
}
