export const NAV_ITEMS = [
  { id: 'analisis', label: 'Analisis Dokumen', icon: '⬡' },
  { id: 'target', label: 'Target SDGs', icon: '◎' },
  { id: 'publikasi', label: 'Publikasi', icon: '◇' },
];

export const CARDS = [
  {
    id: 'T1',
    tag: 'T1',
    title: 'Skoring Dokumen Internal',
    subtitle: 'Internal Document Scoring',
    desc: 'Unggah dokumen kedinasan (PDF) untuk mendapatkan skor instrumen SDGs secara otomatis berdasarkan kata kunci dan konteks.',
    icon: '⬡',
    accent: '#0EA5E9',
    accentLight: '#E0F2FE',
    stat: '17 Indikator',
    statLabel: 'SDGs Terdeteksi',
  },
  {
    id: 'T2',
    tag: 'T2',
    title: 'Optimalisasi Blog & Opini',
    subtitle: 'Blog & Opinion Optimization',
    desc: 'Analisis konten blog THE/QS untuk memastikan narasi yang dibangun mendukung visibilitas publik terhadap isu keberlanjutan.',
    icon: '◎',
    accent: '#10B981',
    accentLight: '#D1FAE5',
    stat: '92.4%',
    statLabel: 'Akurasi Konteks',
  },
  {
    id: 'T3',
    tag: 'T3',
    title: 'Review Publikasi Ilmiah',
    subtitle: 'Academic Publication Review',
    desc: 'Evaluasi jurnal dan karya ilmiah terhadap standar pemeringkatan internasional untuk meningkatkan dampak akademik universitas.',
    icon: '◇',
    accent: '#8B5CF6',
    accentLight: '#EDE9FE',
    stat: 'THE / QS',
    statLabel: 'Standar Global',
  },
];

export const SDG_GOALS = [
  { n: 1, color: '#E5243B', label: 'No Poverty' },
  { n: 2, color: '#DDA63A', label: 'Zero Hunger' },
  { n: 3, color: '#4C9F38', label: 'Good Health' },
  { n: 4, color: '#C5192D', label: 'Quality Education' },
  { n: 5, color: '#FF3A21', label: 'Gender Equality' },
  { n: 6, color: '#26BDE2', label: 'Clean Water' },
  { n: 7, color: '#FCC30B', label: 'Clean Energy' },
  { n: 8, color: '#A21942', label: 'Decent Work' },
  { n: 9, color: '#FD6925', label: 'Industry & Innovation' },
  { n: 10, color: '#DD1367', label: 'Reduced Inequalities' },
  { n: 11, color: '#FD9D24', label: 'Sustainable Cities' },
  { n: 12, color: '#BF8B2E', label: 'Responsible Consumption' },
  { n: 13, color: '#3F7E44', label: 'Climate Action' },
  { n: 14, color: '#0A97D9', label: 'Life Below Water' },
  { n: 15, color: '#56C02B', label: 'Life on Land' },
  { n: 16, color: '#00689D', label: 'Peace & Justice' },
  { n: 17, color: '#19486A', label: 'Partnerships' },
];

export const RADAR_DATA = [
  { subject: 'Sosial', T1: 82, T2: 71, T3: 68 },
  { subject: 'Ekonomi', T1: 74, T2: 85, T3: 79 },
  { subject: 'Lingkungan', T1: 63, T2: 58, T3: 88 },
  { subject: 'Tata Kelola', T1: 91, T2: 65, T3: 72 },
  { subject: 'Inovasi', T1: 55, T2: 78, T3: 94 },
  { subject: 'Kemitraan', T1: 70, T2: 82, T3: 61 },
];

export const TREND_DATA = [
  { bulan: 'Agu', skor: 62 },
  { bulan: 'Sep', skor: 67 },
  { bulan: 'Okt', skor: 71 },
  { bulan: 'Nov', skor: 69 },
  { bulan: 'Des', skor: 78 },
  { bulan: 'Jan', skor: 83 },
  { bulan: 'Feb', skor: 88 },
];

export const TOP_SDG_DATA = [
  { sdg: 'SDG 4', skor: 91, color: '#C5192D' },
  { sdg: 'SDG 13', skor: 87, color: '#3F7E44' },
  { sdg: 'SDG 9', skor: 82, color: '#FD6925' },
  { sdg: 'SDG 17', skor: 78, color: '#19486A' },
  { sdg: 'SDG 11', skor: 74, color: '#FD9D24' },
  { sdg: 'SDG 3', skor: 69, color: '#4C9F38' },
];

export const RECENT_DOCS = [
  {
    name: 'Renstra Universitas 2024-2028.pdf',
    type: 'T1',
    skor: 87,
    sdgs: [4, 9, 17],
    status: 'Selesai',
    date: '06 Mar 2026',
  },
  {
    name: 'Blog: Kampus Hijau & Energi Bersih',
    type: 'T2',
    skor: 74,
    sdgs: [7, 13],
    status: 'Selesai',
    date: '04 Mar 2026',
  },
  {
    name: 'Jurnal: SDGs & Higher Education QS',
    type: 'T3',
    skor: 92,
    sdgs: [4, 16],
    status: 'Selesai',
    date: '02 Mar 2026',
  },
  {
    name: 'Laporan Keuangan Hibah 2025.pdf',
    type: 'T1',
    skor: 61,
    sdgs: [1, 8],
    status: 'Perlu Revisi',
    date: '28 Feb 2026',
  },
  {
    name: 'Opini: Kesetaraan Gender di Akademia',
    type: 'T2',
    skor: 79,
    sdgs: [5, 10],
    status: 'Selesai',
    date: '25 Feb 2026',
  },
];

export const typeColor = { T1: '#0EA5E9', T2: '#10B981', T3: '#8B5CF6' };
export const typeBg = { T1: '#E0F2FE', T2: '#D1FAE5', T3: '#EDE9FE' };
