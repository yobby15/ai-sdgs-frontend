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
        file,
        params: { type_model: 'gemini', model_name: 'gemini-2.5-flash' },
      })
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
    e.target.value = '';
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={handleDrop}
      onClick={() => !isLoading && inputRef.current?.click()}
      className={`rounded-2xl border-2 border-dashed py-16 px-8 text-center transition-all duration-200 mb-5
        ${isLoading ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}
        ${drag ? 'scale-[1.02]' : 'bg-slate-50 hover:bg-slate-100'}
      `}
      style={{
        borderColor: drag ? typeColor[type] : '#CBD5E1',
        backgroundColor: drag ? typeBg[type] : undefined,
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={handleChange}
        disabled={isLoading}
      />

      {isLoading ? (
        <>
          <div className="text-4xl mb-3 animate-bounce">⏳</div>
          <p className="m-0 mb-1.5 text-[15px] font-bold text-slate-700">Menganalisis dokumen…</p>
          <p className="m-0 mb-4 text-[13px] text-slate-400">{fileName}</p>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full max-w-xs mx-auto bg-slate-200 rounded-full h-1.5 mb-3">
              <div
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%`, background: typeColor[type] }}
              />
            </div>
          )}
          <p className="text-[12px] text-slate-400">Proses ini bisa memakan waktu beberapa menit</p>
        </>
      ) : (
        <>
          <div className="text-4xl mb-3 opacity-40">⬆</div>
          {fileName ? (
            <p className="m-0 mb-1.5 text-[15px] font-bold text-slate-700">{fileName}</p>
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
        </>
      )}
    </div>
  );
};

export default UploadArea;