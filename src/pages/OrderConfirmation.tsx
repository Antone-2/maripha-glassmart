import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader2, CheckCircle, Package, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface Order {
    id: string;
    items: Array<{
        id: string;
        name: string;
        price: number;
        quantity: number;
        image: string;
    }>;
    total: number;
    status: string;
    shippingAddress: {
        name: string;
        phone: string;
        address: string;
        city: string;
        county: string;
    };
    paymentMethod: string;
    createdAt: string;
}

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const { toast } = useToast();
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${API_URL}/api/orders/${orderId}`);
                const data = await response.json();
                if (data.success) {
                    setOrder(data.order);
                }
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center">
                        <p className="text-muted-foreground mb-4">Order not found</p>
                        <Link to="/">
                            <Button>Go Home</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-12 px-4">
            <div className="container mx-auto max-w-2xl">
                <div className="text-center mb-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-display font-bold">Order Confirmed!</h1>
                    <p className="text-muted-foreground mt-2">
                        Thank you for your order. We'll process it shortly.
                    </p>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>Order Details</span>
                            <span className="text-sm font-normal text-muted-foreground">{order.id}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Package className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">Status:</span>
                            <span className="capitalize px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                                {order.status}
                            </span>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-medium mb-2">Items Ordered</h3>
                            {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm py-2">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="border-t mt-2 pt-2 font-bold flex justify-between">
                                <span>Total</span>
                                <span>KES {order.total.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-medium mb-2">Shipping Address</h3>
                            <p className="text-sm">{order.shippingAddress.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {order.shippingAddress.address}, {order.shippingAddress.city}
                            </p>
                            <p className="text-sm text-muted-foreground">{order.shippingAddress.county}</p>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-medium mb-2">Payment Method</h3>
                            <p className="text-sm capitalize">{order.paymentMethod}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>What's Next?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                            <Mail className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">Check your email</p>
                                <p className="text-xs text-muted-foreground">
                                    We've sent order confirmation to your email
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                                <p className="font-medium text-sm">We'll contact you</p>
                                <p className="text-xs text-muted-foreground">
                                    Our team will reach out for delivery arrangements
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex gap-4">
                    <Link to="/products" className="flex-1">
                        <Button variant="outline" className="w-full">
                            Continue Shopping
                        </Button>
                    </Link>
                    <Link to="/orders" className="flex-1">
                        <Button className="w-full">
                            View Orders
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
