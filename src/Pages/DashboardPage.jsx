import { motion } from 'motion/react';
import DashboardHeader from '../components/DashboardPage/DashboardHeader';
import DashboardStats from '../components/DashboardPage/DashboardStats';
import ChartsRowOne from '../components/DashboardPage/ChartsRowOne';
import ChartsRowTwo from '../components/DashboardPage/ChartsRowTwo';
import RecentDocs from '../components/DashboardPage/RecentDocs';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const DashboardPage = () => {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      className="relative z-10 pt-8 pb-14 px-8 max-w-300 mx-auto"
    >
      <motion.div variants={itemVariants}>
        <DashboardHeader />
      </motion.div>

      <motion.div variants={itemVariants}>
        <DashboardStats />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ChartsRowOne />
      </motion.div>

      <motion.div variants={itemVariants}>
        <ChartsRowTwo />
      </motion.div>

      <motion.div variants={itemVariants}>
        <RecentDocs />
      </motion.div>
    </motion.div>
  );
};

export default DashboardPage;