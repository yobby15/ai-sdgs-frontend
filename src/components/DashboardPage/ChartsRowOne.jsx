import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Area, AreaChart, Cell
} from 'recharts';
import { TREND_DATA, TOP_SDG_DATA } from '../../data/constants';
import { CustomTooltip } from '../SharedUI';

const ChartsRowOne = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {/* Tren Area Chart */}
      <div className="bg-white rounded-[14px] border border-slate-900/5 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <p className="m-0 mb-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tren Skor</p>
        <h3 className="m-0 mb-4 text-[15px] font-bold text-slate-900">Skor SDGs 7 Bulan Terakhir</h3>
        <div className="h-48.75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={TREND_DATA}>
              <defs>
                <linearGradient id="colorSkor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="bulan" tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[55, 95]} tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="skor" stroke="#0EA5E9" strokeWidth={2.5} fill="url(#colorSkor)" dot={{ fill: '#0EA5E9', r: 4 }} activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-[14px] border border-slate-900/5 p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <p className="m-0 mb-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Capaian Tertinggi</p>
        <h3 className="m-0 mb-4 text-[15px] font-bold text-slate-900">Top 6 SDG Goals</h3>
        <div className="h-48.75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={TOP_SDG_DATA} layout="vertical" barCategoryGap="25%">
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="sdg" tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }} axisLine={false} tickLine={false} width={52} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="skor" radius={[0, 6, 6, 0]}>
                {TOP_SDG_DATA.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ChartsRowOne;