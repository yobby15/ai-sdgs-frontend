const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-end flex-wrap gap-3 mb-7">
      <div>
        <p className="m-0 mb-1 text-[11px] font-bold text-sky-500 uppercase tracking-widest">Ringkasan Capaian</p>
        <h1 className="m-0 text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard SDGs Universitas</h1>
      </div>
      <div className="flex gap-2">
        <button className="py-1.5 px-4 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
          ↓ Ekspor
        </button>
        <button className="py-1.5 px-4 rounded-lg border-none bg-linear-to-br from-sky-500 to-sky-700 text-xs font-bold text-white shadow-[0_2px_8px_rgba(14,165,233,0.35)] hover:-translate-y-0.5 transition-transform cursor-pointer">
          + Unggah Dokumen
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;