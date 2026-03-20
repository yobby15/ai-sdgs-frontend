import Hero from '../components/HeroPage/Hero';
import FeatureCards from '../components/HeroPage/FeatureCards';

const HeroPage = () => {
  return (
    <main className="relative z-10">
      <Hero />
      <FeatureCards />
    </main>
  );
};

export default HeroPage;