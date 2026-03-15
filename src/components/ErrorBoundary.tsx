import { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-background">
                    <Card className="max-w-md w-full">
                        <CardContent className="pt-6 pb-8 text-center">
                            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle className="w-8 h-8 text-destructive" />
                            </div>
                            <h1 className="text-2xl font-bold text-foreground mb-2">
                                Something went wrong
                            </h1>
                            <p className="text-muted-foreground mb-6">
                                We're sorry, but something unexpected happened. Please try again or contact support if the problem persists.
                            </p>
                            {this.state.error && (
                                <div className="bg-muted p-4 rounded-lg mb-6 text-left">
                                    <p className="text-xs text-muted-foreground font-mono break-all">
                                        {this.state.error.message || 'Unknown error'}
                                    </p>
                                </div>
                            )}
                            <div className="flex gap-4 justify-center">
                                <Button variant="outline" onClick={this.handleReset}>
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Try Again
                                </Button>
                                <Button asChild>
                                    <a href="/">
                                        <Home className="w-4 h-4 mr-2" />
                                        Go Home
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
