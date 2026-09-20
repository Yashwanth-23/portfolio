'use client';

import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <a href="#work" className="skip-link">
        Skip to content
      </a>

      <header className="max-w-6xl mx-auto w-full pt-6 pb-6 border-b border-white/5 flex items-center justify-between gap-4 relative z-50">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="text-xs sm:text-sm uppercase tracking-widest font-mono text-zinc-300">
            <span className="sm:hidden font-semibold">YRV</span>
            <span className="hidden sm:inline font-medium">Yashwanth Reddy Vasireddy</span>
          </span>
        </div>

        {/* Desktop Navigation (sm and up) */}
        <nav aria-label="Main navigation" className="hidden sm:flex items-center gap-6 md:gap-8 text-sm font-mono tracking-wider text-zinc-400">
          <a
            href="#work"
            className="hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm px-1 py-0.5"
          >
            Work
          </a>
          <a
            href="#archive"
            className="hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm px-1 py-0.5"
          >
            Archive
          </a>
          <a
            href="https://github.com/Yashwanth-23"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm px-1 py-0.5"
          >
            GitHub
          </a>
          <a
            href="mailto:vryashwanthreddy@gmail.com"
            className="hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-sm px-1 py-0.5"
          >
            Email
          </a>
        </nav>

        {/* Mobile Navigation (under sm): Compact Work link + restrained Menu toggle */}
        <div ref={menuRef} className="flex sm:hidden items-center gap-3 text-xs font-mono tracking-wider">
          <a
            href="#work"
            className="text-zinc-300 hover:text-white px-2 py-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            Work
          </a>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="flex items-center gap-1.5 text-zinc-300 hover:text-white border border-white/10 px-2.5 py-1 rounded bg-zinc-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <span>Menu</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Mobile Dropdown Panel */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl p-2 flex flex-col gap-1 backdrop-blur-md">
              <a
                href="#archive"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Archive
              </a>
              <a
                href="https://github.com/Yashwanth-23"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 flex items-center justify-between"
              >
                <span>GitHub</span>
                <svg className="w-3.5 h-3.5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href="mailto:vryashwanthreddy@gmail.com"
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Email
              </a>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
