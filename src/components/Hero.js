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
            <span className="inline-block">Software Development</span>
            <span className="text-zinc-500 mx-1.5 sm:mx-2">·</span>
            <span className="inline-block">Data Science</span>
          </p>

          <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-2xl leading-relaxed sm:leading-relaxed mb-8 sm:mb-12 font-normal">
            I work across models, data, and software systems, paying close attention to where they fail. I trust results when observed behavior and verifiable evidence agree.
          </p>
        </div>

        {/* Right Column: Hero Motif Island (hidden on narrow mobile <380px to avoid crowding story) */}
        <div className="hidden min-[380px]:flex lg:col-span-5 items-center justify-center lg:justify-end w-full mt-6 lg:mt-0">
          <HeroMotif />
        </div>
      </div>
    </section>
  );
}
