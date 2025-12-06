'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:from-purple-300 hover:to-pink-300 transition-all">
            JobBoard
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/jobs" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
              Browse Jobs
            </Link>
            <Link href="/post-job" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
              Post a Job
            </Link>

            <SignedOut>
              <Link href="/sign-in" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-bold hover:from-purple-500 hover:to-pink-500 transition-all hover:scale-105 shadow-lg shadow-purple-500/30"
              >
                Sign up
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}
