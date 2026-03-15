import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, MessageCircle, Mail, MapPin, Clock, Navigation, Facebook, Instagram, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCall = () => {
    window.location.href = "tel:+254728508906";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/254728508906?text=Hello%20Maripha%20Glassmart!", "_blank");
  };

  const handleDirections = () => {
    window.open("https://www.google.com/maps/search/Maripha+Glassmart+Busia+Kenya", "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email || undefined,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again or contact us via WhatsApp.');
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Failed to send message. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 lg:py-16 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-primary-foreground/90">
              Visit our shop, call us, or send a WhatsApp message. We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form + Map */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Info */}
            <div className="space-y-6">
              {/* Quick Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="cta" size="lg" className="flex-1 gap-3" onClick={handleCall}>
                  <Phone className="w-5 h-5" />
                  Call Now
                </Button>
                <Button variant="whatsapp" size="lg" className="flex-1 gap-3" onClick={handleWhatsApp}>
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </Button>
                <Button variant="outline" size="lg" className="flex-1 gap-3" onClick={handleDirections}>
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </Button>
              </div>

              {/* Contact Form */}
              <Card className="card-elevated">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Us a Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
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
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
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
                      <Label htmlFor="message">Your Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you today?"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    {error && (
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                        {error}
                      </div>
                    )}
                    <Button type="submit" variant="cta" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                      <Send className="w-4 h-4" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Cards */}
              <Card className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                        Visit Our Shop
                      </h3>
                      <p className="text-muted-foreground">
                        Maripha Glassmart<br />
                        Main Street, Busia Town<br />
                        Busia County, Kenya
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                        Phone Numbers
                      </h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+254728508906" className="hover:text-primary transition-colors">
                          +254 728 508 906
                        </a>
                        <br />
                        <span className="text-sm">(Also WhatsApp)</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                        Email Address
                      </h3>
                      <p className="text-muted-foreground">
                        <a href="mailto:info@mariphaglass.co.ke" className="hover:text-primary transition-colors">
                          info@mariphaglass.co.ke
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-elevated">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                        Opening Hours
                      </h3>
                      <div className="text-muted-foreground space-y-1">
                        <p className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span>8:00 AM - 6:00 PM</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Saturday:</span>
                          <span>8:00 AM - 5:00 PM</span>
                        </p>
                        <p className="flex justify-between">
                          <span>Sunday:</span>
                          <span className="text-destructive">Closed</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="card-elevated bg-secondary">
                <CardContent className="p-6">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com/mariphaglass"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="https://instagram.com/mariphaglass"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                    <a
                      href="https://wa.me/254728508906"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-whatsapp hover:text-whatsapp-foreground transition-colors"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-6 h-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Map */}
            <div>
              <Card className="overflow-hidden card-elevated h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.62073888!2d34.1069!3d0.4604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177f1b5c1c0a5c3d%3A0x8c4e3b4b4b4b4b4b!2sBusia%2C%20Kenya!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "500px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Maripha Glassmart Location"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Areas We Serve
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We deliver products and provide services across Western Kenya
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Busia",
              "Kisumu",
              "Kakamega",
              "Bungoma",
              "Siaya",
              "Mumias",
              "Webuye",
              "Malaba",
              "Vihiga",
            ].map((area) => (
              <span
                key={area}
                className="px-5 py-2 rounded-full bg-secondary text-foreground font-medium"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
