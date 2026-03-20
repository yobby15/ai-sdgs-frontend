import { motion } from 'motion/react';
import { SDG_GOALS } from '../data/constants';
import TargetHeader from '../components/TargetPage/TargetHeader';
import TargetCard from '../components/TargetPage/TargetCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { 
    opacity: 1, scale: 1, y: 0, 
    transition: { type: 'spring', stiffness: 200, damping: 20 } 
  }
};

const TargetPage = () => {
  return (
    <div className="relative z-10 pt-10 pb-16 px-8 max-w-300 mx-auto">
      <TargetHeader />
      
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
      >
        {SDG_GOALS.map((g) => (
          <TargetCard key={g.n} g={g} variants={itemVariants} />
        ))}
      </motion.div>
    </div>
  );
};

export default TargetPage;