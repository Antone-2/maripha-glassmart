import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, MessageCircle, Truck, Shield, CreditCard } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Trust Badges - Hidden on mobile */}
      <div className="border-b border-primary-foreground/10 hidden md:block">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3">
              <Truck className="w-6 h-6 text-accent" />
              <div className="text-left">
                <p className="font-semibold text-sm">Fast Delivery</p>
                <p className="text-xs text-primary-foreground/70">Busia, Kisumu, Kakamega & more</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Shield className="w-6 h-6 text-accent" />
              <div className="text-left">
                <p className="font-semibold text-sm">Quality Guaranteed</p>
                <p className="text-xs text-primary-foreground/70">Trusted products & service</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3">
              <CreditCard className="w-6 h-6 text-accent" />
              <div className="text-left">
                <p className="font-semibold text-sm">Flexible Payment</p>
                <p className="text-xs text-primary-foreground/70">Cash, M-Pesa & Bank Transfer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile-friendly single column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info - Simplified */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-display font-bold text-lg">M</span>
              </div>
              <h3 className="font-display font-bold text-lg">Maripha Glassmart</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Quality glass, paints & sanitary ware in Busia, Kenya.
            </p>

            {/* Social Links - Compact on mobile */}
            <div className="flex gap-2 mb-4">
              <a href="https://facebook.com/mariphaglass" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/mariphaglass" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/254728508906" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            {/* Contact - Compact */}
            <div className="space-y-2 text-sm">
              <a href="tel:+254728508906" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground">
                <Phone className="w-4 h-4" /> +254 728 508 906
              </a>
              <a href="mailto:info@mariphaglass.co.ke" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground">
                <Mail className="w-4 h-4" /> info@mariphaglass.co.ke
              </a>
            </div>
          </div>

          {/* Quick Links + Products Combined */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "Services", path: "/services" },
                { name: "Gallery", path: "/gallery" },
                { name: "Get Quote", path: "/quote" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-primary-foreground/80 hover:text-primary-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "FAQ", path: "/faq" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "/terms-of-service" },
                { name: "Return Policy", path: "/return-policy" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-primary-foreground/80 hover:text-primary-foreground">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/20 text-center text-sm text-primary-foreground/70">
          <p>© {currentYear} Maripha Glassmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
