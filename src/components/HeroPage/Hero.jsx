import { motion } from 'motion/react';
import HeroActions from './HeroActions';
import HeroStats from './HeroStats';

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative z-10 max-w-215 mx-auto pt-24 px-6 pb-18 text-center"
    >
      {/* Badge AI */}
      <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white border border-slate-300 text-xs font-semibold text-slate-600 tracking-wider uppercase mb-8 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
        Powered by AI · THE/QS Compliant
      </div>

      {/* Main Headline */}
      <h1 className="flex flex-col gap-1 mb-6">
        <span className="text-[clamp(28px,5vw,52px)] font-bold text-slate-900 tracking-tight leading-tight">
          AI SDGs Analyzer:
        </span>
        <span className="text-[clamp(26px,4.5vw,48px)] font-bold text-slate-700 tracking-tight leading-snug">
          Optimasi Dokumen &{' '}
          <span className="bg-linear-to-r from-sky-500 via-emerald-500 to-violet-500 bg-clip-text text-transparent">
            Publikasi Akademik
          </span>
        </span>
      </h1>

      {/* Description */}
      <p className="text-[17px] leading-relaxed text-slate-500 max-w-155 mx-auto mb-10 font-normal">
        Tingkatkan peringkat THE/QS melalui analisis dokumen berbasis AI untuk
        kesesuaian instrumen <strong className="text-slate-900">Sustainable Development Goals</strong>
      </p>

      {/* Komponen Eksternal */}
      <HeroActions />
      <HeroStats />
      
    </motion.section>
  );
};

export default Hero;