import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card cursor-pointer">
      <CardHeader className="pb-3">
        <div 
          className="aspect-[4/3] rounded-lg overflow-hidden mb-4"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div 
          className="flex items-start justify-between"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <div>
            <h3 className="font-semibold text-lg text-card-foreground mb-1">{product.name}</h3>
            <Badge variant="grade">{product.qualityInspection.grade}</Badge>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ETB</div>
            <div className="text-sm text-muted-foreground">{product.unit}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

        {/* Supplier Info */}
        <div className="flex items-center justify-between p-3 bg-secondary-light rounded-lg">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-secondary" />
            <div>
              <div className="font-medium text-sm">{product.supplier.name}</div>
              <div className="text-xs text-muted-foreground">{product.supplier.location}</div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.supplier.rating}</span>
          </div>
        </div>

        {/* Quality Badge */}
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-success" />
          <Badge variant="quality">Quality Certified</Badge>
          <Badge variant="supplier">{product.supplier.certifications[0]}</Badge>
        </div>

        {/* Key Specifications */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-card-foreground">Key Specifications:</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-muted-foreground">{key}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Status */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-success">✓ In Stock: {product.inStock} units</span>
          <span className="text-muted-foreground">Min order: {product.minOrderQuantity}</span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col space-y-3">
        <Button 
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full"
          variant="construction"
        >
          View Details & Select Size
        </Button>
      </CardFooter>
    </Card>
  );
};