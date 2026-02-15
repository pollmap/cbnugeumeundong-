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
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="nav-link text-gray-400 text-sm tracking-wide hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={APPLY_URL}
              className="text-sm px-5 py-1.5 border border-white/30 text-white rounded hover:bg-white/5 transition-colors tracking-wide"
            >
              Apply
            </Link>
          </div>

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
            <Link
              href={APPLY_URL}
              onClick={() => setMobileOpen(false)}
              className="text-white text-2xl font-display tracking-widest hover:text-gray-400 transition-colors"
            >
              Apply
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
