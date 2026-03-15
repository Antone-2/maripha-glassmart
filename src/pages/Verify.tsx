import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const API_URL = import.meta.env.VITE_API_URL || '';

const Verify = () => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState("Verifying your email...");

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                setStatus('error');
                setMessage("Invalid verification link.");
                return;
            }

            try {
                const response = await fetch(`${API_URL}/api/auth/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await response.json();

                if (data.success) {
                    setStatus('success');
                    setMessage(data.message || "Email verified successfully!");
                } else {
                    setStatus('error');
                    setMessage(data.error || "Verification failed.");
                }
            } catch (error) {
                setStatus('error');
                setMessage("Unable to connect to server. Please try again.");
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 py-12 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${status === 'loading' ? 'bg-primary/10' :
                        status === 'success' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                        {status === 'loading' ? (
                            <Loader2 className="h-8 w-8 text-primary animate-spin" />
                        ) : status === 'success' ? (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        ) : (
                            <XCircle className="h-8 w-8 text-red-600" />
                        )}
                    </div>
                    <CardTitle className="text-2xl">
                        {status === 'loading' ? 'Verifying Email' :
                            status === 'success' ? 'Email Verified!' : 'Verification Failed'}
                    </CardTitle>
                    <CardDescription>
                        {message}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    {status === 'success' && (
                        <Button onClick={() => navigate("/login")}>
                            Proceed to Login
                        </Button>
                    )}
                    {status === 'error' && (
                        <div className="text-center space-y-2">
                            <p className="text-sm text-muted-foreground">
                                The verification link may have expired or is invalid.
                            </p>
                            <Button variant="outline" onClick={() => navigate("/login")}>
                                Go to Login
                            </Button>
                        </div>
                    )}
                    {status === 'loading' && (
                        <p className="text-sm text-muted-foreground">
                            Please wait while we verify your email address...
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Verify;
