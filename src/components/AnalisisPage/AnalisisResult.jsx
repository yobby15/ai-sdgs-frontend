import { useSelector, useDispatch } from 'react-redux';
import {
  selectAnalisisStatus,
  selectAnalisisResult,
  selectAnalisisError,
  resetAnalisis,
} from '../../store/analisisSlice';

const SDG_COLORS = {
  1:'#E5243B',2:'#DDA63A',3:'#4C9F38',4:'#C5192D',5:'#FF3A21',
  6:'#26BDE2',7:'#FCC30B',8:'#A21942',9:'#FD6925',10:'#DD1367',
  11:'#FD9D24',12:'#BF8B2E',13:'#3F7E44',14:'#0A97D9',15:'#56C02B',
  16:'#00689D',17:'#19486A',
};

const AnalisisResult = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectAnalisisStatus);
  const result = useSelector(selectAnalisisResult);
  const error = useSelector(selectAnalisisError);

  if (status === 'idle') return null;

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

  if (status === 'loading') return null;

  if (status === 'succeeded' && result) {
    let parsedResult = result.result;
    if (typeof parsedResult === 'string') {
      try { parsedResult = JSON.parse(parsedResult); } catch { /* tetap string */ }
    }

    const sdgList = Array.isArray(parsedResult)
      ? parsedResult
      : parsedResult?.sdg_matches || parsedResult?.results || [];

    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5 mb-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[14px] font-bold text-emerald-700 m-0">✅ Analisis Selesai</p>
            <p className="text-[12px] text-emerald-500 m-0 mt-0.5">
              {result.model_name} · {result.time_execution?.toFixed(1)}s · {result.timestamp?.split('T')[0]}
            </p>
          </div>
          <button
            onClick={() => dispatch(resetAnalisis())}
            className="text-[12px] text-slate-400 underline cursor-pointer bg-transparent border-none"
          >
            Reset
          </button>
        </div>

        {/* ID Request */}
        <p className="text-[11px] text-slate-400 mb-3 font-mono break-all">
          ID: {result.id_request}
        </p>

        {sdgList.length > 0 ? (
          <div className="flex flex-col gap-2">
            {sdgList.slice(0, 10).map((item, i) => {
              const sdgNum = item.sdg_goal || item.goal || item.sdg || item.sdg_number;
              const score = item.score ?? item.skor ?? item.similarity_score;
              const label = item.sdg_label || item.label || item.indicator || item.content || '';
              const color = SDG_COLORS[sdgNum] || '#64748B';

              return (
                <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-4 py-2.5 shadow-sm">
                  {sdgNum && (
                    <span
                      className="text-white text-[11px] font-bold rounded-lg px-2 py-1 shrink-0"
                      style={{ background: color }}
                    >
                      SDG {sdgNum}
                    </span>
                  )}
                  <p className="text-[12px] text-slate-600 flex-1 m-0 line-clamp-2">{label}</p>
                  {score != null && (
                    <span className="text-[12px] font-bold text-slate-500 shrink-0">
                      {typeof score === 'number' ? (score > 1 ? score.toFixed(1) : (score * 100).toFixed(1) + '%') : score}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <pre className="text-[11px] text-slate-600 bg-white rounded-xl p-4 overflow-auto max-h-64 m-0">
            {JSON.stringify(parsedResult, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  return null;
};

export default AnalisisResult;