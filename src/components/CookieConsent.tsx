import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const hasConsented = localStorage.getItem("cookie_consent");
        if (!hasConsented) {
            // Show after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie_consent", "accepted");
        animateOut();
    };

    const handleDecline = () => {
        localStorage.setItem("cookie_consent", "declined");
        animateOut();
    };

    const animateOut = () => {
        setIsAnimatingOut(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    if (!isVisible) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300 ${isAnimatingOut ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
                }`}
        >
            <div className="container mx-auto max-w-4xl">
                <div className="bg-card border border-border rounded-xl shadow-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Cookie className="w-6 h-6 text-primary" />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-display font-semibold text-lg mb-1">
                            We value your privacy
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            We use cookies to enhance your browsing experience, serve personalized content,
                            and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDecline}
                            className="w-full md:w-auto"
                        >
                            Decline
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleAccept}
                            className="w-full md:w-auto"
                        >
                            Accept All
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
