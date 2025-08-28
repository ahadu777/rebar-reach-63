import { useState } from 'react';
import { ChevronDown, ChevronRight, ShoppingCart, Package, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';
import { QuickOrderModal, CustomerInfo } from './QuickOrderModal';
import { placeOrder, OrderItem } from '@/services/orderService';
import { ApiItem, ProductGroup } from '@/types/api';

export const HierarchicalProductFilter = () => {
  const { categories, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [orderQuantities, setOrderQuantities] = useState<Record<string, number>>({});
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const { toast } = useToast();

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">Failed to load products: {error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
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

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Construction Materials Catalog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive range of quality-assured construction materials from certified suppliers.
          </p>
        </div>

        {/* Category Filter Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {filterCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="flex-shrink-0"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Hierarchical Product Display */}
        <div className="space-y-6">
          {filteredCategories.map(category => (
            <Card key={category.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  {category.icon_class && (
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <i className={`${category.icon_class} text-xl text-primary`}></i>
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{category.description}</h3>
                    <Badge variant="secondary">{category.code}</Badge>
                  </div>
                </div>

                {/* Product Groups */}
                <div className="space-y-4">
                  {category.productgroup?.map((group: ProductGroup) => (
                    <div key={group.id} className="border border-border rounded-lg">
                      <button
                        onClick={() => toggleGroup(group.id.toString())}
                        className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {expandedGroups.has(group.id.toString()) ? (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                          )}
                          <div className="text-left">
                            <h4 className="font-semibold text-foreground">{group.description}</h4>
                            <p className="text-sm text-muted-foreground">
                              {group.items?.length || 0} items available
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {group.code}
                        </Badge>
                      </button>

                      {/* Items */}
                      {expandedGroups.has(group.id.toString()) && group.items && (
                        <div className="border-t border-border bg-muted/20">
                          <div className="p-4 space-y-3">
                            {group.items
                              .filter(item => parseInt(item.is_active.toString()) === 1)
                              .map((item: ApiItem) => (
                              <div key={item.id} className="bg-card p-4 rounded-lg border border-border">
                                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                                  <div className="flex-1">
                                    <h5 className="font-medium text-foreground mb-2">{item.description}</h5>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <Package className="w-4 h-4" />
                                        {formatPrice(item.wac)} / {getUnitName(item.unit_of_measure)}
                                      </span>
                                      <span>Stock: {item.stock || 'N/A'}</span>
                                      <span>Source: {item.source}</span>
                                      <Badge variant="secondary" className="text-xs">
                                        Item #{item.item_no}
                                      </Badge>
                                    </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                      <label className="text-sm text-muted-foreground">Qty:</label>
                                      <Input
                                        type="number"
                                        min="1"
                                        value={orderQuantities[item.id.toString()] || 1}
                                        onChange={(e) => updateQuantity(item.id.toString(), parseInt(e.target.value))}
                                        className="w-20 text-center"
                                      />
                                    </div>
                                    <Button
                                      onClick={() => addToOrder(item)}
                                      size="sm"
                                      className="flex items-center gap-2"
                                    >
                                      <ShoppingCart className="w-4 h-4" />
                                      Order
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
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