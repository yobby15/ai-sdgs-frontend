import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroPage from './Pages/HeroPage';
import AnalisisPage from './Pages/AnalisisPage';
import TargetPage from './Pages/TargetPage';
import PublikasiPage from './Pages/PublikasiPage';

const App = () => {
  return (
    <div className="min-h-screen font-serif bg-slate-50 relative overflow-hidden">
      <div className="fixed -top-50 -right-50 w-150 h-150 rounded-full bg-sky-500/15 blur-[100px] pointer-events-none z-0" />
      <div className="fixed -bottom-37.5 -left-37.5 w-125 h-125 rounded-full bg-violet-500/10 blur-[100px] pointer-events-none z-0" />
      <div className="fixed top-[40%] left-[40%] w-100 h-100 rounded-full bg-emerald-500/10 blur-[80px] pointer-events-none z-0" />
      
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(15,23,42,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <Navbar />

      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/analisis" element={<AnalisisPage />} />
        <Route path="/target" element={<TargetPage />} />
        <Route path="/publikasi" element={<PublikasiPage />} />
      </Routes>
    </div>
  );
};

export default App;