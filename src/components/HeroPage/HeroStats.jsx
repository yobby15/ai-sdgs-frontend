const STATS_DATA = [
  { val: '17', label: 'SDG Goals' },
  { val: '3', label: 'Tipe Dokumen' },
  { val: '99.1%', label: 'Akurasi AI' },
  { val: 'THE/QS', label: 'Standard' },
];

const HeroStats = () => {
  return (
    <div className="flex justify-center bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm max-w-140 mx-auto divide-x divide-slate-200">
      {STATS_DATA.map((s) => (
        <div key={s.label} className="flex-1 py-5 px-4 flex flex-col items-center gap-1">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">{s.val}</span>
          <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">{s.label}</span>
        </div>
      ))}
    </div>
  );
};

export default HeroStats;