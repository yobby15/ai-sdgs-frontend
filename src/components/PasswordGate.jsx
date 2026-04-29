import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const PasswordGate = ({ onUnlock, error, isShaking, pageName, pageIcon }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 400);
  }, []);

  const handleSubmit = () => {
    if (password.trim()) onUnlock(password);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: 'radial-gradient(ellipse at 60% 40%, rgba(14,165,233,0.12) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(139,92,246,0.10) 0%, transparent 55%), rgba(248,250,252,0.97)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid rgba(226,232,240,0.8)',
          boxShadow: '0 32px 80px rgba(15,23,42,0.10), 0 8px 24px rgba(15,23,42,0.06), 0 0 0 1px rgba(255,255,255,0.6) inset',
        }}
        className="relative w-full max-w-md mx-4 rounded-3xl p-8 overflow-hidden"
      >
        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-8 right-8 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.4), transparent)' }}
        />

        {/* Lock icon area */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className="relative mb-5"
          >
            {/* Glow ring */}
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-2xl"
              style={{ background: 'rgba(14,165,233,0.15)', filter: 'blur(8px)', transform: 'scale(1.3)' }}
            />
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{
                background: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
                border: '1px solid rgba(14,165,233,0.2)',
                boxShadow: '0 4px 16px rgba(14,165,233,0.15)',
              }}
            >
              🔒
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-sky-500 text-lg">{pageIcon}</span>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                {pageName}
              </h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Halaman ini dilindungi. Masukkan password untuk melanjutkan.
            </p>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 mb-6" />

        {/* Password input */}
        <motion.div
          animate={isShaking ? {
            x: [-8, 8, -6, 6, -4, 4, 0],
            transition: { duration: 0.5 }
          } : {}}
          className="mb-4"
        >
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Password
          </label>

          <div
            className="relative rounded-xl overflow-hidden transition-all duration-200"
            style={{
              border: isFocused
                ? '1.5px solid rgba(14,165,233,0.6)'
                : error
                ? '1.5px solid rgba(239,68,68,0.5)'
                : '1.5px solid rgba(226,232,240,1)',
              boxShadow: isFocused
                ? '0 0 0 3px rgba(14,165,233,0.10)'
                : 'none',
              background: 'rgba(248,250,252,0.8)',
            }}
          >
            <input
              ref={inputRef}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Masukkan password..."
              className="w-full bg-transparent outline-none px-4 py-3.5 pr-12 text-slate-800 text-sm font-medium placeholder-slate-400"
              style={{ fontFamily: showPassword ? 'inherit' : 'inherit' }}
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="text-xs text-red-500 font-medium flex items-center gap-1.5"
              >
                <span>⚠️</span> {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Submit button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={!password.trim()}
          className="w-full py-3.5 rounded-xl text-white text-sm font-semibold tracking-tight transition-all duration-200 relative overflow-hidden"
          style={{
            background: password.trim()
              ? 'linear-gradient(135deg, #0EA5E9 0%, #0369A1 100%)'
              : 'linear-gradient(135deg, #CBD5E1 0%, #94A3B8 100%)',
            boxShadow: password.trim()
              ? '0 4px 16px rgba(14,165,233,0.35), 0 1px 3px rgba(14,165,233,0.2)'
              : 'none',
            cursor: password.trim() ? 'pointer' : 'not-allowed',
          }}
        >
          <span className="relative z-10">Buka Akses →</span>
          {password.trim() && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
              }}
            />
          )}
        </motion.button>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-slate-400 mt-5"
        >
          Hubungi administrator jika tidak memiliki akses
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default PasswordGate;