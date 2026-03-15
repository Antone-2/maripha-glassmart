import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, Users, Truck, Shield } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Quality Products",
    description: "We source only the best materials from trusted manufacturers",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Knowledgeable staff to help you find the right products",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable delivery across Busia and surrounding counties",
  },
  {
    icon: Shield,
    title: "Warranty Support",
    description: "After-sales support and warranty on selected products",
  },
];

const AboutPreview = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-secondary text-primary text-sm font-medium mb-4">
              About Maripha Glassmart
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your Trusted Partner for Building & Home Improvement
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Since 2015, Maripha Glassmart has been serving homeowners, contractors, and businesses in 
              Busia and Western Kenya with premium quality glass, paints, and sanitary ware. We take 
              pride in offering reliable products at affordable prices, backed by excellent customer service.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Whether you're building a new home, renovating, or need replacement parts, our experienced 
              team is here to help you find the perfect products for your project.
            </p>
            <Button variant="default" size="lg" asChild>
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-secondary card-elevated"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
