import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { HierarchicalProductFilter } from '@/components/HierarchicalProductFilter';
import { ContactSales } from '@/components/ContactSales';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HierarchicalProductFilter />
        <ContactSales />
      </main>
      <footer className="bg-accent text-accent-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Yegna Quick Order. All rights reserved. | Quality Construction Materials Supplier</p>
          <p className="mt-2 text-sm">Hotline: 9193 | Available 24/7 for your construction needs</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
