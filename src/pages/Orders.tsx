import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Package, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/store/useStore";

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
    paymentMethod: string;
    paymentStatus: string;
    createdAt: string;
}

const Orders = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user, token, isAuthenticated } = useStore();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!isAuthenticated) {
                // Redirect to login for guest users
                toast({
                    title: "Login required",
                    description: "Please login to view your orders.",
                    variant: "destructive",
                });
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/orders/my-orders?userId=${user?.id}`, {
                    headers: {
                        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setOrders(data.orders);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
                toast({
                    title: "Error",
                    description: "Failed to load orders. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [isAuthenticated, user, token, navigate, toast]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-display font-bold">My Orders</h1>
                        <p className="text-muted-foreground">View and manage your order history</p>
                    </div>
                    <Link to="/products">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <Card>
                        <CardContent className="pt-6 text-center py-12">
                            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                            <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                            <p className="text-muted-foreground mb-6">
                                You haven't placed any orders yet. Start shopping to see your orders here.
                            </p>
                            <Link to="/products">
                                <Button>Browse Products</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <Card key={order.id}>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">
                                            Order #{order.id}
                                        </CardTitle>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h3 className="font-medium mb-2">Items</h3>
                                            <div className="space-y-2">
                                                {order.items.slice(0, 3).map((item, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                                        <img
                                                            src={item.image || "/placeholder.svg"}
                                                            alt={item.name}
                                                            className="w-10 h-10 object-cover rounded"
                                                        />
                                                        <span className="flex-1 truncate">{item.name}</span>
                                                        <span className="text-muted-foreground">x{item.quantity}</span>
                                                    </div>
                                                ))}
                                                {order.items.length > 3 && (
                                                    <p className="text-xs text-muted-foreground">
                                                        +{order.items.length - 3} more items
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Date</span>
                                                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Payment</span>
                                                <span className="capitalize">{order.paymentMethod}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Total</span>
                                                <span className="font-bold">KES {order.total.toLocaleString()}</span>
                                            </div>
                                            <Link to={`/order-confirmation/${order.id}`}>
                                                <Button variant="outline" className="w-full mt-2">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
