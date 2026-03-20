import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

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
  {
    id: 4,
    name: "Sarah Nekesa",
    role: "Business Owner",
    content: "Ordered glass mirrors for my salon. The quality exceeded my expectations and the delivery was on time. Will definitely order again!",
    rating: 5,
  },
  {
    id: 5,
    name: "David Omolo",
    role: "Architect",
    content: "As an architect, I need reliable suppliers. Maripha has been my go-to for all glass and sanitary ware projects. Professional service always.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Pause auto-play on hover/touch
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
            Join hundreds of satisfied customers
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleMouseEnter}
          onTouchEnd={handleMouseLeave}
        >
          {/* Testimonial Card */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                  <Card className="bg-card card-elevated mx-auto max-w-2xl">
                    <CardContent className="p-6 md:p-8">
                      <Quote className="w-8 h-8 md:w-10 md:h-10 text-accent/40 mb-4" />
                      <p className="text-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 mb-2 md:mb-0">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-accent text-accent" />
                          ))}
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground text-sm md:text-base">{testimonial.name}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - hidden on mobile */}
          <button
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:translate-x-0 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm items-center justify-center text-foreground hover:bg-background transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-0 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm items-center justify-center text-foreground hover:bg-background transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 md:gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${activeIndex === index
                    ? "bg-accent w-6 md:w-8"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
