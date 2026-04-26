import { motion, AnimatePresence } from 'motion/react';
import { SDG_GOALS, typeColor, typeBg } from '../../data/constants';
import { SkorBadge } from '../SharedUI';

const PublikasiList = ({ filtered, onSelectDoc }) => {
  return (
    <div className="flex flex-col">
      <AnimatePresence mode="popLayout">
        {filtered.map((doc, i) => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            key={doc.name} 
            className={`flex items-center gap-3 py-3.5 ${i < filtered.length - 1 ? 'border-b border-slate-100' : ''}`}
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0"
              style={{ backgroundColor: typeBg[doc.type], color: typeColor[doc.type] }}
            >
              {doc.type}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="m-0 text-[13px] font-semibold text-slate-900 truncate">{doc.name}</p>
              <div className="flex gap-1 mt-1">
                {doc.sdgs.map(n => { 
                  const g = SDG_GOALS.find(s => s.n === n); 
                  return (
                    <span key={n} className="text-[10px] font-bold py-px px-1.5 rounded-sm" style={{ backgroundColor: g.color + '18', color: g.color }}>
                      SDG {n}
                    </span>
                  ); 
                })}
              </div>
            </div>
            <SkorBadge skor={doc.skor} />
            <span className="text-[11px] text-slate-400 shrink-0 hidden sm:block w-20 text-right">{doc.date}</span>
            <button 
              onClick={() => onSelectDoc(doc)}
              className="py-1.5 px-3.5 rounded-lg border-none bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-semibold transition-colors cursor-pointer shrink-0"
            >
              👁 Lihat Analisis
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {filtered.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center text-slate-400 text-sm">
          Tidak ada dokumen untuk filter ini.
        </motion.div>
      )}
    </div>
  );
};

export default PublikasiList;