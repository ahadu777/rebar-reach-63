import { useState } from 'react';
import { ShoppingCart, Phone, Menu, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { PlaceOrderModal } from './PlaceOrderModal';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="bg-card shadow-card-subtle border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-md"></div>
            <h1 className="text-xl font-bold text-foreground">Yegna Quick Order</h1>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#products" className="text-foreground hover:text-primary transition-colors">Products</a>
            <a href="#suppliers" className="text-foreground hover:text-primary transition-colors">Suppliers</a>
            <a href="#quality" className="text-foreground hover:text-primary transition-colors">Quality</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <Phone className="w-4 h-4 mr-2" />
              Call Sales
            </Button>

            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <Badge variant="default" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {totalItems > 0 && (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => setIsOrderModalOpen(true)}
                className="hidden sm:flex"
              >
                <FileText className="w-4 h-4 mr-2" />
                Place Order
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <a href="#home" className="text-foreground hover:text-primary transition-colors py-2">Home</a>
              <a href="#products" className="text-foreground hover:text-primary transition-colors py-2">Products</a>
              <a href="#suppliers" className="text-foreground hover:text-primary transition-colors py-2">Suppliers</a>
              <a href="#quality" className="text-foreground hover:text-primary transition-colors py-2">Quality</a>
              <a href="#contact" className="text-foreground hover:text-primary transition-colors py-2">Contact</a>
              <Button variant="outline" size="sm" className="self-start mt-2">
                <Phone className="w-4 h-4 mr-2" />
                Call Sales Rep
              </Button>
              {totalItems > 0 && (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="self-start"
                  onClick={() => setIsOrderModalOpen(true)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Place Order
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
      
      <PlaceOrderModal 
        isOpen={isOrderModalOpen} 
        onClose={() => setIsOrderModalOpen(false)} 
      />
    </header>
  );
};