import { ApiItem, ProductGroup, ApiCategory } from './api';

export interface Supplier {
  id: string;
  name: string;
  location: string;
  rating: number;
  certifications: string[];
}

export interface QualityInspection {
  grade: string;
  testDate: string;
  certificateNumber: string;
  passedTests: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  size: string;
  price: number;
  inStock: number;
  specifications: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  supplier: Supplier;
  qualityInspection: QualityInspection;
  specifications: Record<string, string>;
  inStock: number;
  minOrderQuantity: number;
  variants?: ProductVariant[];
  item_id?: number; // API item ID for order submission
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Transform API data to Product interface
export const transformApiItemToProduct = (
  item: ApiItem, 
  category: ApiCategory, 
  productGroup: ProductGroup
): Product => {
  // Use fallback images based on category
  const getFallbackImage = (categoryCode: string): string => {
    const fallbackImages: Record<string, string> = {
      'rebar': '/src/assets/rebar-product.jpg',
      'Cement': '/src/assets/cement-product.jpg',
      'Plywood': '/src/assets/plywood-product.jpg',
      'Wire': '/src/assets/electric-wire-product.jpg',
      'Nail': '/src/assets/nails-product.jpg',
      'Electric': '/src/assets/electric-wire-product.jpg',
    };
    return fallbackImages[categoryCode] || '/src/assets/rebar-product.jpg';
  };

  const imageUrl = item.images?.[0]?.path || 
                   productGroup.images?.[0]?.path || 
                   category.images?.[0]?.path || 
                   getFallbackImage(category.code);

  return {
    id: item.id.toString(),
    name: item.description,
    category: category.description,
    description: `${category.description} - ${productGroup.description}`,
    price: parseFloat(item.wac?.toString() || '0'),
    unit: getUnitName(parseInt(item.unit_of_measure.toString())),
    image: imageUrl,
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