import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

// Import local images
import heroBg from "@/assets/hero-bg.jpg";
import luxuryShower from "@/assets/Luxury Shower Systems.jpg";
import premiumGlass from "@/assets/Premium Quality Glass.jpg";
import paintServices from "@/assets/Professional Paint Services.jpg";
import sanitaryWare from "@/assets/Sanitary Ware Collection.jpg";

// Hero slide data with high-quality images
const heroSlides = [
  {
    id: 1,
    image: premiumGlass,
    title: "Premium Quality Glass",
    subtitle: "Windows, Doors & Mirrors",
    description: "Transform your space with our premium clear float glass, tinted glass, and custom mirrors. Professional cutting and installation services available.",
    cta: "View Products",
    ctaLink: "/products",
  },
  {
    id: 2,
    image: paintServices,
    title: "Professional Paint Services",
    subtitle: "Interior & Exterior",
    description: "High-quality emulsion paints for interiors and weather-shield paints for exteriors. Wide range of colors with professional application services.",
    cta: "Get Quote",
    ctaLink: "/quote",
  },
  {
    id: 3,
    image: sanitaryWare,
    title: "Sanitary Ware Collection",
    subtitle: "Sinks, Taps & Toilets",
    description: "Complete bathroom solutions including sinks, mixer taps, toilets, and shower systems. Modern designs for every budget.",
    cta: "Explore Products",
    ctaLink: "/products",
  },
  {
    id: 4,
    image: luxuryShower,
    title: "Luxury Shower Systems",
    subtitle: "Rain Showers & Enclosures",
    description: "Upgrade your bathroom with our premium rain shower heads, glass enclosures, and complete shower column sets.",
    cta: "Request Quote",
    ctaLink: "/quote",
  },
];

const HeroSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const promises = heroSlides.map((slide) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          img.src = slide.image;
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  const handleCall = () => {
    window.location.href = "tel:+254728508906";
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/254728508906?text=Hello%20Maripha%20Glassmart!", "_blank");
  };

  // Auto-advance slides
  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  const scrollToSlide = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Carousel Background */}
      <div className="absolute inset-0">
        {/* Background Image - Always visible */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: `url(${currentSlide.image})`,
            opacity: imagesLoaded ? 1 : 0
          }}
          role="img"
          aria-label={currentSlide.title}
        />

        {/* Light Gradient Overlay for text readability */}
        <div className="absolute inset-0 hero-gradient opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`relative w-12 h-2 rounded-full overflow-hidden transition-all duration-300 ${activeSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {activeSlide === index && imagesLoaded && (
              <div
                className="absolute inset-0 bg-accent origin-left"
                style={{ animation: 'progress 6s linear forwards' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => scrollToSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => scrollToSlide((activeSlide + 1) % heroSlides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {currentSlide.subtitle}
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {currentSlide.title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
            {currentSlide.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button variant="cta" size="xl" asChild>
              <Link to={currentSlide.ctaLink}>
                {currentSlide.cta}
              </Link>
            </Button>
            <Button variant="whatsapp" size="xl" onClick={handleWhatsApp} className="gap-3">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={handleCall}
              className="gap-3 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Quality Products
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Fast Delivery
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Expert Installation
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Trusted Since 2015
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center pt-2" role="img" aria-label="Scroll down">
          <div className="w-1.5 h-3 rounded-full bg-white/50" />
        </div>
      </div>

      {/* CSS for progress animation */}
      <style>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
