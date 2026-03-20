import { useState } from 'react';
import { typeColor, typeBg } from '../../data/constants';

const UploadArea = ({ type }) => {
  const [drag, setDrag] = useState(false);

  return (
    <div 
      onDragOver={e => { e.preventDefault(); setDrag(true); }} 
      onDragLeave={() => setDrag(false)} 
      onDrop={e => { e.preventDefault(); setDrag(false); }}
      className={`rounded-2xl border-2 border-dashed py-16 px-8 text-center cursor-pointer transition-all duration-200 mb-5
        ${drag ? 'scale-[1.02]' : 'bg-slate-50 hover:bg-slate-100'}
      `}
      style={{
        borderColor: drag ? typeColor[type] : '#CBD5E1',
        backgroundColor: drag ? typeBg[type] : undefined
      }}
    >
      <div className="text-4xl mb-3 opacity-40">⬆</div>
      <p className="m-0 mb-1.5 text-[15px] font-bold text-slate-700">Seret & lepas file di sini</p>
      <p className="m-0 mb-4 text-[13px] text-slate-400">Format: PDF, DOCX, TXT · Maks. 25 MB</p>
      <button 
        className="py-2.5 px-6 rounded-lg border-none text-[13px] font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
        style={{ background: `linear-gradient(135deg, ${typeColor[type]}, ${typeColor[type]}cc)` }}
      >
        Pilih File
      </button>
    </div>
  );
};

export default UploadArea;