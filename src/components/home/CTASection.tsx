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
    <section className="py-12 md:py-16 lg:py-20 hero-gradient">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3 md:mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-foreground/90 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-xl mx-auto">
            Get in touch with us today for quality products, competitive prices, and professional service.
          </p>

          {/* Mobile-first button layout - stacked on mobile, row on larger screens */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <Button
              variant="cta"
              size="lg"
              onClick={handleCall}
              className="w-full sm:w-auto h-12 md:h-14 gap-2 text-sm md:text-base px-5 md:px-6"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              <span>Call Now</span>
            </Button>

            <Button
              variant="whatsapp"
              size="lg"
              onClick={handleWhatsApp}
              className="w-full sm:w-auto h-12 md:h-14 gap-2 text-sm md:text-base px-5 md:px-6"
            >
              <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
              <span>WhatsApp</span>
            </Button>

            <Button
              variant="hero"
              size="lg"
              asChild
              className="w-full sm:w-auto h-12 md:h-14 gap-2 text-sm md:text-base px-5 md:px-6"
            >
              <Link to="/quote" className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4 md:w-5 md:h-5" />
                <span>Request Quote</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
