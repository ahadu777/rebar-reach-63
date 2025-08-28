import { useState } from 'react';
import { ChevronDown, ChevronRight, ShoppingCart, Package, Loader2, Star, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';
import { QuickOrderModal, CustomerInfo } from './QuickOrderModal';
import { placeOrder, OrderItem } from '@/services/orderService';
import { ApiItem, ProductGroup } from '@/types/api';

export const ProfessionalProductGrid = () => {
  const { categories, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [orderQuantities, setOrderQuantities] = useState<Record<string, number>>({});
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { toast } = useToast();

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-background to-primary-light/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">Loading premium construction materials...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-background to-primary-light/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-card-hover">
            <p className="text-muted-foreground mb-4">Failed to load products: {error}</p>
            <Button onClick={() => window.location.reload()}>
              Retry Loading
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // Get categories for filter nav
  const filterCategories = ['All', ...categories.map(cat => cat.description)];
  
  // Get filtered categories
  const filteredCategories = selectedCategory === 'All' 
    ? categories 
    : categories.filter(cat => cat.description === selectedCategory);

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    setOrderQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, quantity)
    }));
  };

  const addToOrder = (item: ApiItem) => {
    const quantity = orderQuantities[item.id.toString()] || 1;
    if (quantity > 0) {
      setSelectedItems(prev => [
        ...prev,
        { item_id: parseInt(item.id.toString()), quantity }
      ]);
      setIsOrderModalOpen(true);
    }
  };

  const handlePlaceOrder = async (customerInfo: CustomerInfo) => {
    if (selectedItems.length === 0) return;

    setIsPlacingOrder(true);
    try {
      await placeOrder({
        items: selectedItems,
        customer_info: customerInfo
      });

      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been submitted and will be processed shortly.",
        variant: "default"
      });

      setSelectedItems([]);
      setOrderQuantities({});
      setIsOrderModalOpen(false);
    } catch (error) {
      toast({
        title: "Order Failed",
        description: "Failed to place order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const formatPrice = (price: string | number | null) => {
    if (!price) return 'Price on request';
    return `$${parseFloat(price.toString()).toFixed(2)}`;
  };

  const getUnitName = (unitId: string | number) => {
    const units: Record<number, string> = {
      1: 'kg',
      2: 'pcs',
      3: 'meter',
      4: 'roll',
      5: 'liter',
      6: 'box',
      7: 'bag',
    };
    return units[parseInt(unitId.toString())] || 'unit';
  };

  const getCategoryImage = (category: any) => {
    if (category.images && category.images.length > 0) {
      return category.images[0].path;
    }
    
    // Fallback images based on category
    const fallbackImages: Record<string, string> = {
      'rebar': '/src/assets/rebar-product.jpg',
      'Hollow Section': '/src/assets/rebar-product.jpg',
      'Plywood': '/src/assets/plywood-product.jpg',
      'Angle': '/src/assets/rebar-product.jpg',
    };
    
    return fallbackImages[category.code] || fallbackImages[category.description] || '/src/assets/rebar-product.jpg';
  };

  const getProductGroupImage = (group: ProductGroup, category: any) => {
    if (group.images && group.images.length > 0) {
      return group.images[0].path;
    }
    return getCategoryImage(category);
  };

  return (
    <section id="products" className="py-16 bg-gradient-to-br from-background to-primary-light/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Premium Construction Materials
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in">
            Discover our comprehensive catalog of quality-assured construction materials from certified suppliers
          </p>
        </div>

        {/* Category Filter Navigation */}
        <div className="mb-12 animate-fade-in">
          <div className="flex flex-wrap gap-3 justify-center">
            {filterCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="lg"
                onClick={() => setSelectedCategory(category)}
                className="min-w-[120px] hover-scale"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Professional Product Grid */}
        <div className="space-y-8">
          {filteredCategories.map(category => (
            <div key={category.id} className="animate-fade-in">
              {/* Category Header Card */}
              <Card className="mb-6 overflow-hidden bg-gradient-card shadow-card-hover hover:shadow-card-hover transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Category Image */}
                    <div className="lg:w-1/3 h-48 lg:h-auto relative overflow-hidden">
                      <img 
                        src={getCategoryImage(category)}
                        alt={category.description}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent"></div>
                    </div>
                    
                    {/* Category Info */}
                    <div className="lg:w-2/3 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          {category.icon_class && (
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                              <i className={`${category.icon_class} text-2xl text-primary`}></i>
                            </div>
                          )}
                          <div>
                            <h3 className="text-3xl font-bold text-foreground mb-2">{category.description}</h3>
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="text-sm px-3 py-1">{category.code}</Badge>
                              <div className="flex items-center text-muted-foreground">
                                <Building2 className="w-4 h-4 mr-1" />
                                <span className="text-sm">Professional Grade</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleCategory(category.id.toString())}
                          className="flex items-center gap-2"
                        >
                          {expandedCategories.has(category.id.toString()) ? (
                            <>Hide Products <ChevronDown className="w-4 h-4" /></>
                          ) : (
                            <>View Products <ChevronRight className="w-4 h-4" /></>
                          )}
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="text-center p-3 bg-white/50 dark:bg-accent-light/10 rounded-lg">
                          <div className="font-semibold text-lg text-primary">
                            {category.productgroup?.length || 0}
                          </div>
                          <div className="text-muted-foreground">Product Types</div>
                        </div>
                        <div className="text-center p-3 bg-white/50 dark:bg-accent-light/10 rounded-lg">
                          <div className="font-semibold text-lg text-secondary">
                            {category.productgroup?.reduce((total: number, pg: ProductGroup) => 
                              total + (pg.items ? pg.items.length : 0), 0) || 0}
                          </div>
                          <div className="text-muted-foreground">Available Items</div>
                        </div>
                        <div className="text-center p-3 bg-white/50 dark:bg-accent-light/10 rounded-lg">
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold text-lg">4.8</span>
                          </div>
                          <div className="text-muted-foreground">Quality Rating</div>
                        </div>
                        <div className="text-center p-3 bg-white/50 dark:bg-accent-light/10 rounded-lg">
                          <div className="font-semibold text-lg text-success">✓</div>
                          <div className="text-muted-foreground">Certified</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Groups Grid */}
              {expandedCategories.has(category.id.toString()) && category.productgroup && (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in">
                  {category.productgroup.map((group: ProductGroup) => (
                    <Card key={group.id} className="overflow-hidden hover:shadow-card-hover transition-all duration-300 bg-card">
                      <CardContent className="p-0">
                        {/* Product Group Image */}
                        <div className="h-48 relative overflow-hidden">
                          <img 
                            src={getProductGroupImage(group, category)}
                            alt={group.description}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-accent/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-xl font-bold text-white mb-1">{group.description}</h4>
                            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                              {group.items?.length || 0} items available
                            </Badge>
                          </div>
                        </div>
                        
                        {/* Product Group Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Badge variant="outline" className="text-xs">{group.code}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleGroup(group.id.toString())}
                              className="text-primary hover:text-primary-hover"
                            >
                              {expandedGroups.has(group.id.toString()) ? (
                                <>Hide Items <ChevronDown className="w-4 h-4 ml-1" /></>
                              ) : (
                                <>View Items <ChevronRight className="w-4 h-4 ml-1" /></>
                              )}
                            </Button>
                          </div>

                          {/* Items Grid */}
                          {expandedGroups.has(group.id.toString()) && group.items && (
                            <div className="space-y-3 border-t pt-4">
                              {group.items
                                .filter(item => parseInt(item.is_active.toString()) === 1)
                                .map((item: ApiItem) => (
                                <div key={item.id} className="bg-muted/30 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <div className="flex-1">
                                      <h5 className="font-semibold text-foreground mb-1">{item.description}</h5>
                                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <Package className="w-3 h-3" />
                                          {formatPrice(item.wac)} / {getUnitName(item.unit_of_measure)}
                                        </span>
                                        <span>Stock: {item.stock || 'N/A'}</span>
                                        <Badge variant="secondary" className="text-xs">
                                          #{item.item_no}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 sm:flex-shrink-0">
                                      <Input
                                        type="number"
                                        min="1"
                                        value={orderQuantities[item.id.toString()] || 1}
                                        onChange={(e) => updateQuantity(item.id.toString(), parseInt(e.target.value))}
                                        className="w-16 text-center text-xs"
                                      />
                                      <Button
                                        onClick={() => addToOrder(item)}
                                        size="sm"
                                        className="flex items-center gap-1 hover-scale"
                                      >
                                        <ShoppingCart className="w-3 h-3" />
                                        Order
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-card-subtle">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-4">No products found matching your criteria.</p>
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory('All')}
                className="hover-scale"
              >
                View All Products
              </Button>
            </div>
          </div>
        )}
      </div>

      <QuickOrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onPlaceOrder={handlePlaceOrder}
        items={selectedItems}
        isLoading={isPlacingOrder}
      />
    </section>
  );
};