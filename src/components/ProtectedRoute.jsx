import { AnimatePresence, motion } from 'motion/react';
import PasswordGate from './PasswordGate';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, pageName, pageIcon }) => {
  const { isUnlocked, tryUnlock, error, isShaking } = useAuth();

  if (!isUnlocked) {
    return (
      <AnimatePresence mode="wait">
        <PasswordGate
          key="gate"
          onUnlock={tryUnlock}
          error={error}
          isShaking={isShaking}
          pageName={pageName}
          pageIcon={pageIcon}
        />
      </AnimatePresence>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default ProtectedRoute;