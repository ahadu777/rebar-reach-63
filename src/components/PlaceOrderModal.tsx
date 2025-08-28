import { useState } from 'react';
import { X, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const ETHIOPIAN_BANKS = [
  'Commercial Bank of Ethiopia',
  'Dashen Bank',
  'Bank of Abyssinia',
  'Awash Bank',
  'United Bank',
  'Nib International Bank',
  'Cooperative Bank of Oromia',
  'Lion International Bank',
  'Oromia International Bank',
  'Zemen Bank',
  'Bunna International Bank',
  'Berhan International Bank',
  'Abay Bank',
  'Addis International Bank',
  'Debub Global Bank',
  'Enat Bank',
  'Siinqee Bank',
  'Tsehay Bank',
  'Ahadu Bank',
  'Shabelle Bank'
];

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

interface PlaceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlaceOrderModal = ({ isOpen, onClose }: PlaceOrderModalProps) => {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    customerName: '',
    tinNumber: '',
    phoneNumber: '',
    companyType: '',
    selectedBank: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateOrderDocument = () => {
    const orderDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const orderItems = items.map(item => ({
      item_id: item.product.item_id,
      productName: item.product.name,
      quantity: item.quantity,
      unit: item.product.unit,
      unitPrice: item.product.price,
      totalPrice: item.quantity * item.product.price,
      supplier: item.product.supplier.name
    }));

    return {
      orderNumber: `YQO-${Date.now()}`,
      orderDate,
      customer: {
        name: formData.customerName,
        tinNumber: formData.tinNumber || null,
        phoneNumber: formData.phoneNumber,
        companyType: formData.companyType
      },
      paymentDetails: {
        selectedBank: formData.selectedBank,
        totalAmount: totalPrice
      },
      items: orderItems,
      notes: formData.notes,
      summary: {
        totalItems: items.length,
        totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount: totalPrice
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.phoneNumber || !formData.companyType || !formData.selectedBank) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Customer Name, Phone, Company Type, and Bank).",
        variant: "destructive"
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before placing an order.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderDocument = generateOrderDocument();
      
      // Submit to imaginary API
      const response = await fetch('https://yegaorders.com/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDocument)
      });

      if (response.ok) {
        toast({
          title: "Order Placed Successfully!",
          description: `Order ${orderDocument.orderNumber} has been submitted for processing.`,
        });
        
        clearCart();
        onClose();
        
        // Reset form
        setFormData({
          customerName: '',
          tinNumber: '',
          phoneNumber: '',
          companyType: '',
          selectedBank: '',
          notes: ''
        });
      } else {
        throw new Error('Order submission failed');
      }
    } catch (error) {
      toast({
        title: "Order Submission Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Place Order - Yegna Quick Order
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
              <div className="flex justify-between font-semibold">
                <span>Total Amount:</span>
                <span>{totalPrice.toLocaleString()} ETB</span>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customerName">Customer Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="Enter full name or company name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Payment Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Payment Information</h3>
            
            <div>
              <Label htmlFor="selectedBank">Select Ethiopian Bank *</Label>
              <Select
                value={formData.selectedBank}
                onValueChange={(value) => handleInputChange('selectedBank', value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose your preferred bank for payment" />
                </SelectTrigger>
                <SelectContent>
                  {ETHIOPIAN_BANKS.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any special requirements or delivery instructions..."
              rows={3}
            />
          </div>

          {/* Order Items Preview */}
          <div className="space-y-4">
            <h3 className="font-semibold">Items in Order</h3>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-secondary/10 rounded">
                  <div>
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {item.quantity} × {item.product.price.toLocaleString()} ETB
                    </span>
                  </div>
                  <span className="font-semibold">
                    {(item.quantity * item.product.price).toLocaleString()} ETB
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || items.length === 0}
              className="flex-1"
            >
              {isSubmitting ? (
                "Submitting..."
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