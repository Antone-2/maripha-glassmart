import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mailbox, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubscribing, setIsSubscribing] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const { toast } = useToast();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubscribing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubscribed(true);
        toast({
            title: "Welcome aboard! 🎉",
            description: "Thank you for subscribing to our newsletter.",
        });

        setIsSubscribing(false);
    };

    if (isSubscribed) {
        return (
            <section className="py-10 lg:py-12 bg-gradient-to-br from-primary via-primary to-blue-700 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                            You're Subscribed!
                        </h2>
                        <p className="text-white/80 text-lg mb-6">
                            Thank you for joining our community. You'll receive the latest updates on new products, special offers, and expert tips.
                        </p>
                        <Button
                            variant="secondary"
                            onClick={() => {
                                setIsSubscribed(false);
                                setEmail("");
                            }}
                        >
                            Subscribe Another Email
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-10 lg:py-12 bg-gradient-to-br from-primary via-primary to-blue-700 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                        <Mailbox className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                        Stay Updated!
                    </h2>
                    <p className="text-white/80 text-lg mb-8">
                        Subscribe to our newsletter for exclusive deals, new product announcements, and expert tips on glass, paints, and sanitary ware.
                    </p>

                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                        <Input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 h-12 bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/30"
                            required
                        />
                        <Button
                            type="submit"
                            variant="secondary"
                            size="lg"
                            className="h-12 px-6 gap-2"
                            disabled={isSubscribing}
                        >
                            {isSubscribing ? (
                                <span className="animate-pulse">Subscribing...</span>
                            ) : (
                                <>
                                    Subscribe
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="text-white/60 text-sm mt-4">
                        🔒 We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto text-center">
                    <div>
                        <p className="text-3xl font-bold text-white">5K+</p>
                        <p className="text-white/70 text-sm">Subscribers</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">10+</p>
                        <p className="text-white/70 text-sm">Years Experience</p>
                    </div>
                    <div>
                        <p className="text-3xl font-bold text-white">100%</p>
                        <p className="text-white/70 text-sm">Satisfaction</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
