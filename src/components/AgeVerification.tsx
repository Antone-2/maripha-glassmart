import { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const AgeVerification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    useEffect(() => {
        // Check if user has already verified age
        const hasVerified = localStorage.getItem("age_verified");

        if (!hasVerified) {
            // Show age verification modal
            setIsOpen(true);
        } else {
            setIsVerified(true);
        }
    }, []);

    const handleVerify = (isAdult: boolean) => {
        if (isAdult) {
            localStorage.setItem("age_verified", "true");
            setIsVerified(true);
            setIsOpen(false);
        } else {
            // User is not of age, redirect or show message
            setIsVerified(false);
            window.location.href = "https://www.google.com";
        }
    };

    // Don't render if already verified
    if (isVerified === true) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open && isVerified !== false) {
                // Prevent closing without verification unless rejected
                setIsOpen(true);
            }
        }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                        <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-500" />
                    </div>
                    <DialogTitle className="text-xl font-display">
                        Age Verification Required
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        You must be 18 years or older to view this website and purchase our products.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 mt-4">
                    <Button
                        onClick={() => handleVerify(true)}
                        className="w-full"
                        size="lg"
                    >
                        I am 18 years or older
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => handleVerify(false)}
                        className="w-full"
                        size="lg"
                    >
                        I am under 18 years
                    </Button>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                    By entering this website, you confirm that you are of legal age to purchase products in your jurisdiction.
                </p>
            </DialogContent>
        </Dialog>
    );
};

export default AgeVerification;
