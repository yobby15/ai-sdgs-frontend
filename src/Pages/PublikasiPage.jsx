import { useState } from 'react';
import { motion } from 'motion/react';
import { RECENT_DOCS } from '../data/constants';
import PublikasiHeader from '../components/PublikasiPage/PublikasiHeader';
import PublikasiFilter from '../components/PublikasiPage/PublikasiFilter';
import PublikasiList from '../components/PublikasiPage/PublikasiList';

const PublikasiPage = () => {
  const [filter, setFilter] = useState('Semua');
  
  const filtered = filter === 'Semua' 
    ? RECENT_DOCS 
    : filter === 'Skor Tinggi' 
      ? RECENT_DOCS.filter(d => d.skor >= 80) 
      : RECENT_DOCS.filter(d => d.type === filter);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
      className="relative z-10 pt-10 pb-16 px-8 max-w-275 mx-auto"
    >
      <PublikasiHeader />
      
      <div className="bg-white rounded-[14px] border border-slate-900/5 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <PublikasiFilter filter={filter} setFilter={setFilter} />
        
        <PublikasiList filtered={filtered} />
      </div>
    </motion.div>
  );
};

export default PublikasiPage;