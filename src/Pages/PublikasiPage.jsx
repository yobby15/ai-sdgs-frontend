import { useState } from 'react';
import { motion } from 'motion/react';
import { useSelector } from 'react-redux';
import { selectAnalisisHistory } from '../store/analisisSlice';
import PublikasiHeader from '../components/PublikasiPage/PublikasiHeader';
import PublikasiFilter from '../components/PublikasiPage/PublikasiFilter';
import PublikasiList from '../components/PublikasiPage/PublikasiList';

const formatDoc = (doc) => {
  let aiData = doc.result || doc;
  if (typeof aiData === 'string') {
    try {
      aiData = JSON.parse(aiData);
    } catch {
      // ignore
    }
  }

  let score = 0;
  if (aiData.type_result === 'strong_evidence') score = 95;
  else if (aiData.type_result === 'moderate_evidence') score = 75;
  else if (aiData.type_result) score = 50;
  else score = doc.skor || 0;

  const sdgs = [];
  if (aiData.SDG_number) sdgs.push(parseInt(aiData.SDG_number, 10));
  if (aiData.additional_kwargs?.additional_sdg) {
    aiData.additional_kwargs.additional_sdg.forEach(s => sdgs.push(parseInt(s.SDG_number, 10)));
  }

  // Dedup sdgs
  const uniqueSdgs = [...new Set(sdgs)];

  return {
    id: doc.job_id || doc.name,
    name: doc.fileName || doc.name || 'Dokumen Analisis',
    type: doc.documentType || doc.type || 'T1',
    skor: score,
    sdgs: uniqueSdgs.length > 0 ? uniqueSdgs : (doc.sdgs || []),
    date: doc.analyzedAt
      ? new Date(doc.analyzedAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
      : doc.date,
    originalData: doc
  };
};

const PublikasiPage = () => {
  const [filter, setFilter] = useState('Semua');
  const history = useSelector(selectAnalisisHistory);
  
  const formattedDocs = history.map(formatDoc);

  const filtered = filter === 'Semua' 
    ? formattedDocs
    : filter === 'Skor Tinggi' 
      ? formattedDocs.filter(d => d.skor >= 80)
      : formattedDocs.filter(d => d.type === filter);

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