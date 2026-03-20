import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Send, Minimize2 } from "lucide-react";

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
            {/* Chat Button - WhatsApp shaped container */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 shadow-lg bg-whatsapp hover:bg-whatsapp/90 z-50 rounded-2xl"
                style={{ display: isOpen ? "none" : "block", padding: '12px' }}
                aria-label="Open chat"
            >
                <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-background rounded-2xl shadow-2xl border z-50 flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
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
