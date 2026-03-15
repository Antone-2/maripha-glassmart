import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

const MapSection = () => {
  const handleGetDirections = () => {
    window.open("https://www.google.com/maps/search/Maripha+Glassmart+Busia+Kenya", "_blank");
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Visit Our Shop
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Located in the heart of Busia Town. Come see our products in person!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Map Placeholder */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.62073888!2d34.1069!3d0.4604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177f1b5c1c0a5c3d%3A0x8c4e3b4b4b4b4b4b!2sBusia%2C%20Kenya!5e0!3m2!1sen!2ske!4v1620000000000!5m2!1sen!2ske"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Maripha Glassmart Location"
              className="w-full"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-secondary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    Our Address
                  </h3>
                  <p className="text-muted-foreground">
                    Maripha Glassmart<br />
                    Main Street, Busia Town<br />
                    Busia County, Kenya
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-secondary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    Contact Numbers
                  </h3>
                  <p className="text-muted-foreground">
                    Phone: +254 728 508 906<br />
                    WhatsApp: +254 728 508 906
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-secondary">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                    Opening Hours
                  </h3>
                  <p className="text-muted-foreground">
                    Monday - Saturday: 8:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="cta"
              size="lg"
              className="w-full gap-3"
              onClick={handleGetDirections}
            >
              <Navigation className="w-5 h-5" />
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
