import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useStore } from "@/store/useStore";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const Login = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { login } = useStore();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [resendingVerification, setResendingVerification] = useState(false);
    const [verificationEmail, setVerificationEmail] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleResendVerification = async () => {
        if (!verificationEmail) return;

        setResendingVerification(true);
        try {
            const response = await fetch(`${API_URL}/api/auth/resend-verification`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: verificationEmail }),
            });

            const data = await response.json();

            toast({
                title: data.success ? "Email sent!" : "Error",
                description: data.message,
                variant: data.success ? "default" : "destructive",
            });

            if (data.success) {
                setVerificationEmail("");
            }
        } catch (error) {
            toast({
                title: "Connection error",
                description: "Unable to connect to server. Please try again.",
                variant: "destructive",
            });
        } finally {
            setResendingVerification(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                // Store user in global state
                login(data.user, data.token);

                toast({
                    title: "Welcome back!",
                    description: `Hello, ${data.user.name}! You have successfully logged in.`,
                });

                navigate("/");
            } else {
                // Check if user needs email verification
                if (data.needsVerification) {
                    setVerificationEmail(data.email);
                    toast({
                        title: "Email verification required",
                        description: data.error,
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Login failed",
                        description: data.error || "Invalid email or password",
                        variant: "destructive",
                    });
                }
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-12 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary font-display font-bold text-2xl">M</span>
                    </div>
                    <CardTitle className="text-2xl">Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to your account to continue
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    className="pl-10"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pl-10 pr-10"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Verification resend section */}
                        {verificationEmail && (
                            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm text-amber-800 font-medium">
                                            Your email is not verified
                                        </p>
                                        <p className="text-sm text-amber-700 mt-1">
                                            Please check your inbox for the verification email or request a new one:
                                        </p>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="mt-2 border-amber-300 text-amber-800 hover:bg-amber-100"
                                            onClick={handleResendVerification}
                                            disabled={resendingVerification}
                                        >
                                            {resendingVerification ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                "Resend verification email"
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                        <p className="text-center text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Login;
