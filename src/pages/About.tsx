import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Award, Users, Truck, Shield, Target, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Award,
    title: "Quality First",
    description: "We only stock products that meet our high standards for durability and performance.",
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Our experienced team is dedicated to helping you find the right solutions for your needs.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description: "Timely delivery across Busia, Kisumu, Kakamega, and surrounding areas.",
  },
  {
    icon: Shield,
    title: "Trust & Integrity",
    description: "Honest pricing, genuine products, and transparent business practices.",
  },
  {
    icon: Target,
    title: "Expert Advice",
    description: "Get professional guidance on product selection, sizing, and installation.",
  },
  {
    icon: Heart,
    title: "Community Support",
    description: "Proudly supporting local construction and home improvement projects since 2015.",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Building Trust, One Project at a Time
            </h1>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Since 2015, Maripha Glassmart has been the trusted destination for quality glass, 
              paints, and sanitary ware in Busia and Western Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Maripha Glassmart was founded in 2015 with a simple mission: to provide quality 
                  building materials at fair prices to the people of Busia and beyond. What started 
                  as a small glass shop has grown into a comprehensive supplier of glass, mirrors, 
                  paints, and complete bathroom solutions.
                </p>
                <p>
                  Over the years, we've served thousands of homeowners, contractors, and businesses, 
                  earning a reputation for reliability, quality products, and excellent customer service. 
                  Our team understands the local construction landscape and is committed to helping 
                  each customer find the right products for their specific needs.
                </p>
                <p>
                  Today, Maripha Glassmart stands as a trusted name in the region, known for our 
                  extensive product range, competitive prices, and dedication to customer satisfaction. 
                  We continue to expand our offerings while maintaining the personal touch that has 
                  defined our business from the beginning.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-secondary text-center">
                <p className="font-display text-4xl font-bold text-primary mb-2">8+</p>
                <p className="text-muted-foreground">Years in Business</p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary text-center">
                <p className="font-display text-4xl font-bold text-primary mb-2">2000+</p>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary text-center">
                <p className="font-display text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-muted-foreground">Products Available</p>
              </div>
              <div className="p-6 rounded-2xl bg-secondary text-center">
                <p className="font-display text-4xl font-bold text-primary mb-2">4</p>
                <p className="text-muted-foreground">Counties Served</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To be the most trusted supplier of quality building materials in Western Kenya, 
              providing our customers with reliable products, expert advice, and exceptional 
              service that helps bring their construction and renovation dreams to life.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Maripha Glassmart
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 rounded-2xl bg-secondary card-elevated">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Visit Us Today
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8">
              Come see our products in person and let us help you with your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" asChild>
                <Link to="/contact">Get Directions</Link>
              </Button>
              <Button variant="hero" size="lg" asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
