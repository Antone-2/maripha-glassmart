import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Clock, Upload } from "lucide-react";
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
      {/* Hero Section */}
      <section className="py-12 lg:py-16 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Get a Quote
            </h1>
            <p className="text-primary-foreground/90">
              Tell us about your project and we'll provide a detailed quote within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="card-elevated">
                <CardContent className="p-6 lg:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number (WhatsApp) *</Label>
                        <Input
                          id="phone"
                          placeholder="+254 7XX XXX XXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address (Optional)</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="productType">Product/Service Type *</Label>
                      <Select
                        value={formData.productType}
                        onValueChange={(value) => setFormData({ ...formData, productType: value })}
                      >
                        <SelectTrigger>
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

                    <div className="space-y-2">
                      <Label htmlFor="description">Describe What You Need *</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell us about your project, quantities, sizes, colors, or any specific requirements..."
                        rows={5}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>

                    {error && (
                      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                        {error}
                      </div>
                    )}

                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Have a drawing or photo? Send it via WhatsApp for accurate quote.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button type="submit" variant="cta" size="lg" className="flex-1" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Submit Quote Request"}
                      </Button>
                      <Button
                        type="button"
                        variant="whatsapp"
                        size="lg"
                        className="flex-1 gap-2"
                        onClick={handleWhatsApp}
                      >
                        <MessageCircle className="w-5 h-5" />
                        Send via WhatsApp
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Quick Response</h3>
                      <p className="text-sm text-muted-foreground">Within 24 hours</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We review all quote requests and respond within 24 hours during business days.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-elevated bg-secondary">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                    Prefer to Talk?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call or WhatsApp us directly for immediate assistance.
                  </p>
                  <div className="space-y-3">
                    <Button
                      variant="default"
                      className="w-full gap-2"
                      onClick={() => (window.location.href = "tel:+254728508906")}
                    >
                      <Phone className="w-4 h-4" />
                      Call +254 728 508 906
                    </Button>
                    <Button
                      variant="whatsapp"
                      className="w-full gap-2"
                      onClick={() => window.open("https://wa.me/254728508906", "_blank")}
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp Us
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                    What to Include
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      Product type and quantity needed
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      Sizes and dimensions (if known)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      Preferred colors or finishes
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      Delivery location
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
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
