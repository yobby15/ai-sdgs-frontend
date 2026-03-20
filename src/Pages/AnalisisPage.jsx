import { useState } from 'react';
import { motion } from 'motion/react';
import AnalisisHeader from '../components/AnalisisPage/AnalisisHeader';
import TypeSelector from '../components/AnalisisPage/TypeSelector';
import UploadArea from '../components/AnalisisPage/UploadArea';
import TypeDescription from '../components/AnalisisPage/TypeDescription';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const AnalisisPage = () => {
  const [type, setType] = useState('T1');

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden" 
      animate="visible"
      className="relative z-10 pt-10 pb-16 px-8 max-w-195 mx-auto"
    >
      <motion.div variants={itemVariants}>
        <AnalisisHeader />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TypeSelector type={type} setType={setType} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <UploadArea type={type} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <TypeDescription type={type} />
      </motion.div>
    </motion.div>
  );
};

export default AnalisisPage;