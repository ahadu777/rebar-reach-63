import { useState } from 'react';
import { X, FileText, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { OrderItem } from '@/services/orderService';

const COMPANY_TYPES = [
  'Private Limited Company (PLC)',
  'Share Company (S.C)',
  'Sole Proprietorship',
  'Partnership',
  'Cooperative',
  'NGO/Association',
  'Government Entity',
  'Other'
];

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaceOrder: (customerInfo: CustomerInfo) => Promise<void>;
  items: OrderItem[];
  isLoading: boolean;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  companyType: string;
  tinNumber?: string;
}

export const QuickOrderModal = ({ 
  isOpen, 
  onClose, 
  onPlaceOrder, 
  items, 
  isLoading 
}: QuickOrderModalProps) => {
  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    companyType: '',
    tinNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.companyType) {
      return;
    }

    await onPlaceOrder(formData);
  };

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Quick Order - Yegna Quick Order
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Summary */}
          <div className="bg-secondary/20 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span>{items.length} products</span>
              </div>
              <div className="flex justify-between">
                <span>Total Quantity:</span>
                <span>{items.reduce((sum, item) => sum + item.quantity, 0)} units</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Information</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter full name or company name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Your phone number"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <Label htmlFor="address">Address (Optional)</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Delivery address"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="companyType">Company Type *</Label>
                <Select
                  value={formData.companyType}
                  onValueChange={(value) => handleInputChange('companyType', value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    {COMPANY_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tinNumber">TIN Number (Optional)</Label>
                <Input
                  id="tinNumber"
                  value={formData.tinNumber}
                  onChange={(e) => handleInputChange('tinNumber', e.target.value)}
                  placeholder="Tax identification number"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading || items.length === 0 || !formData.name || !formData.phone || !formData.companyType}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Placing Order...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Place Order
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};