import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';

const PublikasiModal = ({ selectedDoc, onClose }) => {
  if (!selectedDoc) return null;

  let aiData = selectedDoc.originalData.result || selectedDoc.originalData;
  if (typeof aiData === 'string') {
    try { aiData = JSON.parse(aiData); } catch { /* abaikan */ }
  }

  const { 
    resume_document, 
    type_result, 
    SDG_number, 
    SDG_details,
    additional_kwargs
  } = aiData;

  const isStrongEvidence = type_result === 'strong_evidence';
  const badgeClass = isStrongEvidence 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-orange-100 text-orange-800 border-orange-200';

  return createPortal(
    <AnimatePresence>
      {selectedDoc && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex-1 min-w-0 pr-4">
                <h3 className="text-[15px] font-bold text-slate-800 m-0 truncate">
                  {selectedDoc.name}
                </h3>
                <p className="text-[12px] text-slate-500 m-0 mt-1">
                  Dianalisis pada: {selectedDoc.date}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 transition-colors cursor-pointer border-none shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Content Modal */}
            <div className="p-6 overflow-y-auto flex-1 bg-white">
              
              <div className="flex items-start justify-between mb-5 border-b border-emerald-100 pb-4">
                <div>
                  <p className="text-[15px] font-bold text-emerald-800 m-0 flex items-center gap-2">
                    ✅ Hasil Evaluasi 
                    <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full border border-emerald-200">
                      Skor: {selectedDoc.skor}
                    </span>
                  </p>
                  <p className="text-[12px] text-emerald-600 m-0 mt-1.5">
                    SDG Utama Terdeteksi: <span className="font-bold">SDG {SDG_number || 'N/A'}</span>
                  </p>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  {type_result && (
                    <div className={`px-3 py-1 rounded-full border text-[11px] font-bold uppercase ${badgeClass}`}>
                      {type_result.replace('_', ' ')}
                    </div>
                  )}
                </div>
              </div>

              {resume_document && (
                <div className="mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[12px] font-bold text-slate-600 mb-2">📝 Resume Dokumen</p>
                  <p className="text-[13px] text-slate-700 m-0 leading-relaxed">{resume_document}</p>
                </div>
              )}

              <div className="flex flex-col gap-4 mb-6">
                <p className="text-[13px] font-bold text-slate-800 m-0">Detail Metrik & Indikator</p>
                
                {SDG_details && SDG_details.length > 0 ? (
                  SDG_details.map((detail, idx) => (
                    <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                        <p className="text-[13px] font-bold text-slate-700 m-0">
                          Metrik {detail.ID_Metric}: {detail.metric_name || '-'}
                        </p>
                      </div>
                      
                      <div className="p-4 flex flex-col gap-3">
                        {detail.indicators?.map((ind, i) => {
                          const score = ind.score_relevancy ?? 0;
                          
                          return (
                            <div key={i} className="flex flex-col gap-2">
                              <div className="flex items-start justify-between">
                                <p className="text-[13px] font-semibold text-slate-800 m-0 w-3/4">
                                  {ind.ID_Indicator} - {ind.indicator_name || '-'}
                                </p>
                                <span className={`text-[12px] font-bold px-2 py-1 rounded ${score >= 1 ? 'bg-green-100 text-green-700' : score >= 0.5 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                  Skor: {score}
                                </span>
                              </div>
                              
                              {ind.justification && (
                                <p className="text-[12px] text-slate-600 m-0 italic border-l-2 border-slate-300 pl-2">
                                  "{ind.justification}"
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[13px] text-slate-500 italic bg-slate-50 p-4 rounded-xl border border-slate-100">Tidak ada detail metrik yang ditemukan.</p>
                )}
              </div>

              {additional_kwargs && additional_kwargs.additional_sdg && additional_kwargs.additional_sdg.length > 0 && (
                <div className="mb-5 bg-sky-50 p-4 rounded-xl border border-sky-100">
                  <p className="text-[13px] font-bold text-sky-800 mb-3 flex items-center gap-2">
                    <span>🔗</span> Potensi Keterkaitan SDG Lain
                  </p>
                  <div className="flex flex-col gap-3">
                    {additional_kwargs.additional_sdg.map((sdg_lain, idx) => (
                      <div key={idx} className="bg-white border border-sky-100 rounded-lg p-3 shadow-sm">
                        <p className="text-[12px] font-bold text-sky-700 m-0 mb-1">
                          SDG {sdg_lain.SDG_number}
                        </p>
                        <p className="text-[12px] text-slate-600 m-0 leading-relaxed">
                          {sdg_lain.SDG_details}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {additional_kwargs && additional_kwargs.note && (
                <div className="mt-2 bg-amber-50 border border-amber-200 p-4 rounded-xl flex gap-3 items-start shadow-sm">
                  <span className="text-[16px]">💡</span>
                  <div>
                    <p className="text-[13px] font-bold text-amber-800 m-0 mb-1">Catatan & Saran Perbaikan</p>
                    <p className="text-[13px] text-amber-700 m-0 leading-relaxed">
                      {additional_kwargs.note}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default PublikasiModal;