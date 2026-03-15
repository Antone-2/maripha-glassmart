import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
      <a
        href="https://wa.me/254728508906?text=Hello%20Maripha%20Glassmart!"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce-subtle"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};

export default FloatingButtons;
