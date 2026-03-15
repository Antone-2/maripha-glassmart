import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const handleCall = () => {
    window.location.href = "tel:+254728508906";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/254728508906?text=Hello%20Maripha%20Glassmart!", "_blank");
  };

  return (
    <section className="py-16 lg:py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-xl mx-auto">
            Get in touch with us today for quality products, competitive prices, and professional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl" onClick={handleCall} className="gap-3">
              <Phone className="w-5 h-5" />
              Call Now
            </Button>
            <Button variant="whatsapp" size="xl" onClick={handleWhatsApp} className="gap-3">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </Button>
            <Button variant="hero" size="xl" asChild>
              <Link to="/quote" className="gap-3">
                <FileText className="w-5 h-5" />
                Request Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
