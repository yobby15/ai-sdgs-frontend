import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { typeColor, typeBg } from '../../data/constants';
import {
  submitAnalisis,
  setFile,
  resetAnalisis,
  selectAnalisisStatus,
  selectAnalisisFile,
  selectUploadProgress,
} from '../../store/analisisSlice';

const UploadArea = ({ type }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectAnalisisStatus);
  const fileName = useSelector(selectAnalisisFile);
  const uploadProgress = useSelector(selectUploadProgress);

  const [drag, setDrag] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const inputRef = useRef(null);

  const isLoading = status === 'loading';

  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Hanya file PDF yang didukung.');
      return;
    }
    dispatch(resetAnalisis());
    dispatch(setFile(file.name));

    dispatch(
      submitAnalisis({
        file: file, 
        type: type,
        params: { 
          type_api: import.meta.env.VITE_API_TYPE,
          model_name: import.meta.env.VITE_API_MODEL_NAME,
        },
      })
    );
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    
    dispatch(resetAnalisis());
    dispatch(setFile(urlInput));

    dispatch(
      submitAnalisis({
        file: urlInput,
        type: 'T2',
        params: { 
          type_api: import.meta.env.VITE_API_TYPE,
          model_name: import.meta.env.VITE_API_MODEL_NAME,
        },
      })
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    if (isLoading) return;
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    if (isLoading) return;
    const file = e.target.files[0];
    handleFile(file);
    e.target.value = '';
  };

  if (isLoading) {
    return (
      <div className={'rounded-2xl border-2 border-dashed border-slate-300 py-16 px-8 text-center bg-slate-50 opacity-80 cursor-not-allowed mb-5'}>
        <div className="text-4xl mb-3 animate-bounce">⏳</div>
        <p className="m-0 mb-1.5 text-[15px] font-bold text-slate-700">Menganalisis dokumen/tautan…</p>
        <p className="m-0 mb-4 text-[13px] text-slate-400 truncate max-w-md mx-auto">{fileName}</p>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full max-w-xs mx-auto bg-slate-200 rounded-full h-1.5 mb-3">
            <div
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%`, background: typeColor[type] }}
            />
          </div>
        )}
        <p className="text-[12px] text-slate-400">Proses ini bisa memakan waktu beberapa menit</p>
      </div>
    );
  }

  if (type === 'T2') {
    return (
      <div className="rounded-2xl border-2 border-dashed py-12 px-8 text-center transition-all duration-200 mb-5"
           style={{ borderColor: typeColor[type], backgroundColor: typeBg[type] }}>
        <div className="text-4xl mb-3 opacity-80">🔗</div>
        <p className="m-0 mb-1.5 text-[15px] font-bold text-slate-700">Masukkan Tautan Artikel / Blog</p>
        <p className="m-0 mb-5 text-[13px] text-slate-500">Sistem akan membaca teks dari tautan yang Anda berikan</p>
        
        <form onSubmit={handleUrlSubmit} className="flex gap-2 max-w-lg mx-auto">
          <input 
            type="url" 
            placeholder="https://..." 
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            required
          />
          <button
            type="submit"
            className="py-2.5 px-6 rounded-lg border-none text-[13px] font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
            style={{ background: `linear-gradient(135deg, ${typeColor[type]}, ${typeColor[type]}cc)` }}
          >
            Analisis
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      onClick={() => !isLoading && inputRef.current?.click()}
      className={`rounded-2xl border-2 border-dashed py-16 px-8 text-center transition-all duration-200 mb-5 cursor-pointer
        ${drag ? 'scale-[1.02]' : 'bg-slate-50 hover:bg-slate-100'}
      `}
      style={{
        borderColor: drag ? typeColor[type] : '#CBD5E1',
        backgroundColor: drag ? typeBg[type] : undefined,
      }}
    >
      <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={handleChange} />
      
      <div className="text-4xl mb-3 opacity-40">⬆</div>
      {fileName ? (
        <p className="m-0 mb-1.5 text-[15px] font-bold text-slate-700 truncate max-w-xs mx-auto">{fileName}</p>
      ) : (
        <p className="m-0 mb-1.5 text-[15px] font-bold text-slate-700">Seret & lepas file di sini</p>
      )}
      <p className="m-0 mb-4 text-[13px] text-slate-400">Format: PDF · Maks. 25 MB</p>
      <button
        className="py-2.5 px-6 rounded-lg border-none text-[13px] font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
        style={{ background: `linear-gradient(135deg, ${typeColor[type]}, ${typeColor[type]}cc)` }}
        onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
      >
        Pilih File
      </button>
    </div>
  );
};

export default UploadArea;