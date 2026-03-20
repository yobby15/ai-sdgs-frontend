const PublikasiFilter = ({ filter, setFilter }) => {
  const filterOptions = ['Semua', 'T1', 'T2', 'T3', 'Skor Tinggi'];

  return (
    <div className="flex gap-2 mb-5 flex-wrap">
      {filterOptions.map(f => (
        <button 
          key={f} 
          onClick={() => setFilter(f)} 
          className={`py-1.5 px-3.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer
            ${filter === f 
              ? 'bg-slate-900 text-white border-transparent' 
              : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'}
          `}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default PublikasiFilter;