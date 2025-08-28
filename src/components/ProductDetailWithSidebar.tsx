import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Shield, CheckCircle, Minus, Plus, ShoppingCart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ProductVariant } from '@/types/product';

const ProductSidebar = ({ 
  variants, 
  selectedVariant, 
  onVariantSelect,
  priceRange,
  isOpen,
  onToggle
}: { 
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantSelect: (variant: ProductVariant) => void;
  priceRange: [number, number];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const [priceFilter, setPriceFilter] = useState<[number, number]>(priceRange);
  
  const filteredVariants = variants.filter(variant => 
    variant.price >= priceFilter[0] && variant.price <= priceFilter[1]
  );

  if (!isOpen) return null;

  return (
    <div className="w-80 border-r border-border bg-card">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <h3 className="text-lg font-semibold">Filter Variants</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            ×
          </Button>
        </div>
        
        <div className="space-y-4">
          {/* Price Range Filter */}
          <div>
            <h4 className="font-medium mb-2">Price Range (ETB)</h4>
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceFilter[0]}
                  onChange={(e) => setPriceFilter([parseInt(e.target.value) || priceRange[0], priceFilter[1]])}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceFilter[1]}
                  onChange={(e) => setPriceFilter([priceFilter[0], parseInt(e.target.value) || priceRange[1]])}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPriceFilter(priceRange)}
                className="w-full"
              >
                Reset Price
              </Button>
            </div>
          </div>

          <Separator />

          {/* Variants List */}
          <div>
            <h4 className="font-medium mb-2">Available Sizes ({filteredVariants.length})</h4>
            <ScrollArea className="h-96">
              <div className="space-y-2">
                {filteredVariants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant={selectedVariant?.id === variant.id ? "default" : "outline"}
                    onClick={() => onVariantSelect(variant)}
                    className="w-full justify-start p-3 h-auto"
                  >
                    <div className="flex flex-col items-start w-full">
                      <div className="flex justify-between w-full items-center">
                        <span className="font-medium">{variant.size}</span>
                        <Badge variant={variant.inStock > 0 ? "secondary" : "outline"}>
                          {variant.inStock} units
                        </Badge>
                      </div>
                      <div className="text-sm opacity-75 mt-1">
                        {variant.price.toLocaleString()} ETB
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductDetailWithSidebar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { products, loading } = useProducts();
  
  const product = products.find(p => p.id === id);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(product?.minOrderQuantity || 1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const hasVariants = product.variants && product.variants.length > 0;
  const currentPrice = selectedVariant?.price || product.price;
  const currentStock = selectedVariant?.inStock || product.inStock;
  const currentSpecs = selectedVariant?.specifications || product.specifications;

  // Mock additional images for variants
  const images = [
    product.image,
    product.image, // In real app, these would be different variant images
    product.image,
  ];

  const adjustQuantity = (delta: number) => {
    const newQuantity = Math.max(product.minOrderQuantity, quantity + delta);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} × ${selectedVariant?.name || product.name} added to cart`,
    });
  };

  const priceRange: [number, number] = hasVariants 
    ? [
        Math.min(...product.variants!.map(v => v.price)),
        Math.max(...product.variants!.map(v => v.price))
      ]
    : [product.price, product.price];

  if (!hasVariants) {
    // Show original product detail without sidebar for products without variants
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} variant ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-muted-foreground text-lg">{product.description}</p>
              </div>

              {/* Price */}
              <div className="bg-gradient-subtle p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {product.price.toLocaleString()} ETB
                </div>
                <div className="text-sm text-muted-foreground">{product.unit}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar for filtering variants */}
      <ProductSidebar 
        variants={product.variants!}
        selectedVariant={selectedVariant}
        onVariantSelect={setSelectedVariant}
        priceRange={priceRange}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main content */}
      <div className="flex-1">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4 flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {sidebarOpen ? 'Hide' : 'Show'} Variants
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images Section */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={images[selectedImage]}
                  alt={selectedVariant?.name || product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${selectedVariant?.name || product.name} variant ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {selectedVariant?.name || product.name}
                </h1>
                <p className="text-muted-foreground text-lg">{product.description}</p>
                {selectedVariant && (
                  <Badge variant="outline" className="mt-2">
                    Size: {selectedVariant.size}
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="bg-gradient-subtle p-4 rounded-lg">
                <div className="text-3xl font-bold text-primary">
                  {currentPrice.toLocaleString()} ETB
                </div>
                <div className="text-sm text-muted-foreground">{product.unit}</div>
              </div>

              {/* Supplier Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Supplier Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{product.supplier.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{product.supplier.rating}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">{product.supplier.location}</div>
                  <div className="flex flex-wrap gap-2">
                    {product.supplier.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quality Inspection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    Quality Inspection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Grade:</span>
                      <div className="font-medium">{product.qualityInspection.grade}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Test Date:</span>
                      <div className="font-medium">{product.qualityInspection.testDate}</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Certificate:</span>
                    <div className="font-medium">{product.qualityInspection.certificateNumber}</div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground mb-2 block">Passed Tests:</span>
                    <div className="flex flex-wrap gap-2">
                      {product.qualityInspection.passedTests.map((test, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {test}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(currentSpecs).map(([key, value], index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">{key}:</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                        {index < Object.entries(currentSpecs).length - 1 && (
                          <Separator className="mt-3" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Stock & Ordering */}
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">In Stock:</span>
                      <Badge variant={currentStock > 100 ? "default" : "secondary"}>
                        {currentStock} units
                      </Badge>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Min Order:</span>
                      <span className="font-medium">{product.minOrderQuantity} units</span>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Quantity:</span>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => adjustQuantity(-1)}
                            disabled={quantity <= product.minOrderQuantity}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => adjustQuantity(1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="bg-gradient-subtle p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total Price:</span>
                          <span className="text-xl font-bold text-primary">
                            {(currentPrice * quantity).toLocaleString()} ETB
                          </span>
                        </div>
                      </div>

                      <Button 
                        onClick={handleAddToCart} 
                        className="w-full" 
                        size="lg"
                        disabled={currentStock === 0}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        {currentStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};