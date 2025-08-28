import { Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ContactSales = () => {
  return (
    <section id="contact" className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Need Expert Consultation?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our sales representatives are ready to help you find the right materials for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Call Direct</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Speak with our construction materials experts immediately.
              </p>
              <Button variant="hero" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                +91 98765 43210
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
              <CardTitle>WhatsApp Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Quick quotes and instant support via WhatsApp.
              </p>
              <Button variant="construction" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-success" />
              </div>
              <CardTitle>Email Quote</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Get detailed quotations and project consultations.
              </p>
              <Button variant="success" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Business Hours */}
        <div className="mt-12 text-center">
          <Card className="max-w-md mx-auto bg-primary-light">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-3">
                <Clock className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-semibold text-primary">Business Hours</h3>
              </div>
              <div className="space-y-1 text-sm text-foreground">
                <div>Monday - Friday: 8:00 AM - 8:00 PM</div>
                <div>Saturday: 9:00 AM - 6:00 PM</div>
                <div>Sunday: 10:00 AM - 4:00 PM</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};