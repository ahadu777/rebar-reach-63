import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

export const CategoryGrid = () => {
  const { categories, loading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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
          <p className="text-muted-foreground mb-4">Failed to load categories: {error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </section>
    );
  }

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Only show categories that have product groups with items
  const categoriesWithProducts = filteredCategories.filter(category => 
    category.productgroup && category.productgroup.length > 0 &&
    category.productgroup.some(pg => pg.items && pg.items.length > 0)
  );

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Construction Material Categories
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse our wide range of quality construction materials
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {categoriesWithProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No categories found matching your search.</p>
            <Button variant="outline" onClick={() => setSearchTerm('')}>
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesWithProducts.map((category) => {
              // Count total items across all product groups
              const totalItems = category.productgroup.reduce((total, pg) => 
                total + (pg.items ? pg.items.length : 0), 0
              );

              // Count product groups
              const productGroupCount = category.productgroup.length;

              return (
                <Card 
                  key={category.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => handleCategoryClick(category.id.toString())}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Category Icon & Name */}
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          {category.icon_class ? (
                            <i className={`${category.icon_class} text-2xl text-primary`}></i>
                          ) : (
                            <div className="w-8 h-8 bg-primary/20 rounded"></div>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {category.description}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {category.code}
                        </Badge>
                      </div>

                      {/* Stats */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Product Groups:</span>
                          <Badge variant="outline">{productGroupCount}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total Items:</span>
                          <Badge variant="outline">{totalItems}</Badge>
                        </div>
                      </div>

                      {/* Product Group Preview */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Available Types:</p>
                        <div className="flex flex-wrap gap-1">
                          {category.productgroup.slice(0, 3).map((pg) => (
                            <Badge key={pg.id} variant="secondary" className="text-xs">
                              {pg.description}
                            </Badge>
                          ))}
                          {category.productgroup.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{category.productgroup.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button 
                        className="w-full mt-4"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryClick(category.id.toString());
                        }}
                      >
                        View Products
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};