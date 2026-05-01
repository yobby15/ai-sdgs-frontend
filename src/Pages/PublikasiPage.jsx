import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectAnalisisHistory, 
  loadHistoryData, 
  selectAnalisisHistoryStatus 
} from '../store/analisisSlice';
import PublikasiHeader from '../components/PublikasiPage/PublikasiHeader';
import PublikasiFilter from '../components/PublikasiPage/PublikasiFilter';
import PublikasiList from '../components/PublikasiPage/PublikasiList';
import PublikasiModal from '../components/PublikasiPage/PublikasiModal';

const formatDoc = (doc, index) => {
  let aiData = doc.result || doc;
  if (typeof aiData === 'string') {
    try { 
      aiData = JSON.parse(aiData); 
    } catch {
      // ignore
    }
  }
  
  let score = 0;
  let totalScore = 0;
  let count = 0;

  if (aiData.SDG_details && Array.isArray(aiData.SDG_details)) {
    aiData.SDG_details.forEach(metric => {
      if (metric.indicators && Array.isArray(metric.indicators)) {
        metric.indicators.forEach(ind => {
          if (ind.score_relevancy !== undefined && ind.score_relevancy !== null) {
            totalScore += Number(ind.score_relevancy);
            count++;
          }
        });
      }
    });
  }

  if (count > 0) {
    score = Number((totalScore / count).toFixed(2));
  } else {
    score = doc.skor || 0;
  }
  
  const sdgs = [];
  if (aiData.SDG_number) sdgs.push(parseInt(aiData.SDG_number, 10));
  if (aiData.additional_kwargs?.additional_sdg) {
    aiData.additional_kwargs.additional_sdg.forEach(s => sdgs.push(parseInt(s.SDG_number, 10)));
  }
  
  const uniqueSdgs = [...new Set(sdgs)];
  
  return {
    id: doc.id || doc.id_request || doc.job_id || `${doc.source || doc.name}-${index}`,
    
    name: doc.source || doc.fileName || doc.name || 'Dokumen Analisis',
    type: doc.documentType || doc.type || 'T1',
    skor: score,
    sdgs: uniqueSdgs.length > 0 ? uniqueSdgs : (doc.sdgs || []),
    date: doc.timestamp || doc.analyzedAt
      ? new Date(doc.timestamp || doc.analyzedAt).toLocaleDateString('id-ID', { 
          day: '2-digit', month: 'short', year: 'numeric' 
        })
      : doc.date || '-',
    originalData: doc
  };
};

const PublikasiPage = () => {
  const dispatch = useDispatch(); 
  const [filter, setFilter] = useState('Semua');
  const [selectedDoc, setSelectedDoc] = useState(null);
  const history = useSelector(selectAnalisisHistory);
  const historyStatus = useSelector(selectAnalisisHistoryStatus);
  
  useEffect(() => {
    if (historyStatus === 'idle') {
      dispatch(loadHistoryData());
    }
  }, [historyStatus, dispatch]);
  
  const formattedDocs = history.map(formatDoc);

  const filtered = filter === 'Semua' 
    ? formattedDocs 
    : filter === 'Skor Tinggi' 
      ? formattedDocs.filter(d => d.skor >= 0.8)
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
        
        {historyStatus === 'loading' ? (
          <div className="text-center py-10">Memuat Data dari Database...</div>
        ) : (
          <PublikasiList filtered={filtered} onSelectDoc={setSelectedDoc} />
        )}
      </div>

      <PublikasiModal selectedDoc={selectedDoc} onClose={() => setSelectedDoc(null)} />
    </motion.div>
  );
};

export default PublikasiPage;