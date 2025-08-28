import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ParallaxFooter = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const parallaxOffset = scrollY * 0.3;

  return (
    <footer className="relative overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 bg-gradient-footer"
        style={{
          transform: `translateY(${parallaxOffset}px)`,
        }}
      />
      
      {/* Overlay Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20zm10 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 bg-gradient-to-b from-transparent to-accent/20">
        <div className="container mx-auto px-4 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">Yegna Quick Order</h3>
                <p className="text-white/80 leading-relaxed">
                  Ethiopia's leading supplier of premium construction materials. 
                  Quality assured, certified suppliers, and reliable delivery.
                </p>
              </div>
              
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#' },
                  { icon: Twitter, href: '#' },
                  { icon: Instagram, href: '#' },
                  { icon: Linkedin, href: '#' }
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6 animate-fade-in">
              <h4 className="text-xl font-semibold text-white">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  'All Products',
                  'Rebar & Steel',
                  'Cement & Concrete',
                  'Plywood & Timber',
                  'Construction Tools',
                  'Quality Assurance'
                ].map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-white/70 hover:text-primary hover:translate-x-2 transition-all duration-300 inline-block story-link"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6 animate-fade-in">
              <h4 className="text-xl font-semibold text-white">Our Services</h4>
              <ul className="space-y-3">
                {[
                  'Bulk Supply',
                  'Quality Inspection',
                  'Fast Delivery',
                  'Technical Support',
                  'Custom Orders',
                  '24/7 Customer Care'
                ].map((service, index) => (
                  <li key={index}>
                    <a 
                      href="#" 
                      className="text-white/70 hover:text-secondary hover:translate-x-2 transition-all duration-300 inline-block story-link"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-fade-in">
              <h4 className="text-xl font-semibold text-white">Contact Us</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Hotline: 9193</p>
                    <p className="text-white/70 text-sm">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Mail className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">orders@yegnatrading.com</p>
                    <p className="text-white/70 text-sm">Sales & Support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-light/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Addis Ababa, Ethiopia</p>
                    <p className="text-white/70 text-sm">Multiple locations</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Mon - Sat: 8AM - 6PM</p>
                    <p className="text-white/70 text-sm">Sunday: Emergency only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-white/80">
                  &copy; {new Date().getFullYear()} Yegna Quick Order. All rights reserved.
                </p>
                <p className="text-white/60 text-sm mt-1">
                  Ethiopia's Premier Construction Materials Supplier
                </p>
              </div>
              
              <div className="flex items-center space-x-6">
                <a href="#" className="text-white/70 hover:text-primary text-sm story-link">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/70 hover:text-primary text-sm story-link">
                  Terms of Service
                </a>
                <Button
                  onClick={scrollToTop}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-primary hover:bg-white/10 hover-scale"
                >
                  <ArrowUp className="w-4 h-4 mr-2" />
                  Back to Top
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};