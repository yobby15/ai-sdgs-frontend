import { motion } from 'motion/react';

const TargetCard = ({ g, variants }) => {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ scale: 1.04, y: -4 }}
      className="group rounded-xl p-4 cursor-pointer bg-white border border-slate-200 transition-all duration-300 overflow-hidden relative"
      style={{ 
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        '--sdg-color': g.color 
      }}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-(--sdg-color)"
      />
      
      <div className="relative z-10">
        <div 
          className="text-3xl font-black leading-none mb-2 transition-colors duration-300 text-(--sdg-color) group-hover:text-white"
        >
          {g.n}
        </div>
        
        <div className="text-xs font-bold leading-tight text-slate-900 group-hover:text-white transition-colors duration-300">
          {g.label}
        </div>
        
        <div className="mt-2 text-[10px] font-semibold opacity-60 uppercase tracking-wider text-slate-500 group-hover:text-white transition-colors duration-300">
          <span className="group-hover:hidden">UN SDGs 2030</span>
          <span className="hidden group-hover:inline">Lihat Dokumen →</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TargetCard;