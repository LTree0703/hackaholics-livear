"use client";

import Link from "next/link";
import { useState } from "react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-emerald-800 text-emerald-100 px-6 py-4 h-16">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">LiveAR</div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/tours" className="hover:text-white transition-colors">
            Tours
          </Link>
          <Link href="/demo" className="hover:text-white transition-colors">
            Demo
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          <SignedIn>
            <UserButton />
          </SignedIn>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-emerald-100 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-emerald-700">
          <div className="flex flex-col gap-3 pt-4">
            <Link 
              href="/" 
              className="hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/tours" 
              className="hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tours
            </Link>
            <Link 
              href="/demo" 
              className="hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
