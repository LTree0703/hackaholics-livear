"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-emerald-800 text-emerald-100 px-6 py-4 h-16">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-semibold">LiveAR Cathay</div>
        <div className="flex gap-6 items-center">
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
      </div>
    </nav>
  );
}
