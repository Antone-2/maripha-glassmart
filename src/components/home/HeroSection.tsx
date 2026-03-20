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
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden">
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

        {/* Light Gradient Overlay for text readability - stronger on mobile */}
        <div className="absolute inset-0 hero-gradient opacity-50 md:opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/50 md:via-transparent md:to-transparent" />
      </div>

      {/* Carousel Indicators - smaller on mobile */}
      <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`relative w-8 md:w-12 h-1.5 md:h-2 rounded-full overflow-hidden transition-all duration-300 ${activeSlide === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
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

      {/* Navigation Arrows - hidden on mobile, visible on md+ */}
      <button
        onClick={() => scrollToSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => scrollToSlide((activeSlide + 1) % heroSlides.length)}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-16 md:pt-0">
        <div className="max-w-2xl md:max-w-3xl">
          {/* Badge - smaller on mobile */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs md:text-sm font-medium mb-4 md:mb-6 border border-white/20">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent animate-pulse" />
            <span className="hidden sm:inline">{currentSlide.subtitle}</span>
            <span className="sm:hidden">{currentSlide.subtitle.split(' & ')[0]}</span>
          </div>

          {/* Title - smaller on mobile */}
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-3 md:mb-6">
            {currentSlide.title}
          </h1>

          {/* Description - shorter on mobile */}
          <p className="text-sm md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 max-w-xl leading-relaxed hidden md:block">
            {currentSlide.description}
          </p>
          <p className="text-sm md:text-lg text-white/90 mb-6 md:mb-8 max-w-xl leading-relaxed md:hidden">
            {currentSlide.description.split('.')[0]}.
          </p>

          {/* CTAs - stacked on mobile, compact */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mb-8 md:mb-12">
            <Button variant="cta" size="lg" asChild className="text-sm md:text-base">
              <Link to={currentSlide.ctaLink}>
                {currentSlide.cta}
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button
                variant="whatsapp"
                size="lg"
                onClick={handleWhatsApp}
                className="flex-1 md:flex-none gap-1.5 md:gap-3 text-sm md:text-base px-3 md:px-6"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">WhatsApp Us</span>
                <span className="sm:hidden">Chat</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleCall}
                className="gap-1.5 md:gap-3 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 text-sm md:text-base px-3 md:px-6"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                <span className="hidden sm:inline">Call Now</span>
                <span className="sm:hidden">Call</span>
              </Button>
            </div>
          </div>

          {/* Trust Badges - reduced on mobile */}
          <div className="flex flex-wrap gap-3 md:gap-6 text-white/80 text-xs md:text-sm">
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent" />
              <span className="hidden sm:inline">Quality Products</span>
              <span className="sm:hidden">Quality</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent" />
              <span className="hidden sm:inline">Fast Delivery</span>
              <span className="sm:hidden">Fast</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Expert Installation
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Trusted Since 2015
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
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
