import { RECENT_DOCS, SDG_GOALS, typeColor, typeBg } from '../../data/constants';
import { SkorBadge } from '../SharedUI';

const RecentDocs = () => {
  return (
    <div className="bg-white rounded-[14px] border border-slate-900/5 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="m-0 mb-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Aktivitas Terkini</p>
          <h3 className="m-0 text-[15px] font-bold text-slate-900">Dokumen Terakhir Dianalisis</h3>
        </div>
        <span className="text-xs text-sky-500 font-semibold cursor-pointer hover:text-sky-600 transition-colors">Lihat Semua →</span>
      </div>
      {RECENT_DOCS.map((doc, i) => (
        <div key={i} className={`flex items-center gap-3 py-3 ${i < RECENT_DOCS.length - 1 ? 'border-b border-slate-100' : ''}`}>
          <span 
            className="py-0.75 px-2.5 rounded-md text-[11px] font-bold shrink-0"
            style={{ backgroundColor: typeBg[doc.type], color: typeColor[doc.type] }}
          >
            {doc.type}
          </span>
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
          <span className={`text-[11px] font-semibold py-0.75 px-2.5 rounded-md shrink-0 ${doc.status === 'Selesai' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
            {doc.status}
          </span>
          <span className="text-[11px] text-slate-400 shrink-0">{doc.date}</span>
        </div>
      ))}
    </div>
  );
};

export default RecentDocs;