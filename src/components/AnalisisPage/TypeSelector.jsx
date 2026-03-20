import { CARDS } from '../../data/constants';

const TypeSelector = ({ type, setType }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {CARDS.map(c => (
        <button 
          key={c.tag} 
          onClick={() => setType(c.tag)} 
          className={`flex-1 py-3.5 px-2.5 rounded-xl cursor-pointer border-2 transition-all duration-200 text-center
            ${type === c.tag ? 'border-sky-500 shadow-sm' : 'border-slate-900/5 bg-white hover:bg-slate-50'}
          `}
          style={{ 
            borderColor: type === c.tag ? c.accent : undefined,
            backgroundColor: type === c.tag ? c.accentLight : undefined
          }}
        >
          <div className="text-lg mb-1">{c.icon}</div>
          <div className={`text-[13px] font-bold ${type === c.tag ? '' : 'text-slate-700'}`} style={{ color: type === c.tag ? c.accent : undefined }}>
            {c.tag}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {c.tag === 'T1' ? 'Dokumen Internal' : c.tag === 'T2' ? 'Blog & Opini' : 'Publikasi Ilmiah'}
          </div>
        </button>
      ))}
    </div>
  );
};

export default TypeSelector;