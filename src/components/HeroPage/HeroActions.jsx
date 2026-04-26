import { Link } from 'react-router-dom';

const HeroActions = () => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-14">
      <Link 
        to="/analisis"
        className="flex items-center gap-2 py-3.5 px-7 rounded-xl bg-linear-to-br from-slate-900 to-slate-800 text-white text-[15px] font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 cursor-pointer no-underline"
      >
        Unggah Dokumen <span className="text-base">→</span>
      </Link>
      <Link 
        to="/publikasi"
        className="py-3.5 px-7 rounded-xl bg-white border border-slate-300 text-slate-700 text-[15px] font-semibold shadow-sm hover:bg-slate-50 transition-all duration-200 cursor-pointer no-underline"
      >
        Lihat Publikasi
      </Link>
    </div>
  );
};

export default HeroActions;