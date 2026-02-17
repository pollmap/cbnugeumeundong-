"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, APPLY_URL } from "@/lib/constants";

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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-dark-950/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/cufa-icon-192.png"
              alt="CUFA"
              width={36}
              height={36}
              className="h-9 w-9 invert"
              priority
            />
            <span className="font-display text-white text-lg tracking-[0.15em] hidden sm:inline">
              CUFA
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link text-gray-400 text-sm tracking-wide hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ) : item.comingSoon ? (
                <span
                  key={item.label}
                  className="nav-link text-gray-600 text-sm tracking-wide cursor-default relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    2026.03.03 공개예정
                  </span>
                </span>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-link text-gray-400 text-sm tracking-wide hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href={APPLY_URL}
              className="text-sm px-5 py-1.5 border border-white/30 text-white rounded hover:bg-white/5 transition-colors tracking-wide"
            >
              Apply
            </Link>
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile backdrop */}
      <div
codex/add-nexus-category-and-sidebar-fix-9nas86
        className={`md:hidden fixed inset-0 bg-dark-950 z-[55] transition-opacity duration-300 ${

        className={`md:hidden fixed inset-0 bg-black/50 z-[55] transition-opacity duration-300 ${
 main
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile slide-in drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-dark-950 border-l border-white/10 z-[60] transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-5">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col gap-6 px-8 pt-4">
          {NAV_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="text-white text-lg font-display tracking-widest hover:text-gray-400 transition-colors"
              >
                {item.label}
              </a>
            ) : item.comingSoon ? (
              <span
                key={item.label}
                className="text-gray-600 text-lg font-display tracking-widest"
              >
                {item.label}
                <span className="block text-xs text-gray-500 mt-1">
                  2026.03.03 공개예정
                </span>
              </span>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-white text-lg font-display tracking-widest hover:text-gray-400 transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href={APPLY_URL}
            onClick={() => setMobileOpen(false)}
            className="text-white text-lg font-display tracking-widest hover:text-gray-400 transition-colors"
          >
            Apply
          </Link>
        </div>
      </div>
    </nav>
  );
}
