import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { RADAR_DATA, SDG_GOALS } from '../../data/constants';
import { CustomTooltip } from '../SharedUI';

const ChartsRowTwo = () => {
  const covered = [1, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {/* Radar Chart */}
      <div className="bg-white rounded-[14px] border border-slate-900/5 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <p className="m-0 mb-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Komparasi Tipe</p>
        <h3 className="m-0 mb-2 text-[15px] font-bold text-slate-900">Radar Skor T1 / T2 / T3</h3>
        <div className="flex gap-3.5 mb-2">
          {[['T1', '#0EA5E9'], ['T2', '#10B981'], ['T3', '#8B5CF6']].map(([t, c]) => (
            <div key={t} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: c }} />
              <span className="text-xs text-slate-500 font-semibold">{t}</span>
            </div>
          ))}
        </div>
        <div className="h-53.75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={RADAR_DATA} cx="50%" cy="50%" outerRadius={80}>
              <PolarGrid stroke="#F1F5F9" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748B' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: '#CBD5E1' }} />
              <Radar name="T1" dataKey="T1" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="T2" dataKey="T2" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="T3" dataKey="T3" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.15} strokeWidth={2} />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Coverage Map */}
      <div className="bg-white rounded-[14px] border border-slate-900/5 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <p className="m-0 mb-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Peta Cakupan</p>
        <h3 className="m-0 mb-3.5 text-[15px] font-bold text-slate-900">17 SDGs Coverage</h3>
        <div className="grid grid-cols-5 gap-1.5">
          {SDG_GOALS.map(g => {
            const ok = covered.includes(g.n);
            return (
              <div 
                key={g.n} title={g.label} 
                className={`aspect-square rounded-lg flex items-center justify-center text-[13px] font-extrabold transition-all duration-300
                  ${ok ? 'text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)]' : 'bg-slate-100 text-slate-300'}
                `}
                style={{ backgroundColor: ok ? g.color : undefined, boxShadow: ok ? `0 2px 8px ${g.color}44` : 'none' }}
              >
                {g.n}
              </div>
            );
          })}
        </div>
        <div className="mt-3.5 flex gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
            <span className="text-[11px] text-slate-500">Terpetakan (14)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 border border-slate-300" />
            <span className="text-[11px] text-slate-400">Belum (3)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartsRowTwo;