import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";

const LiveChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<{ from: string; text: string }[]>([
        { from: "bot", text: "Hello! Welcome to Maripha Glassmart. How can I help you today?" },
    ]);

    const handleSend = () => {
        if (!message.trim()) return;

        // Add user message
        setMessages((prev) => [...prev, { from: "user", text: message }]);

        // Simulate bot response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    from: "bot",
                    text: "Thank you for your message! For quick assistance, you can call us at +254 728 508 906 or WhatsApp us directly. You can also request a quote or browse our products.",
                },
            ]);
        }, 1000);

        setMessage("");
    };

    const handleQuickAction = (action: string) => {
        let response = "";
        switch (action) {
            case "products":
                response = "We offer glass & mirrors, paints, sinks & taps, toilets, and showers. Visit our Products page to browse!";
                break;
            case "quote":
                response = "To get a quote, click on 'Get a Quote' in our menu. Fill in your requirements and we'll respond within 24 hours!";
                break;
            case "contact":
                response = "You can reach us at +254 728 508 906, email info@mariphaglass.co.ke, or visit us at Main Street, Busia Town.";
                break;
            case "delivery":
                response = "We deliver across Western Kenya including Busia, Kisumu, Kakamega, Bungoma, and more! Delivery fees may apply based on location.";
                break;
        }
        setMessages((prev) => [...prev, { from: "user", text: action }]);
        setTimeout(() => {
            setMessages((prev) => [...prev, { from: "bot", text: response }]);
        }, 500);
    };

    return (
        <>
            {/* Chat Button */}
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-whatsapp hover:bg-whatsapp/90 z-50"
                style={{ display: isOpen ? "none" : "flex" }}
            >
                <MessageCircle className="w-6 h-6" />
            </Button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-background rounded-2xl shadow-2xl border z-50 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                                <MessageCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Maripha Glassmart</h3>
                                <p className="text-xs text-primary-foreground/80">Typically replies in minutes</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-primary-foreground hover:bg-primary-foreground/20"
                            >
                                <Minimize2 className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-primary-foreground hover:bg-primary-foreground/20"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.from === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-foreground"
                                        }`}
                                >
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="px-4 pb-2 flex flex-wrap gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleQuickAction("products")}
                        >
                            View Products
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleQuickAction("quote")}
                        >
                            Get Quote
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleQuickAction("contact")}
                        >
                            Contact Info
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => handleQuickAction("delivery")}
                        >
                            Delivery
                        </Button>
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 rounded-full border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button
                            onClick={handleSend}
                            size="icon"
                            className="rounded-full bg-primary hover:bg-primary/90"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
};

export default LiveChat;
