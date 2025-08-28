import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Truck, Users } from 'lucide-react';
import heroImage from '@/assets/hero-construction.jpg';

export const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-accent/60"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            Premium Construction Materials
            <span className="block text-primary text-3xl md:text-5xl">
              Built for Excellence
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl animate-slide-up">
            Source high-quality rebar, cement, plywood, and construction materials from certified suppliers. 
            Every product inspected, every delivery guaranteed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
            <Button variant="hero" size="xl" onClick={scrollToProducts}>
              Browse Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="xl" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              Contact Sales
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fade-in">
            <div className="flex items-center space-x-3 text-white">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Quality Assured</div>
                <div className="text-sm text-white/80">100% Inspected Materials</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-white">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Fast Delivery</div>
                <div className="text-sm text-white/80">Next-Day Available</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-white">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Expert Support</div>
                <div className="text-sm text-white/80">Sales Team Ready</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};