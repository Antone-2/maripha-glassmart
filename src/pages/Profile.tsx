import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2, User, Mail, Phone, Lock, Save, Package, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/store/useStore";

const API_URL = import.meta.env.VITE_API_URL || '';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface Order {
    id: string;
    items: OrderItem[];
    total: number;
    status: string;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: string;
}

const Profile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { user, token, logout, isAuthenticated } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Orders state
    const [orders, setOrders] = useState<Order[]>([]);
    const [isOrdersLoading, setIsOrdersLoading] = useState(true);
    const [showOrders, setShowOrders] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    // Fetch orders when showOrders is toggled
    useEffect(() => {
        if (showOrders && isAuthenticated) {
            fetchOrders();
        }
    }, [showOrders, isAuthenticated]);

    const fetchOrders = async () => {
        setIsOrdersLoading(true);
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
                description: "Failed to load orders.",
                variant: "destructive",
            });
        } finally {
            setIsOrdersLoading(false);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Profile updated!",
                    description: "Your profile has been updated successfully.",
                });
                setIsEditing(false);
            } else {
                toast({
                    title: "Update failed",
                    description: data.error || "Unable to update profile.",
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

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast({
                title: "Passwords don't match",
                description: "Please make sure your passwords match.",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            const data = await response.json();

            if (data.success) {
                toast({
                    title: "Password changed!",
                    description: "Your password has been changed successfully.",
                });
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                toast({
                    title: "Password change failed",
                    description: data.error || "Unable to change password.",
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

    const handleLogout = () => {
        logout();
        toast({
            title: "Logged out",
            description: "You have been logged out successfully.",
        });
        navigate("/");
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'processing':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
            case 'delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-8 md:py-12 px-4">
            <div className="container mx-auto max-w-2xl">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold">My Profile</h1>
                        <p className="text-sm md:text-base text-muted-foreground">Manage your account settings</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={handleLogout} className="text-xs md:text-sm">
                        Logout
                    </Button>
                </div>

                <div className="space-y-4 md:space-y-6">
                    {/* Profile Information */}
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                                <User className="w-4 h-4 md:w-5 md:h-5" />
                                Profile Information
                            </CardTitle>
                            <CardDescription className="text-xs md:text-sm">
                                Update your personal information
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdateProfile} className="space-y-3 md:space-y-4">
                                <div className="space-y-1.5 md:space-y-2">
                                    <Label htmlFor="profile-name" className="text-xs md:text-sm">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="profile-name"
                                            type="text"
                                            placeholder="Your Name"
                                            className="pl-10 h-10 md:h-11"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <Label htmlFor="profile-email" className="text-xs md:text-sm">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="profile-email"
                                            type="email"
                                            className="pl-10 h-10 md:h-11 bg-muted"
                                            value={formData.email}
                                            disabled
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <Label htmlFor="profile-phone" className="text-xs md:text-sm">Phone Number</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="profile-phone"
                                            type="tel"
                                            placeholder="0712345678"
                                            className="pl-10 h-10 md:h-11"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                {isEditing && (
                                    <Button type="submit" disabled={isLoading} size="sm" className="h-9 md:h-10">
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                                                Save Changes
                                            </>
                                        )}
                                    </Button>
                                )}
                                {!isEditing && (
                                    <Button type="button" onClick={() => setIsEditing(true)} size="sm" className="h-9 md:h-10">
                                        Edit Profile
                                    </Button>
                                )}
                            </form>
                        </CardContent>
                    </Card>

                    {/* My Orders Section */}
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center justify-between text-base md:text-lg">
                                <span className="flex items-center gap-2">
                                    <Package className="w-4 h-4 md:w-5 md:h-5" />
                                    My Orders
                                </span>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowOrders(!showOrders)}
                                    className="text-xs md:text-sm"
                                >
                                    {showOrders ? 'Hide' : 'View'}
                                </Button>
                            </CardTitle>
                            <CardDescription className="text-xs md:text-sm">
                                {showOrders ? 'Your order history' : 'Click to view your order history'}
                            </CardDescription>
                        </CardHeader>

                        {showOrders && (
                            <CardContent>
                                {isOrdersLoading ? (
                                    <div className="flex items-center justify-center py-8">
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-6">
                                        <Package className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                                        <p className="text-sm text-muted-foreground mb-3">No orders yet</p>
                                        <Link to="/products">
                                            <Button size="sm">Browse Products</Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3 md:space-y-4">
                                        {orders.slice(0, 3).map((order) => (
                                            <div key={order.id} className="border rounded-lg p-3 md:p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="font-medium text-sm md:text-base">Order #{order.id}</span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mb-2">
                                                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                                    <span className="font-semibold">KES {order.total.toLocaleString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Link to={`/order-confirmation/${order.id}`} className="flex-1">
                                                        <Button variant="outline" size="sm" className="w-full h-8 md:h-9 text-xs md:text-sm">
                                                            <Eye className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                                                            View Details
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                        {orders.length > 3 && (
                                            <Link to="/orders">
                                                <Button variant="ghost" size="sm" className="w-full text-xs md:text-sm">
                                                    View all {orders.length} orders
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        )}
                    </Card>

                    {/* Change Password */}
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                                <Lock className="w-4 h-4 md:w-5 md:h-5" />
                                Change Password
                            </CardTitle>
                            <CardDescription className="text-xs md:text-sm">
                                Update your password to keep your account secure
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleChangePassword} className="space-y-3 md:space-y-4">
                                <div className="space-y-1.5 md:space-y-2">
                                    <Label htmlFor="currentPassword" className="text-xs md:text-sm">Current Password</Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        className="h-10 md:h-11"
                                        value={passwordData.currentPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <Label htmlFor="newPassword" className="text-xs md:text-sm">New Password</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        className="h-10 md:h-11"
                                        value={passwordData.newPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <div className="space-y-1.5 md:space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-xs md:text-sm">Confirm New Password</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        className="h-10 md:h-11"
                                        value={passwordData.confirmPassword}
                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button type="submit" disabled={isLoading} size="sm" className="h-9 md:h-10">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
                                            Changing...
                                        </>
                                    ) : (
                                        "Change Password"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Profile;
