import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Clock, Upload, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Quote = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    productType: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          product: formData.productType,
          message: formData.description,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote request');
      }

      toast({
        title: "Quote Request Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        phone: "",
        email: "",
        productType: "",
        description: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again or contact us via WhatsApp.');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to submit quote. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello Maripha Glassmart!\n\nI'd like to request a quote:\n\nName: ${formData.name}\nProduct/Service: ${formData.productType}\nDetails: ${formData.description}`
    );
    window.open(`https://wa.me/254728508906?text=${message}`, "_blank");
  };

  return (
    <Layout>
      {/* Hero Section - Mobile Optimized */}
      <section className="py-8 md:py-12 lg:py-16 hero-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3 md:mb-4">
              Get a Quote
            </h1>
            <p className="text-sm md:text-base text-primary-foreground/90">
              Tell us about your project and we'll provide a detailed quote within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form - Mobile Optimized */}
      <section className="py-8 md:py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="card-elevated">
                <CardContent className="p-4 md:p-6 lg:p-8">
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {/* Name & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6">
                      <div className="space-y-1.5 md:space-y-2">
                        <Label htmlFor="quote-name" className="text-xs md:text-sm">Your Name *</Label>
                        <Input
                          id="quote-name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="h-10 md:h-11"
                        />
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        <Label htmlFor="quote-phone" className="text-xs md:text-sm">Phone Number (WhatsApp) *</Label>
                        <Input
                          id="quote-phone"
                          type="tel"
                          placeholder="Phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="h-10 md:h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="quote-email" className="text-xs md:text-sm">Email Address (Optional)</Label>
                      <Input
                        id="quote-email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-10 md:h-11"
                      />
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="quote-productType" className="text-xs md:text-sm">Product/Service Type *</Label>
                      <Select
                        value={formData.productType}
                        onValueChange={(value) => setFormData({ ...formData, productType: value })}
                      >
                        <SelectTrigger id="quote-productType" className="h-10 md:h-11">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="glass">Glass & Mirrors</SelectItem>
                          <SelectItem value="paints">Paints & Coatings</SelectItem>
                          <SelectItem value="sinks">Sinks & Taps</SelectItem>
                          <SelectItem value="toilets">Toilets & Sanitary Ware</SelectItem>
                          <SelectItem value="showers">Showers & Bathroom Accessories</SelectItem>
                          <SelectItem value="installation">Installation Service</SelectItem>
                          <SelectItem value="delivery">Delivery Service</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="quote-description" className="text-xs md:text-sm">Describe What You Need *</Label>
                      <Textarea
                        id="quote-description"
                        placeholder="Tell us about your project, quantities, sizes, colors, or any specific requirements..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        className="resize-none"
                      />
                    </div>

                    {error && (
                      <div className="p-3 md:p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs md:text-sm">
                        {error}
                      </div>
                    )}

                    {/* File Upload Hint */}
                    <div className="border-2 border-dashed border-border rounded-lg p-4 md:p-6 text-center">
                      <Upload className="w-6 h-6 md:w-8 md:h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-xs md:text-sm text-muted-foreground">
                        Have a drawing or photo? Send it via WhatsApp for accurate quote.
                      </p>
                    </div>

                    {/* Action Buttons - Modern Mobile-First Design */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                      {/* Submit Button - Primary CTA */}
                      <Button
                        type="submit"
                        variant="cta"
                        size="lg"
                        className="w-full h-12 md:h-14 gap-2 text-sm md:text-base"
                        disabled={isSubmitting}
                      >
                        <Send className="w-4 h-4 md:w-5 md:h-5" />
                        {isSubmitting ? "Sending..." : "Submit Quote Request"}
                      </Button>

                      {/* WhatsApp Button - Secondary CTA */}
                      <Button
                        type="button"
                        variant="whatsapp"
                        size="lg"
                        className="w-full h-12 md:h-14 gap-2 text-sm md:text-base"
                        onClick={handleWhatsApp}
                      >
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span>Send via WhatsApp</span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Hidden on mobile, visible on lg+ */}
            <div className="hidden lg:flex lg:col-span-1 space-y-4 md:space-y-6">
              {/* Quick Response Card */}
              <Card className="card-elevated">
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm md:text-base">Quick Response</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    We review all quote requests and respond within 24 hours during business days.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card className="card-elevated bg-secondary">
                <CardContent className="p-5 md:p-6">
                  <h3 className="font-display font-semibold text-sm md:text-base text-foreground mb-3 md:mb-4">
                    Prefer to Talk?
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                    Call or WhatsApp us directly for immediate assistance.
                  </p>
                  <div className="space-y-2 md:space-y-3">
                    <Button
                      variant="default"
                      className="w-full h-10 md:h-11 gap-2 text-xs md:text-sm"
                      onClick={() => (window.location.href = "tel:+254728508906")}
                    >
                      <Phone className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Call +254 728 508 906
                    </Button>
                    <Button
                      variant="whatsapp"
                      className="w-full h-10 md:h-11 gap-2 text-xs md:text-sm"
                      onClick={() => window.open("https://wa.me/254728508906", "_blank")}
                    >
                      <MessageCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      WhatsApp Us
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* What to Include Card */}
              <Card className="card-elevated">
                <CardContent className="p-5 md:p-6">
                  <h3 className="font-display font-semibold text-sm md:text-base text-foreground mb-3 md:mb-4">
                    What to Include
                  </h3>
                  <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Product type and quantity needed
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Sizes and dimensions (if known)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Preferred colors or finishes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Delivery location
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Installation needs (if any)
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Quote;
