import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag, Trash2, MessageCircle } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Link } from "react-router-dom";

// Hardcoded products data (same as Products page)
const products = [
    {
        id: 1,
        name: "Clear Float Glass",
        category: "glass",
        description: "Premium quality clear float glass for windows and doors. Available in 4mm, 5mm, 6mm, and 12mm thickness.",
        price: "From KSH 800/sqm",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
    {
        id: 2,
        name: "Tinted Glass",
        category: "glass",
        description: "Solar control tinted glass in bronze, grey, and green. Reduces heat and glare.",
        price: "From KSH 1,200/sqm",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    },
    {
        id: 3,
        name: "Frameless Wall Mirror",
        category: "glass",
        description: "Beveled edge decorative mirror for bathrooms and living spaces. Various sizes available.",
        price: "From KSH 3,200",
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=300&fit=crop",
    },
    {
        id: 4,
        name: "Glass Shelves",
        category: "glass",
        description: "Tempered glass shelves for display and storage. Safe, stylish, and durable.",
        price: "From KSH 1,500",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=300&fit=crop",
    },
    {
        id: 5,
        name: "Interior Emulsion Paint",
        category: "paints",
        description: "High-quality water-based emulsion paint for interior walls. Smooth finish, easy application.",
        price: "KSH 2,500/20L",
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
    },
    {
        id: 6,
        name: "Exterior Weather Shield",
        category: "paints",
        description: "Durable exterior paint with weather protection. Long-lasting color retention.",
        price: "KSH 3,500/20L",
        image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&h=300&fit=crop",
    },
    {
        id: 7,
        name: "Primer & Undercoat",
        category: "paints",
        description: "Professional grade primer for new surfaces. Ensures better paint adhesion.",
        price: "KSH 1,800/20L",
        image: "https://images.unsplash.com/photo-1558618047-f6e7c5b1e7e3?w=400&h=300&fit=crop",
    },
    {
        id: 8,
        name: "Stainless Steel Kitchen Sink",
        category: "sinks",
        description: "Double bowl stainless steel sink with drainer. Durable and easy to clean.",
        price: "KSH 8,500",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
    },
    {
        id: 9,
        name: "Ceramic Bathroom Basin",
        category: "sinks",
        description: "Elegant ceramic wash basin for bathrooms. Various designs available.",
        price: "From KSH 4,500",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    },
    {
        id: 10,
        name: "Kitchen Mixer Tap",
        category: "sinks",
        description: "Chrome finish kitchen mixer with swivel spout. Hot and cold water control.",
        price: "KSH 3,800",
        image: "https://images.unsplash.com/photo-1584622781867-1c5e27c4b1e5?w=400&h=300&fit=crop",
    },
    {
        id: 11,
        name: "Close-Coupled Toilet Set",
        category: "toilets",
        description: "Complete WC set with cistern, seat, and fittings. Dual flush system.",
        price: "KSH 12,000",
        image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=400&h=300&fit=crop",
    },
    {
        id: 12,
        name: "Wall-Hung Toilet",
        category: "toilets",
        description: "Modern wall-mounted toilet with concealed cistern. Space-saving design.",
        price: "KSH 25,000",
        image: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=400&h=300&fit=crop",
    },
    {
        id: 13,
        name: "Toilet Seat (Soft Close)",
        category: "toilets",
        description: "Universal soft-close toilet seat. Easy to install and clean.",
        price: "KSH 2,500",
        image: "https://images.unsplash.com/photo-1584622781867-1c5e27c4b1e5?w=400&h=300&fit=crop",
    },
    {
        id: 14,
        name: "Rain Shower Head",
        category: "showers",
        description: "8-inch stainless steel rain shower head with wall arm. Luxury shower experience.",
        price: "KSH 4,500",
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop",
    },
    {
        id: 15,
        name: "Shower Column Set",
        category: "showers",
        description: "Complete shower column with overhead, hand shower, and mixer. Modern design.",
        price: "KSH 18,000",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    },
    {
        id: 16,
        name: "Glass Shower Enclosure",
        category: "showers",
        description: "Frameless tempered glass shower enclosure. Custom sizes available.",
        price: "From KSH 35,000",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
    },
];

const Wishlist = () => {
    const wishlist = useStore((state) => state.wishlist);
    const removeFromWishlist = useStore((state) => state.removeFromWishlist);
    const addToCart = useStore((state) => state.addToCart);

    const wishlistProducts = products.filter((product) => wishlist.includes(String(product.id)));

    const handleAddToCart = (product: typeof products[0]) => {
        addToCart({
            id: String(product.id),
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
        });
        removeFromWishlist(String(product.id));
    };

    const handleWhatsApp = (productName: string) => {
        const message = encodeURIComponent(`Hello Maripha Glassmart! I'm interested in: ${productName}`);
        window.open(`https://wa.me/254728508906?text=${message}`, "_blank");
    };

    if (wishlistProducts.length === 0) {
        return (
            <Layout>
                <section className="py-12 lg:py-16 hero-gradient">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl">
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                                Your Wishlist
                            </h1>
                            <p className="text-primary-foreground/90">
                                Save your favorite products for later.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 lg:py-16 bg-background">
                    <div className="container mx-auto px-4 text-center">
                        <Heart className="w-24 h-24 mx-auto text-muted-foreground mb-6" />
                        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Browse our products and add items to your wishlist.
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
                            Your Wishlist
                        </h1>
                        <p className="text-primary-foreground/90">
                            {wishlistProducts.length} saved product{wishlistProducts.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12 lg:py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlistProducts.map((product) => (
                            <Card key={product.id} className="overflow-hidden card-elevated bg-card">
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                                <CardContent className="p-5">
                                    <h3 className="font-display font-semibold text-lg text-foreground mt-1 mb-2">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <div className="flex items-center justify-between pt-3 border-t border-border">
                                        <span className="font-bold text-primary">{product.price}</span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <Button
                                            variant="cta"
                                            size="sm"
                                            className="flex-1 gap-1"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <ShoppingBag className="w-4 h-4" />
                                            Add to Cart
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="gap-1"
                                            onClick={() => handleWhatsApp(product.name)}
                                        >
                                            <MessageCircle className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFromWishlist(String(product.id))}
                                            className="text-muted-foreground hover:text-destructive"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-8">
                        <Button variant="outline" asChild>
                            <Link to="/products">Continue Browsing</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Wishlist;
