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
      {/* Hero Section - Mobile Optimized */}
      <section className="py-8 md:py-12 lg:py-16 hero-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3 md:mb-4">
              Contact Us
            </h1>
            <p className="text-sm md:text-base text-primary-foreground/90">
              Visit our shop, call us, or send a WhatsApp message. We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form + Map - Mobile Optimized */}
      <section className="py-8 md:py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Left Column - Contact Info */}
            <div className="space-y-4 md:space-y-6 flex-1">
              {/* Quick Contact Buttons - Stack on mobile, row on tablet */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                <Button variant="cta" size="sm" className="h-11 md:h-12 gap-2" onClick={handleCall}>
                  <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm">Call Now</span>
                </Button>
                <Button variant="whatsapp" size="sm" className="h-11 md:h-12 gap-2" onClick={handleWhatsApp}>
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm">WhatsApp</span>
                </Button>
                <Button variant="outline" size="sm" className="h-11 md:h-12 gap-2" onClick={handleDirections}>
                  <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-xs md:text-sm">Directions</span>
                </Button>
              </div>

              {/* Contact Form */}
              <Card className="card-elevated">
                <CardContent className="p-4 md:p-6">
                  <h3 className="font-display font-semibold text-base md:text-lg text-foreground mb-4 flex items-center gap-2">
                    <Send className="w-4 h-4 md:w-5 md:h-5" />
                    Send Us a Message
                  </h3>
                  <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <div className="space-y-1.5 md:space-y-2">
                        <Label htmlFor="contact-name" className="text-xs md:text-sm">Your Name *</Label>
                        <Input
                          id="contact-name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          className="h-10 md:h-11"
                        />
                      </div>
                      <div className="space-y-1.5 md:space-y-2">
                        <Label htmlFor="contact-phone" className="text-xs md:text-sm">Phone Number *</Label>
                        <Input
                          id="contact-phone"
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
                      <Label htmlFor="contact-email" className="text-xs md:text-sm">Email Address (Optional)</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-10 md:h-11"
                      />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <Label htmlFor="contact-message" className="text-xs md:text-sm">Your Message *</Label>
                      <Textarea
                        id="contact-message"
                        placeholder="How can we help you today?"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        className="resize-none"
                      />
                    </div>
                    {error && (
                      <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs md:text-sm">
                        {error}
                      </div>
                    )}
                    <Button type="submit" variant="cta" size="sm" className="w-full h-10 md:h-11 gap-2 text-sm md:text-base" disabled={isSubmitting}>
                      <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Cards - Grid on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Visit Our Shop */}
                <Card className="card-elevated">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-sm md:text-base text-foreground mb-1">
                          Visit Our Shop
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          Maripha Glassmart<br />
                          Main Street, Busia Town<br />
                          Busia County, Kenya
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Phone Numbers */}
                <Card className="card-elevated">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-sm md:text-base text-foreground mb-1">
                          Phone Numbers
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          <a href="tel:+254728508906" className="hover:text-primary transition-colors">
                            +254 728 508 906
                          </a>
                          <span className="text-xs">(Also WhatsApp)</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email */}
                <Card className="card-elevated">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-sm md:text-base text-foreground mb-1">
                          Email
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground">
                          <a href="mailto:info@mariphaglass.co.ke" className="hover:text-primary transition-colors break-all">
                            info@mariphaglass.co.ke
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Opening Hours */}
                <Card className="card-elevated">
                  <CardContent className="p-4 md:p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display font-semibold text-sm md:text-base text-foreground mb-1">
                          Opening Hours
                        </h3>
                        <div className="text-xs md:text-sm text-muted-foreground space-y-0.5">
                          <p className="flex justify-between gap-2">
                            <span>Mon - Fri:</span>
                            <span>8:00 AM - 6:00 PM</span>
                          </p>
                          <p className="flex justify-between gap-2">
                            <span>Saturday:</span>
                            <span>8:00 AM - 5:00 PM</span>
                          </p>
                          <p className="flex justify-between gap-2">
                            <span>Sunday:</span>
                            <span className="text-destructive">Closed</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media - Full width */}
              <Card className="card-elevated bg-secondary">
                <CardContent className="p-4 md:p-5">
                  <h3 className="font-display font-semibold text-sm md:text-base text-foreground mb-3 md:mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-3 md:gap-4">
                    <a
                      href="https://facebook.com/mariphaglass"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5 md:w-6 md:h-6" />
                    </a>
                    <a
                      href="https://instagram.com/mariphaglass"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                    </a>
                    <a
                      href="https://wa.me/254728508906"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center hover:bg-whatsapp hover:text-whatsapp-foreground transition-colors"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Map */}
            <div className="lg:w-[400px] xl:w-[450px] shrink-0">
              <Card className="overflow-hidden card-elevated h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.62073888!2d34.1069!3d0.4604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177f1b5c1c0a5c3d%3A0x8c4e3b4b4b4b4b4b!2sBusia%2C%20Kenya!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Maripha Glassmart Location"
                  className="min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
                />
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Areas - Mobile Optimized */}
      <section className="py-8 md:py-12 lg:py-16 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 md:mb-3">
              Areas We Serve
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              We deliver products and provide services across Western Kenya
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
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
                className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-secondary text-xs md:text-sm text-foreground font-medium"
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
