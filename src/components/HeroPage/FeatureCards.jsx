import { motion } from 'motion/react';
import { CARDS } from '../../data/constants';
import FeatureCard from './FeatureCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3, 
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  },
};

const FeatureCards = () => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 max-w-300 mx-auto px-6 pb-20"
    >
      <motion.div variants={cardVariants} className="text-center mb-12">
        <span className="inline-block text-[11px] font-bold text-sky-500 tracking-widest uppercase mb-3">
          Fitur Utama
        </span>
        <h2 className="text-[clamp(22px,3vw,32px)] font-bold text-slate-900 tracking-tight m-0">
          Tiga Jalur Analisis Dokumen
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CARDS.map((card) => (
          <FeatureCard key={card.id} card={card} variants={cardVariants} />
        ))}
      </div>
    </motion.section>
  );
};

export default FeatureCards;