import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { NAV_ITEMS } from '../data/constants';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-300">
      <div className="max-w-300 mx-auto px-6 h-16 flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2 mr-8 no-underline">
          <span className="text-2xl text-sky-500 leading-none">⬡</span>
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            SDGs<span className="text-sky-500">AI</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-1 flex-1 relative">
          {NAV_ITEMS.map((item) => {
            const itemPath = `/${item.id}`;
            const isActive = currentPath === itemPath;

            return (
              <Link
                key={item.id}
                to={itemPath}
                className={`relative flex items-center gap-1.5 py-2 px-3.5 rounded-lg text-[13.5px] font-medium transition-colors duration-200 whitespace-nowrap
                  ${isActive ? 'text-sky-500 font-semibold' : 'bg-transparent text-slate-500 hover:text-slate-700'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="navBackground"
                    className="absolute inset-0 bg-sky-50 rounded-lg -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                
                <span className="text-sm opacity-70">{item.icon}</span>
                {item.label}

                {isActive && (
                  <motion.span 
                    layoutId="navIndicator"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-500" 
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        
        <Link to="/analisis" className="ml-auto py-2 px-5 rounded-lg border-none bg-linear-to-br from-sky-500 to-sky-700 text-white text-[13.5px] font-semibold tracking-tight shadow-[0_2px_8px_rgba(14,165,233,0.35)] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
          Mulai Analisis →
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;