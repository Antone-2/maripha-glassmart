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

      <div className="container mx-auto px-4 py-8 md:py-10">
        {/* Mobile-friendly grid - single column on mobile, multi-column on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-display font-bold text-lg">M</span>
              </div>
              <h3 className="font-display font-bold text-lg">Maripha Glassmart</h3>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Quality glass, paints & sanitary ware in Busia, Kenya.
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              <a
                href="https://facebook.com/mariphaglass"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/mariphaglass"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/254728508906"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-2">
              <a
                href="tel:+254728508906"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>+254 728 508 906</span>
              </a>
              <a
                href="mailto:info@mariphaglass.co.ke"
                className="flex items-center gap-3 text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@mariphaglass.co.ke</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-base">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "Services", path: "/services" },
                { name: "Gallery", path: "/gallery" },
                { name: "Get Quote", path: "/quote" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors inline-block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4 text-base">Support</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: "FAQ", path: "/faq" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Service", path: "/terms-of-service" },
                { name: "Return Policy", path: "/return-policy" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors inline-block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 md:mt-10 pt-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-sm text-primary-foreground/70">
              © {currentYear} Maripha Glassmart. All rights reserved.
            </p>
            <p className="text-xs text-primary-foreground/50">
              Designed with quality in mind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
