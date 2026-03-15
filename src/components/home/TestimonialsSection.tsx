import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "John Ochieng",
    role: "Homeowner, Busia",
    content: "Maripha Glassmart supplied all the glass for my new house. Excellent quality and the team was very professional with installation. Highly recommend!",
    rating: 5,
  },
  {
    id: 2,
    name: "Grace Akinyi",
    role: "Interior Designer",
    content: "I always refer my clients to Maripha for paints and bathroom fittings. Great variety, fair prices, and they never disappoint on delivery.",
    rating: 5,
  },
  {
    id: 3,
    name: "Peter Wanyama",
    role: "Contractor, Kakamega",
    content: "Working with Maripha Glassmart for over 3 years now. They understand construction needs and always deliver quality products on time.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of satisfied customers across Western Kenya
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card card-elevated">
              <CardContent className="p-6">
                <Quote className="w-10 h-10 text-accent/40 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
