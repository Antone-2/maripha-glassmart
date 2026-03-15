import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, ShoppingCart, CreditCard, Banknote, Smartphone, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/store/useStore";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface ShippingAddress {
    name: string;
    phone: string;
    address: string;
    city: string;
    county: string;
}

const Checkout = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { cart, clearCart, user, token } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "cash" | "bank">("cash");
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
        name: user?.name || "",
        phone: user?.phone || "",
        address: "",
        city: "",
        county: ""
    });

    const cartTotal = cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cart.length === 0) {
            toast({
                title: "Cart is empty",
                description: "Please add items to your cart before checkout.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const orderData = {
                userId: user?.id || "guest",
                userEmail: user?.email || "",
                items: cart.map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                total: cartTotal,
                shippingAddress,
                paymentMethod
            };

            const response = await fetch(`${API_URL}/api/orders/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();

            if (data.success) {
                clearCart();
                toast({
                    title: "Order placed successfully!",
                    description: `Your order ${data.order.id} has been placed. We'll contact you soon.`,
                });
                navigate(`/order-confirmation/${data.order.id}`);
            } else {
                toast({
                    title: "Order failed",
                    description: data.error || "Unable to place order. Please try again.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Connection error",
                description: "Unable to connect to server. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-12 px-4">
                <div className="container mx-auto max-w-2xl text-center">
                    <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-6">Add some products to your cart before checking out.</p>
                    <Link to="/products">
                        <Button>Browse Products</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/cart">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-display font-bold">Checkout</h1>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                            <CardDescription>{cart.length} items in cart</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <img
                                        src={item.image || "/placeholder.svg"}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{item.name}</p>
                                        <p className="text-muted-foreground text-sm">
                                            KES {parseFloat(item.price).toLocaleString()} x {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-medium">
                                        KES {(parseFloat(item.price) * item.quantity).toLocaleString()}
                                    </p>
                                </div>
                            ))}
                            <div className="border-t pt-4 mt-4">
                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>KES {cartTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Checkout Form */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Shipping Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={shippingAddress.name}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            value={shippingAddress.phone}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                                            placeholder="0712345678"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={shippingAddress.address}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                            placeholder="Street address"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City/Town</Label>
                                            <Input
                                                id="city"
                                                value={shippingAddress.city}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                                placeholder="Nairobi"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="county">County</Label>
                                            <Input
                                                id="county"
                                                value={shippingAddress.county}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, county: e.target.value })}
                                                placeholder="Nairobi"
                                                required
                                            />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Method</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup
                                    value={paymentMethod}
                                    onValueChange={(value) => setPaymentMethod(value as typeof paymentMethod)}
                                    className="space-y-3"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="cash" id="cash" />
                                        <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer">
                                            <Banknote className="w-4 h-4" />
                                            Cash on Delivery
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="mpesa" id="mpesa" />
                                        <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer">
                                            <Smartphone className="w-4 h-4" />
                                            M-Pesa
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="bank" id="bank" />
                                        <Label htmlFor="bank" className="flex items-center gap-2 cursor-pointer">
                                            <CreditCard className="w-4 h-4" />
                                            Bank Transfer
                                        </Label>
                                    </div>
                                </RadioGroup>

                                {paymentMethod === "mpesa" && (
                                    <div className="mt-4 p-4 bg-muted rounded-lg">
                                        <p className="text-sm">
                                            <strong>Pay via M-Pesa:</strong><br />
                                            1. Go to M-Pesa<br />
                                            2. Select "Pay Bill"<br />
                                            3. Enter Business No: <strong>000000</strong><br />
                                            4. Enter Account No: <strong>Your Order ID</strong><br />
                                            5. Enter amount and confirm
                                        </p>
                                    </div>
                                )}

                                {paymentMethod === "bank" && (
                                    <div className="mt-4 p-4 bg-muted rounded-lg">
                                        <p className="text-sm">
                                            <strong>Bank Details:</strong><br />
                                            Bank: <strong>Example Bank</strong><br />
                                            Account: <strong>1234567890</strong><br />
                                            Branch: <strong>Main Branch</strong><br />
                                            Reference: <strong>Your Order ID</strong>
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Check className="mr-2 h-4 w-4" />
                                    Place Order (KES {cartTotal.toLocaleString()})
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
