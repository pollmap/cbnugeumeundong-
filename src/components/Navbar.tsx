"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SITE_NAME, NAV_ITEMS, GOOGLE_FORM_URL } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark-950/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — Cinzel */}
          <Link href="/" className="font-display text-white text-xl tracking-[0.15em]">
            {SITE_NAME}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="nav-link text-gray-400 text-sm tracking-wide hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={GOOGLE_FORM_URL}
              {...(GOOGLE_FORM_URL !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-sm px-5 py-1.5 border border-white/30 text-white rounded hover:bg-white/5 transition-colors tracking-wide"
            >
              Apply
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-dark-950/95 backdrop-blur-lg z-40">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-white text-2xl font-display tracking-widest hover:text-gray-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={GOOGLE_FORM_URL}
              {...(GOOGLE_FORM_URL !== "#" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => setMobileOpen(false)}
              className="text-white text-2xl font-display tracking-widest hover:text-gray-400 transition-colors"
            >
              Apply
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
