import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ card, variants }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-slate-900/5 p-8 cursor-pointer overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: isHovered ? '#F8FAFC' : '#FFFFFF',
        borderColor: isHovered ? card.accent : 'rgba(15, 23, 42, 0.05)',
        boxShadow: isHovered ? `0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px ${card.accent}22` : '0 4px 24px rgba(0,0,0,0.06)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, ${card.accent}, ${card.accent}88)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      <div className="flex justify-between items-center mb-5">
        <div
          className="inline-flex py-1 px-3 rounded-md text-xs font-bold tracking-wider"
          style={{ backgroundColor: card.accentLight, color: card.accent }}
        >
          {card.tag}
        </div>
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-bold"
          style={{ color: card.accent, backgroundColor: card.accentLight }}
        >
          {card.icon}
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 tracking-tight m-0 mb-1 leading-snug">
        {card.title}
      </h3>
      <p className="text-[11.5px] font-semibold text-slate-400 uppercase tracking-wider m-0 mb-4">
        {card.subtitle}
      </p>
      <p className="text-sm leading-relaxed text-slate-500 m-0 mb-6">
        {card.desc}
      </p>

      <div
        className="flex flex-col gap-0.5 py-3.5 px-4 rounded-xl border mb-5"
        style={{ borderColor: `${card.accent}22`, backgroundColor: card.accentLight }}
      >
        <span className="text-xl font-bold tracking-tight" style={{ color: card.accent }}>
          {card.stat}
        </span>
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {card.statLabel}
        </span>
      </div>

      <Link
        to="/analisis"
        className="block w-full py-3 px-4 rounded-lg border text-[13.5px] font-semibold text-center tracking-tight transition-all duration-200 no-underline"
        style={{
          color: card.accent,
          borderColor: `${card.accent}33`,
          backgroundColor: isHovered ? card.accentLight : 'transparent',
        }}
      >
        Mulai Analisis {card.tag} →
      </Link>
    </motion.div>
  );
};

export default FeatureCard;