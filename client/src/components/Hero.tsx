import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F7F5F0] via-[#F7F5F0] to-[#F2F0EB] grain">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(26,26,26,0.02)]" />
        
        {/* Accent lines */}
        <div className="absolute top-20 right-10 w-32 h-32 border-2 border-[#B8963E] opacity-10 rotate-45" />
        <div className="absolute bottom-32 left-10 w-24 h-24 border-2 border-[#2C3E50] opacity-10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
        {/* Eyebrow */}
        <div className="inline-block">
          <p className="text-xs tracking-widest uppercase text-[#2C3E50] font-semibold">
            Livewell by James Bell
          </p>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#1A1A1A] leading-tight">
          Essays on faith, culture, and the Christian life.
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#2C3E50] max-w-2xl mx-auto leading-relaxed font-serif">
          Theological depth meets prophetic witness. Explore faith that challenges, transforms, and actually works in real life.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/reading-paths">
            <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#1A1A1A] text-[#F7F5F0] font-semibold text-sm tracking-wide hover:bg-[#2C3E50] transition-colors duration-300">
              Start With Pillars
              <ArrowRight size={18} />
            </button>
          </Link>
          <Link href="/writing">
            <button className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#1A1A1A] text-[#1A1A1A] font-semibold text-sm tracking-wide hover:bg-[#1A1A1A] hover:text-[#F7F5F0] transition-colors duration-300">
              Explore All Content
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 pt-16 border-t border-[#B8963E] border-opacity-30">
          <div>
            <p className="text-2xl md:text-3xl font-bold text-[#B8963E]">182+</p>
            <p className="text-xs uppercase tracking-widest text-[#2C3E50] mt-2">Essays</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-[#B8963E]">14</p>
            <p className="text-xs uppercase tracking-widest text-[#2C3E50] mt-2">Books</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold text-[#B8963E]">5</p>
            <p className="text-xs uppercase tracking-widest text-[#2C3E50] mt-2">Pillars</p>
          </div>
        </div>
      </div>
    </section>
  );
}
