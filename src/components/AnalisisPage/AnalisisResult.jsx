import { useSelector, useDispatch } from 'react-redux';
import {
  selectAnalisisStatus,
  selectAnalisisResult,
  selectAnalisisError,
  resetAnalisis,
} from '../../store/analisisSlice';

const CLASSIFICATION_COLORS = {
  'T1': 'bg-blue-100 text-blue-700 border-blue-200',
  'T2': 'bg-purple-100 text-purple-700 border-purple-200',
  'T3': 'bg-orange-100 text-orange-700 border-orange-200',
};

const AnalisisResult = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectAnalisisStatus);
  const result = useSelector(selectAnalisisResult);
  const error = useSelector(selectAnalisisError);

  if (status === 'idle' || status === 'loading') return null;

  if (status === 'failed') {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 mb-5">
        <p className="text-[14px] font-bold text-red-600 mb-1">❌ Analisis Gagal</p>
        <p className="text-[13px] text-red-500 m-0">{error}</p>
        <button
          onClick={() => dispatch(resetAnalisis())}
          className="mt-3 text-[12px] text-red-400 underline cursor-pointer bg-transparent border-none"
        >
          Coba lagi
        </button>
      </div>
    );
  }

  if (status === 'succeeded' && result) {
    let aiData = result.result;
    
    if (typeof aiData === 'string') {
      try { aiData = JSON.parse(aiData); } catch { /* abaikan */ }
    }

    const { 
      resume_document, 
      document_classification, 
      evidence_type, 
      SDG_number, 
      SDG_details 
    } = aiData;

    const badgeClass = CLASSIFICATION_COLORS[document_classification] || 'bg-slate-100 text-slate-700 border-slate-200';

    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5 mb-5">
        
        {/* Header Section */}
        <div className="flex items-start justify-between mb-4 border-b border-emerald-100 pb-3">
          <div>
            <p className="text-[15px] font-bold text-emerald-800 m-0">✅ Hasil Evaluasi THE Impact Ratings</p>
            <p className="text-[12px] text-emerald-600 m-0 mt-1">
              SDG Terdeteksi: <span className="font-bold">SDG {SDG_number || 'N/A'}</span>
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
             <button
              onClick={() => dispatch(resetAnalisis())}
              className="text-[12px] font-medium text-slate-500 hover:text-slate-700 underline cursor-pointer bg-transparent border-none"
            >
              Uji Dokumen Baru
            </button>
            {document_classification && (
              <div className={`px-3 py-1 rounded-full border text-[11px] font-bold uppercase ${badgeClass}`}>
                {document_classification} • {evidence_type?.replace('_', ' ')}
              </div>
            )}
          </div>
        </div>

        {resume_document && (
          <div className="mb-5 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <p className="text-[12px] font-bold text-slate-500 mb-1">📝 Resume Dokumen</p>
            <p className="text-[13px] text-slate-700 m-0 leading-relaxed">{resume_document}</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {SDG_details && SDG_details.length > 0 ? (
            SDG_details.map((detail, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200">
                  <p className="text-[13px] font-bold text-slate-700 m-0">
                    Metrik {detail.ID_Metric}: {detail.metric_name}
                  </p>
                </div>
                
                <div className="p-4 flex flex-col gap-3">
                  {detail.indicators?.map((ind, i) => {
                    const score = ind.score_relevancy ?? ind.evaluation_score ?? 0;
                    
                    return (
                      <div key={i} className="flex flex-col gap-2">
                        <div className="flex items-start justify-between">
                          <p className="text-[13px] font-semibold text-slate-800 m-0 w-3/4">
                            {ind.ID_Indicator} - {ind.indicator_name}
                          </p>
                          <span className={`text-[12px] font-bold px-2 py-1 rounded ${score >= 1 ? 'bg-green-100 text-green-700' : score >= 0.5 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            Skor: {score}
                          </span>
                        </div>
                        
                        <p className="text-[12px] text-slate-600 m-0 italic border-l-2 border-slate-300 pl-2">
                          "{ind.justification}"
                        </p>

                        {ind.recommendation_to_improve && score < 1 && (
                          <div className="mt-2 bg-amber-50 border border-amber-200 p-3 rounded-lg flex gap-2 items-start">
                            <span className="text-[14px]">💡</span>
                            <div>
                              <p className="text-[12px] font-bold text-amber-800 m-0 mb-0.5">Rekomendasi Perbaikan:</p>
                              <p className="text-[12px] text-amber-700 m-0 leading-tight">
                                {ind.recommendation_to_improve}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <p className="text-[13px] text-slate-500 italic">Tidak ada detail metrik yang ditemukan.</p>
          )}
        </div>

      </div>
    );
  }

  return null;
};

export default AnalisisResult;