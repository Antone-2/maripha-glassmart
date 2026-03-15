import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    inStock: boolean;
}

interface RecentlyViewedProps {
    currentProductId?: string;
}

const RecentlyViewed = ({ currentProductId }: RecentlyViewedProps) => {
    const [viewedProducts, setViewedProducts] = useState<Product[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Get recently viewed products from localStorage
        const stored = localStorage.getItem("recently_viewed");
        if (stored) {
            try {
                const products = JSON.parse(stored);
                // Filter out current product if viewing a product detail
                const filtered = currentProductId
                    ? products.filter((p: Product) => p._id !== currentProductId)
                    : products;
                setViewedProducts(filtered.slice(0, 4)); // Show max 4
                setIsVisible(filtered.length > 0);
            } catch (e) {
                console.error("Error parsing recently viewed:", e);
            }
        }
    }, [currentProductId]);

    if (!isVisible || viewedProducts.length === 0) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-KE", {
            style: "currency",
            currency: "KES",
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-6">
                    <Clock className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-2xl font-bold">Recently Viewed</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {viewedProducts.map((product) => (
                        <Card key={product._id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                            <Link to={`/product-detail/${product._id}`}>
                                <div className="aspect-square overflow-hidden bg-muted">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <CardContent className="p-4">
                                    <p className="text-xs text-muted-foreground mb-1">
                                        {product.category}
                                    </p>
                                    <h3 className="font-medium line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-primary">
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.inStock ? (
                                            <Badge variant="secondary" className="text-xs">
                                                In Stock
                                            </Badge>
                                        ) : (
                                            <Badge variant="destructive" className="text-xs">
                                                Out of Stock
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>

                {viewedProducts.length > 4 && (
                    <div className="mt-6 text-center">
                        <Link to="/products">
                            <Button variant="outline" className="gap-2">
                                View All Recently Viewed
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentlyViewed;

// Helper function to add a product to recently viewed
export const addToRecentlyViewed = (product: Product) => {
    const stored = localStorage.getItem("recently_viewed");
    let products: Product[] = [];

    if (stored) {
        try {
            products = JSON.parse(stored);
        } catch (e) {
            products = [];
        }
    }

    // Remove if already exists (to move to front)
    products = products.filter((p) => p._id !== product._id);

    // Add to front
    products.unshift(product);

    // Keep only last 12
    products = products.slice(0, 12);

    localStorage.setItem("recently_viewed", JSON.stringify(products));
};
