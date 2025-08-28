import { useState, useEffect } from 'react';
import { Product, transformApiItemToProduct } from '@/types/product';
import { ApiCategory } from '@/types/api';
import { fetchItems } from '@/services/api';
import { useToast } from '@/hooks/use-toast';

export const useProducts = () => {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await fetchItems();
        
        if (response.success) {
          setCategories(response.data);
          
          // Transform API data to Product interface
          const transformedProducts: Product[] = [];
          response.data.forEach(category => {
            category.productgroup.forEach(productGroup => {
              productGroup.items.forEach(item => {
                if (parseInt(item.is_active.toString()) === 1) {
                  transformedProducts.push(
                    transformApiItemToProduct(item, category, productGroup)
                  );
                }
              });
            });
          });
          
          setProducts(transformedProducts);
        } else {
          throw new Error('API returned unsuccessful response');
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
        setError(errorMessage);
        toast({
          title: "Error Loading Products",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [toast]);

  return { categories, products, loading, error };
};