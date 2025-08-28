import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

export const CategoryProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { categories, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProductGroup, setSelectedProductGroup] = useState<string>('all');

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground mb-4">Failed to load products: {error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  const category = categories.find(cat => cat.id.toString() === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
        </div>
      </div>
    );
  }

  // Get all items from all product groups
  const allItems = category.productgroup.flatMap(pg => 
    pg.items.map(item => ({ ...item, productGroup: pg }))
  );

  // Filter items
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedProductGroup === 'all' || item.productGroup.id.toString() === selectedProductGroup;
    const isActive = parseInt(item.is_active.toString()) === 1;
    return matchesSearch && matchesGroup && isActive;
  });

  const handleAddToCart = (item: any, productGroup: any) => {
    // Transform item to product format for cart
    const product = {
      id: item.id.toString(),
      name: item.description,
      category: category.description,
      description: `${category.description} - ${productGroup.description}`,
      price: parseFloat(item.wac?.toString() || '0'),
      unit: getUnitName(parseInt(item.unit_of_measure.toString())),
      image: item.images?.[0]?.path || productGroup.images?.[0]?.path || '/src/assets/rebar-product.jpg',
      supplier: {
        id: '1',
        name: "Yegnar Quick Order",
        location: "Ethiopia",
        rating: 4.8,
        certifications: ['ISO 9001', 'Quality Assured']
      },
      qualityInspection: {
        grade: productGroup.description,
        testDate: item.updated_at.split('T')[0],
        certificateNumber: `YQO-${item.id}`,
        passedTests: ['Strength Test', 'Quality Check']
      },
      specifications: {
        'Material': productGroup.description,
        'Grade': category.description,
        'Source': item.source,
        'Stock': item.stock?.toString() || '0',
      },
      inStock: parseInt(item.stock?.toString() || '0'),
      minOrderQuantity: 1,
      item_id: parseInt(item.id.toString())
    };

    addToCart(product, 1);
    toast({
      title: "Added to Cart",
      description: `${item.description} has been added to your cart.`,
    });
  };

  const getUnitName = (unitId: number): string => {
    const units: Record<number, string> = {
      1: 'kg',
      2: 'pcs',
      3: 'meter',
      4: 'roll',
      5: 'liter',
      6: 'box',
      7: 'bag',
    };
    return units[unitId] || 'unit';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            {category.icon_class && (
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <i className={`${category.icon_class} text-xl text-primary`}></i>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-foreground">{category.description}</h1>
              <p className="text-muted-foreground">Browse our {category.description.toLowerCase()} products</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Product Group Filter */}
            <select
              value={selectedProductGroup}
              onChange={(e) => setSelectedProductGroup(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="all">All Product Groups</option>
              {category.productgroup.map(pg => (
                <option key={pg.id} value={pg.id.toString()}>
                  {pg.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedProductGroup('all');
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const price = parseFloat(item.wac?.toString() || '0');
              const stock = parseInt(item.stock?.toString() || '0');
              const unit = getUnitName(parseInt(item.unit_of_measure.toString()));

              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Product Image */}
                      <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                        <img
                          src={item.images?.[0]?.path || item.productGroup.images?.[0]?.path || '/src/assets/rebar-product.jpg'}
                          alt={item.description}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => navigate(`/product/${item.id}`)}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="space-y-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.productGroup.description}
                        </Badge>
                        
                        <h3 
                          className="font-semibold text-foreground cursor-pointer hover:text-primary"
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          {item.description}
                        </h3>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-primary">
                            {price.toLocaleString()} ETB
                          </span>
                          <span className="text-sm text-muted-foreground">per {unit}</span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Stock:</span>
                          <Badge variant={stock > 100 ? "default" : "secondary"}>
                            {stock} units
                          </Badge>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Source:</span>
                          <span className="text-foreground">{item.source}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-2">
                        <Button
                          onClick={() => handleAddToCart(item, item.productGroup)}
                          className="w-full"
                          disabled={stock === 0}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </Button>
                        
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/product/${item.id}`)}
                          className="w-full"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};