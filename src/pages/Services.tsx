import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Wrench, Ruler, Truck, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Scissors,
    title: "Glass Cutting & Sizing",
    description: "Professional glass cutting to your exact specifications. We handle all sizes and shapes for windows, doors, tabletops, and more.",
    benefits: [
      "Precise measurements and cuts",
      "All glass types: clear, tinted, frosted",
      "Edge finishing available",
      "Quick turnaround time",
    ],
    cta: "Get your glass cut to size",
  },
  {
    icon: Wrench,
    title: "Installation Services",
    description: "Expert installation of glass, mirrors, sinks, taps, toilets, and showers. Our skilled technicians ensure proper fitting and functionality.",
    benefits: [
      "Experienced installation team",
      "All products we sell",
      "Clean and professional work",
      "Warranty on workmanship",
    ],
    cta: "Book installation",
  },
  {
    icon: Ruler,
    title: "Site Visits & Measurements",
    description: "We come to your location to take accurate measurements for glass, mirrors, and bathroom installations. Ensures perfect fit.",
    benefits: [
      "Free site assessment",
      "Accurate measurements",
      "Expert recommendations",
      "Quote on the spot",
    ],
    cta: "Schedule a visit",
  },
  {
    icon: Truck,
    title: "Delivery Services",
    description: "Safe and timely delivery of your products across Busia, Kisumu, Kakamega, and surrounding areas. Careful handling guaranteed.",
    benefits: [
      "Careful product handling",
      "Flexible scheduling",
      "Multiple counties covered",
      "Affordable delivery rates",
    ],
    cta: "Arrange delivery",
  },
];

const Services = () => {
  const handleCall = () => {
    window.location.href = "tel:+254728508906";
  };

  const handleWhatsApp = (service: string) => {
    const message = encodeURIComponent(`Hello Maripha Glassmart! I'm interested in your ${service} service.`);
    window.open(`https://wa.me/254728508906?text=${message}`, "_blank");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium mb-6 backdrop-blur-sm border border-primary-foreground/20">
              Our Services
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Professional Services for Your Project
            </h1>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Beyond quality products, we offer expert services to ensure your project is completed
              to the highest standards. From cutting to installation to delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {services.map((service, index) => (
              <Card key={service.title} className="overflow-hidden card-elevated">
                <div className={`grid lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <CardContent className="p-8 lg:p-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                      <service.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-foreground">
                          <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="cta"
                        onClick={() => handleWhatsApp(service.title)}
                        className="gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        {service.cta}
                      </Button>
                      <Button variant="outline" onClick={handleCall} className="gap-2">
                        <Phone className="w-5 h-5" />
                        Call to Inquire
                      </Button>
                    </div>
                  </CardContent>
                  <div className={`bg-secondary p-8 lg:p-10 flex items-center justify-center ${index % 2 === 1 ? "lg:order-first" : ""}`}>
                    <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-16 h-16 text-primary" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Getting our services is easy. Here's how to get started.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Contact Us", desc: "Call, WhatsApp, or visit our shop" },
              { step: "2", title: "Discuss Needs", desc: "Tell us about your project" },
              { step: "3", title: "Get Quote", desc: "Receive a detailed quote" },
              { step: "4", title: "We Deliver", desc: "Products delivered & installed" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground font-display font-bold text-2xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
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
              Ready to Get Started?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8">
              Contact us today to discuss your project requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="xl" asChild>
                <Link to="/quote">Request a Quote</Link>
              </Button>
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
