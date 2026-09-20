import HeroMotif from './HeroMotif';

export default function Hero() {
  return (
    <section id="hero" className="max-w-6xl mx-auto pt-10 pb-16 sm:pt-14 sm:pb-24 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Semantic Identity, Thesis, and Actions */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6 text-xs font-mono tracking-widest text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            <span>BASED IN UNITED STATES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-[1.08]">
            Yashwanth Reddy Vasireddy
          </h1>

          <p className="text-base sm:text-xl md:text-2xl font-mono text-zinc-200 tracking-tight mb-6 sm:mb-8 font-medium">
            <span className="inline-block">AI</span>
            <span className="text-zinc-500 mx-1.5 sm:mx-2">·</span>
            <span className="inline-block">Machine Learning</span>
            <span className="text-zinc-500 mx-1.5 sm:mx-2">·</span>
            <span className="inline-block">Data Science</span>
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl leading-relaxed sm:leading-relaxed mb-8 sm:mb-12 font-normal">
            I work across models, data, and software systems, paying close attention to where they fail. I trust results when observed behavior and verifiable evidence agree.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-white text-zinc-950 font-semibold text-sm sm:text-base hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090a0c] shadow-sm"
            >
              <span>View Selected Works</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            <a
              href="https://drive.google.com/file/d/1liq96-1banlm9ryEnPRa_LPTU2TkeNg2/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full border border-zinc-700 bg-zinc-900/50 text-zinc-200 font-semibold text-sm sm:text-base hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090a0c]"
            >
              <span>Resume</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Hero Motif Island (hidden on narrow mobile <380px to avoid crowding story) */}
        <div className="hidden min-[380px]:flex lg:col-span-5 items-center justify-center lg:justify-end w-full mt-6 lg:mt-0">
          <HeroMotif />
        </div>
      </div>
    </section>
  );
}
