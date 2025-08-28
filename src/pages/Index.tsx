import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProfessionalProductGrid } from '@/components/ProfessionalProductGrid';
import { ContactSales } from '@/components/ContactSales';
import { ParallaxFooter } from '@/components/ParallaxFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProfessionalProductGrid />
        <ContactSales />
      </main>
      <ParallaxFooter />
    </div>
  );
};

export default Index;
