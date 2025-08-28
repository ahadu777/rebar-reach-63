export interface OrderItem {
  item_id: number;
  quantity: number;
}

export interface PlaceOrderRequest {
  items: OrderItem[];
  customer_info?: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
}

export interface OrderResponse {
  success: boolean;
  message: string;
  order_id?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const placeOrder = async (orderData: PlaceOrderRequest): Promise<OrderResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/commerce-orders/receive`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Failed to place order: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error placing order:', error);
    throw error;
  }
};