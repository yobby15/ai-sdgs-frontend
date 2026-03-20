export const SkorBadge = ({ skor }) => {
  let colorClass = '';
  if (skor >= 80) colorClass = 'text-emerald-600 bg-emerald-100';
  else if (skor >= 65) colorClass = 'text-amber-600 bg-amber-100';
  else colorClass = 'text-red-500 bg-red-100';

  return (
    <span className={`px-2.5 py-0.75 rounded-full text-xs font-bold ${colorClass}`}>
      {skor}
    </span>
  );
};

export const StatCard = ({ label, value, sub, accent, icon }) => {
  return (
    <div className="bg-white rounded-[14px] border border-slate-900/5 py-5 px-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          {label}
        </span>
        <span 
          className="text-lg py-1 px-2 rounded-lg" 
          style={{ backgroundColor: `${accent}22`, color: accent }}
        >
          {icon}
        </span>
      </div>
      <div className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none mb-1.5">
        {value}
      </div>
      <div className="text-xs text-slate-500">{sub}</div>
    </div>
  );
};

export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-300 rounded-xl py-2.5 px-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
      <p className="m-0 text-[13px] font-bold text-slate-900">{label}</p>
      {payload.map(p => (
        <p key={p.name} className="m-0 mt-0.5 text-xs" style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};