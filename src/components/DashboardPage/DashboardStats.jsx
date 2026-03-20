import { StatCard } from '../SharedUI';

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
      <StatCard label="Skor Global SDGs" value="81.4" sub="↑ 6.2 poin dari bulan lalu" accent="#0EA5E9" icon="◈" />
      <StatCard label="Dokumen Dianalisis" value="47" sub="12 dokumen bulan ini" accent="#10B981" icon="⬡" />
      <StatCard label="SDGs Terpetakan" value="14/17" sub="3 goal belum terjangkau" accent="#8B5CF6" icon="◎" />
      <StatCard label="Peringkat THE/QS" value="#312" sub="↑ 28 posisi vs 2024" accent="#F59E0B" icon="◇" />
    </div>
  );
};

export default DashboardStats;