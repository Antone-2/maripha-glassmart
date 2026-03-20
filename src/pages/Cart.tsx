import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useStore();
    const [isCheckout, setIsCheckout] = useState(false);
    const [checkoutData, setCheckoutData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        notes: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Calculate totals
    const subtotal = cart.reduce((total, item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
        return total + price * item.quantity;
    }, 0);

    const shipping = subtotal > 0 ? 500 : 0; // Flat shipping rate
    const total = subtotal + shipping;

    const handleQuantityChange = (id: string, delta: number) => {
        const item = cart.find((i) => i.id === id);
        if (item) {
            updateQuantity(id, item.quantity + delta);
        }
    };

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Create order message for WhatsApp
        const orderDetails = cart
            .map((item) => `${item.name} x${item.quantity} = KSH ${(parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0) * item.quantity}`)
            .join("\n");

        const message = encodeURIComponent(
            `Hello Maripha Glassmart!\n\nI'd like to place an order:\n\n${orderDetails}\n\nTotal: KSH ${total}\n\nCustomer: ${checkoutData.name}\nPhone: ${checkoutData.phone}\nAddress: ${checkoutData.address}\n\nNotes: ${checkoutData.notes}`
        );

        // Open WhatsApp with order details
        window.open(`https://wa.me/254728508906?text=${message}`, "_blank");
        setIsSubmitting(false);
        clearCart();
        setIsCheckout(false);
    };

    const handleWhatsAppOrder = () => {
        if (cart.length === 0) return;

        const orderDetails = cart
            .map((item) => `${item.name} x${item.quantity} = KSH ${(parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0) * item.quantity}`)
            .join("\n");

        const message = encodeURIComponent(
            `Hello Maripha Glassmart!\n\nI'd like to place an order:\n\n${orderDetails}\n\nTotal: KSH ${total}`
        );

        window.open(`https://wa.me/254728508906?text=${message}`, "_blank");
    };

    if (cart.length === 0) {
        return (
            <Layout>
                <section className="py-12 lg:py-16 hero-gradient">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl">
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                                Your Cart
                            </h1>
                            <p className="text-primary-foreground/90">
                                Your cart is empty. Browse our products and add items to your cart.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 lg:py-16 bg-background">
                    <div className="container mx-auto px-4 text-center">
                        <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
                        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                            Your Cart is Empty
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Looks like you haven't added any products to your cart yet.
                        </p>
                        <Button variant="cta" size="lg" asChild>
                            <Link to="/products">Browse Products</Link>
                        </Button>
                    </div>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="py-12 lg:py-16 hero-gradient">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl">
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                            Your Cart
                        </h1>
                        <p className="text-primary-foreground/90">
                            Review your items and proceed to checkout.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 lg:py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <Card key={item.id} className="card-elevated">
                                    <CardContent className="p-4">
                                        <div className="flex gap-4">
                                            <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <h3 className="font-display font-semibold text-foreground">
                                                            {item.name}
                                                        </h3>
                                                        <p className="text-primary font-bold mt-1">
                                                            {item.price}
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-muted-foreground hover:text-destructive"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                                <div className="flex items-center gap-3 mt-4">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="w-8 h-8"
                                                        onClick={() => handleQuantityChange(item.id, -1)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </Button>
                                                    <span className="w-8 text-center font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="w-8 h-8"
                                                        onClick={() => handleQuantityChange(item.id, 1)}
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <div className="flex justify-between items-center pt-4">
                                <Button variant="outline" asChild>
                                    <Link to="/products">Continue Shopping</Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={clearCart}
                                    className="text-muted-foreground hover:text-destructive"
                                >
                                    Clear Cart
                                </Button>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="card-elevated sticky top-24">
                                <CardContent className="p-6">
                                    <h3 className="font-display font-semibold text-lg text-foreground mb-4">
                                        Order Summary
                                    </h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="font-medium">KSH {subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className="font-medium">KSH {shipping.toLocaleString()}</span>
                                        </div>
                                        <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                            <span>Total</span>
                                            <span className="text-primary">KSH {total.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {!isCheckout ? (
                                        <div className="mt-6 space-y-3">
                                            <Button
                                                variant="cta"
                                                className="w-full gap-2"
                                                asChild
                                            >
                                                <Link to="/checkout">
                                                    Proceed to Checkout
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="w-full gap-2"
                                                onClick={() => setIsCheckout(true)}
                                            >
                                                Quick Order (WhatsApp)
                                                <MessageCircle className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleCheckout} className="mt-6 space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="checkout-name">Your Name *</Label>
                                                <Input
                                                    id="checkout-name"
                                                    placeholder="Your Name"
                                                    value={checkoutData.name}
                                                    onChange={(e) =>
                                                        setCheckoutData({ ...checkoutData, name: e.target.value })
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="checkout-phone">Phone Number *</Label>
                                                <Input
                                                    id="checkout-phone"
                                                    type="tel"
                                                    placeholder="Phone number"
                                                    value={checkoutData.phone}
                                                    onChange={(e) =>
                                                        setCheckoutData({ ...checkoutData, phone: e.target.value })
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="checkout-email">Email (Optional)</Label>
                                                <Input
                                                    id="checkout-email"
                                                    type="email"
                                                    placeholder="Email Address"
                                                    value={checkoutData.email}
                                                    onChange={(e) =>
                                                        setCheckoutData({ ...checkoutData, email: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="checkout-address">Delivery Address *</Label>
                                                <Input
                                                    id="checkout-address"
                                                    placeholder="Your full address"
                                                    value={checkoutData.address}
                                                    onChange={(e) =>
                                                        setCheckoutData({ ...checkoutData, address: e.target.value })
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="checkout-notes">Notes (Optional)</Label>
                                                <Input
                                                    id="checkout-notes"
                                                    placeholder="Any special instructions"
                                                    value={checkoutData.notes}
                                                    onChange={(e) =>
                                                        setCheckoutData({ ...checkoutData, notes: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div className="flex gap-2 pt-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className="flex-1"
                                                    onClick={() => setIsCheckout(false)}
                                                >
                                                    Back
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="cta"
                                                    className="flex-1 gap-2"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? "Processing..." : "Place Order"}
                                                </Button>
                                            </div>
                                        </form>
                                    )}

                                    <div className="mt-6 pt-4 border-t">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Phone className="w-4 h-4" />
                                            <span>Need help? Call +254 728 508 906</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Cart;
