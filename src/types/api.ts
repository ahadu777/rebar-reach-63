export interface ApiItem {
  id: number | string;
  item_no: number | string;
  description: string;
  unit_of_measure: number | string;
  item_category_code: number | string;
  product_group_code: number | string;
  standard_amount: number | string;
  inventory: number | string;
  wac: number | string | null;
  stock: number | string | null;
  created_at: string;
  updated_at: string;
  minimum_stock: number | string;
  source: string;
  is_realestate_item: number | string;
  model: string | null;
  part_no: string | null;
  is_active: number | string;
  sales_uom: string | null;
  purchase_uom: string | null;
  target_group_id: number | string;
  min_stocks: number | string;
  min_bincards: number | string;
  images: ApiImage[];
}

export interface ProductGroup {
  id: number | string;
  category_id: number | string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_active: number | string;
  items: ApiItem[];
  images: ApiImage[];
}

export interface ApiCategory {
  id: number | string;
  code: string;
  description: string;
  created_at: string;
  updated_at: string;
  icon_class: string | null;
  uom: number | string | null;
  productgroup: ProductGroup[];
  images: ApiImage[];
}

export interface ApiImage {
  id: number | string;
  path: string;
  type: string;
  imageable_type: string;
  imageable_id: number | string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse {
  success: boolean;
  data: ApiCategory[];
}