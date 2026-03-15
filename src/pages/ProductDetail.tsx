import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, ShoppingCart, Heart, Check, MessageCircle, ArrowLeft, Star, Truck, Shield, Clock } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useToast } from "@/hooks/use-toast";
import RecentlyViewed, { addToRecentlyViewed } from "@/components/RecentlyViewed";
import SocialShare from "@/components/SocialShare";

// Hardcoded products data
const products = [
    {
        id: 1,
        name: "Clear Float Glass",
        category: "glass",
        description: "Premium quality clear float glass for windows and doors. Available in 4mm, 5mm, 6mm, and 12mm thickness. Our clear float glass provides excellent optical clarity and is ideal for both residential and commercial applications. Each piece is carefully inspected to ensure uniform thickness and bubble-free quality.",
        features: ["4mm - 12mm thickness", "Custom cutting available", "Windows & doors", "Optical clarity", "Uniform thickness"],
        price: "From KSH 800/sqm",
        priceValue: 800,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.8,
        reviews: 24,
    },
    {
        id: 2,
        name: "Tinted Glass",
        category: "glass",
        description: "Solar control tinted glass in bronze, grey, and green. Reduces heat and glare while maintaining visibility. Perfect for buildings where climate control and privacy are priorities. Our tinted glass blocks up to 80% of solar heat and 99% of UV rays.",
        features: ["Bronze, grey, green options", "Heat reduction", "Privacy glass", "UV protection", "Energy efficient"],
        price: "From KSH 1,200/sqm",
        priceValue: 1200,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.6,
        reviews: 18,
    },
    {
        id: 3,
        name: "Frameless Wall Mirror",
        category: "glass",
        description: "Beveled edge decorative mirror for bathrooms and living spaces. Various sizes available. Our frameless mirrors feature polished edges and high-quality silver backing for a crystal-clear reflection that lasts for years.",
        features: ["Beveled edges", "Multiple sizes", "Wall mounting", "High-quality silver backing", "Polished edges"],
        price: "From KSH 3,200",
        priceValue: 3200,
        image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.9,
        reviews: 32,
    },
    {
        id: 4,
        name: "Glass Shelves",
        category: "glass",
        description: "Tempered glass shelves for display and storage. Safe, stylish, and durable. Our tempered glass shelves are heat-treated for strength and safety, capable of supporting significant weight while maintaining a sleek, modern appearance.",
        features: ["Tempered safety glass", "Various lengths", "Brackets included", "Weight capacity up to 50kg", "Easy installation"],
        price: "From KSH 1,500",
        priceValue: 1500,
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.7,
        reviews: 15,
    },
    {
        id: 5,
        name: "Interior Emulsion Paint",
        category: "paints",
        description: "High-quality water-based emulsion paint for interior walls. Smooth finish, easy application. Our interior emulsion paint provides excellent coverage and a durable finish that resists stains and can be easily wiped clean.",
        features: ["All colors available", "Washable finish", "Low odor", "Excellent coverage", "Quick drying"],
        price: "KSH 2,500/20L",
        priceValue: 2500,
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.5,
        reviews: 42,
    },
    {
        id: 6,
        name: "Exterior Weather Shield",
        category: "paints",
        description: "Durable exterior paint with weather protection. Long-lasting color retention. Our weather shield paint is specially formulated to withstand harsh African weather conditions, providing protection against rain, sun, and humidity.",
        features: ["Weather resistant", "UV protection", "5-year warranty", "Mold resistant", "Fade resistant"],
        price: "KSH 3,500/20L",
        priceValue: 3500,
        image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.8,
        reviews: 28,
    },
    {
        id: 7,
        name: "Primer & Undercoat",
        category: "paints",
        description: "Professional grade primer for new surfaces. Ensures better paint adhesion. Our primer prepares surfaces for painting by sealing porous materials and providing a uniform base for topcoats.",
        features: ["New surface prep", "Better adhesion", "Quick drying", "Seals porous surfaces", "Interior/exterior"],
        price: "KSH 1,800/20L",
        priceValue: 1800,
        image: "https://images.unsplash.com/photo-1558618047-f6e7c5b1e7e3?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.4,
        reviews: 19,
    },
    {
        id: 8,
        name: "Stainless Steel Kitchen Sink",
        category: "sinks",
        description: "Double bowl stainless steel sink with drainer. Durable and easy to clean. Made from high-quality 304 stainless steel, this sink is resistant to rust, stains, and heat. The modern design complements any kitchen style.",
        features: ["Double bowl design", "With drainer", "304 stainless steel", "Sound dampening", "Corrosion resistant"],
        price: "KSH 8,500",
        priceValue: 8500,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.7,
        reviews: 35,
    },
    {
        id: 9,
        name: "Ceramic Bathroom Basin",
        category: "sinks",
        description: "Elegant ceramic wash basin for bathrooms. Various designs available. Our ceramic basins feature a high-gloss finish that is easy to clean and maintain. Each piece is kiln-fired for durability.",
        features: ["Counter-top mount", "White ceramic", "Overflow included", "High-gloss finish", "Easy to clean"],
        price: "From KSH 4,500",
        priceValue: 4500,
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.6,
        reviews: 22,
    },
    {
        id: 10,
        name: "Kitchen Mixer Tap",
        category: "sinks",
        description: "Chrome finish kitchen mixer with swivel spout. Hot and cold water control. Our mixer taps feature ceramic disc technology for smooth, drip-free operation and long-lasting performance.",
        features: ["Swivel spout", "Hot/cold mixer", "Chrome finish", "Ceramic disc valves", "360° rotation"],
        price: "KSH 3,800",
        priceValue: 3800,
        image: "https://images.unsplash.com/photo-1584622781867-1c5e27c4b1e5?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.5,
        reviews: 29,
    },
    {
        id: 11,
        name: "Close-Coupled Toilet Set",
        category: "toilets",
        description: "Complete WC set with cistern, seat, and fittings. Dual flush system. Our close-coupled toilets feature a modern design with efficient water usage and easy-clean surfaces.",
        features: ["Dual flush", "Soft-close seat", "Complete set", "Water efficient", "Easy clean"],
        price: "KSH 12,000",
        priceValue: 12000,
        image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.8,
        reviews: 45,
    },
    {
        id: 12,
        name: "Wall-Hung Toilet",
        category: "toilets",
        description: "Modern wall-mounted toilet with concealed cistern. Space-saving design. Our wall-hung toilets create a sleek, minimalist look while saving valuable floor space.",
        features: ["Wall mounted", "Concealed cistern", "Modern design", "Space saving", "Easy cleaning"],
        price: "KSH 25,000",
        priceValue: 25000,
        image: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=800&h=600&fit=crop",
        inStock: false,
        rating: 4.9,
        reviews: 18,
    },
    {
        id: 13,
        name: "Toilet Seat (Soft Close)",
        category: "toilets",
        description: "Universal soft-close toilet seat. Easy to install and clean. Fits most standard toilets and features slow-close hinges that prevent slamming.",
        features: ["Soft close mechanism", "Easy clean", "Universal fit", "Quick release", "Anti-bacterial"],
        price: "KSH 2,500",
        priceValue: 2500,
        image: "https://images.unsplash.com/photo-1584622781867-1c5e27c4b1e5?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.6,
        reviews: 31,
    },
    {
        id: 14,
        name: "Rain Shower Head",
        category: "showers",
        description: "8-inch stainless steel rain shower head with wall arm. Luxury shower experience. Our rain shower heads deliver a gentle, spa-like shower experience that relaxes and rejuvenates.",
        features: ["8-inch diameter", "Stainless steel", "Wall mount arm", "360° rotation", "Anti-clog"],
        price: "KSH 4,500",
        priceValue: 4500,
        image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.7,
        reviews: 26,
    },
    {
        id: 15,
        name: "Shower Column Set",
        category: "showers",
        description: "Complete shower column with overhead, hand shower, and mixer. Modern design. Everything you need for a luxurious shower experience in one complete package.",
        features: ["Overhead shower", "Hand shower", "Thermostatic mixer", "Body jets", "LED indicator"],
        price: "KSH 18,000",
        priceValue: 18000,
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.9,
        reviews: 14,
    },
    {
        id: 16,
        name: "Glass Shower Enclosure",
        category: "showers",
        description: "Frameless tempered glass shower enclosure. Custom sizes available. Our shower enclosures are made from thick, tempered safety glass with premium hardware for a durable, elegant solution.",
        features: ["Tempered glass", "Frameless design", "Custom sizing", "Easy clean coating", "Leak-proof seal"],
        price: "From KSH 35,000",
        priceValue: 35000,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop",
        inStock: true,
        rating: 4.8,
        reviews: 20,
    },
];

const categories = [
    { id: "all", name: "All Products" },
    { id: "glass", name: "Glass & Mirrors" },
    { id: "paints", name: "Paints" },
    { id: "sinks", name: "Sinks & Taps" },
    { id: "toilets", name: "Toilets" },
    { id: "showers", name: "Showers & Accessories" },
];

const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const addToCart = useStore((state) => state.addToCart);
    const wishlist = useStore((state) => state.wishlist);
    const addToWishlist = useStore((state) => state.addToWishlist);
    const removeFromWishlist = useStore((state) => state.removeFromWishlist);
    const { toast } = useToast();

    const product = products.find((p) => p.id === parseInt(id || "0"));
    const relatedProducts = products
        .filter((p) => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Track recently viewed
        if (product) {
            addToRecentlyViewed({
                _id: String(product.id),
                name: product.name,
                price: product.priceValue,
                image: product.image,
                category: product.category,
                inStock: product.inStock,
            });
        }
    }, [id]);

    if (!product) {
        return (
            <Layout>
                <section className="py-12 lg:py-16 hero-gradient">
                    <div className="container mx-auto px-4">
                        <Button variant="outline" onClick={() => navigate("/products")} className="gap-2 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Products
                        </Button>
                    </div>
                </section>
                <section className="py-12 lg:py-16 bg-background">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                            Product Not Found
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            The product you're looking for doesn't exist or has been removed.
                        </p>
                        <Button variant="cta" asChild>
                            <Link to="/products">Browse Products</Link>
                        </Button>
                    </div>
                </section>
            </Layout>
        );
    }

    const handleAddToCart = () => {
        addToCart({
            id: String(product.id),
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image,
        });
        setAddedToCart(true);
        toast({
            title: "Added to cart!",
            description: `${quantity} x ${product.name} added to your cart.`,
        });
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleToggleWishlist = () => {
        if (wishlist.includes(String(product.id))) {
            removeFromWishlist(String(product.id));
            toast({
                title: "Removed from wishlist",
                description: `${product.name} has been removed from your wishlist.`,
            });
        } else {
            addToWishlist(String(product.id));
            toast({
                title: "Added to wishlist!",
                description: `${product.name} has been added to your wishlist.`,
            });
        }
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `Hello Maripha Glassmart! I'm interested in: ${product.name}\\n\\nPrice: ${product.price}\\nQuantity: ${quantity}`
        );
        window.open(`https://wa.me/254728508906?text=${message}`, "_blank");
    };

    return (
        <Layout>
            {/* Breadcrumb */}
            <section className="bg-muted/50 py-4">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-primary">Products</Link>
                        <span>/</span>
                        <Link to={`/products?category=${product.category}`} className="hover:text-primary">
                            {categories.find(c => c.id === product.category)?.name}
                        </Link>
                        <span>/</span>
                        <span className="text-foreground">{product.name}</span>
                    </div>
                </div>
            </section>

            {/* Product Details */}
            <section className="py-12 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Image */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">
                                    {categories.find(c => c.id === product.category)?.name}
                                </Badge>
                                {product.inStock ? (
                                    <Badge variant="outline" className="text-green-600 border-green-600">
                                        <Check className="w-3 h-3 mr-1" /> In Stock
                                    </Badge>
                                ) : (
                                    <Badge variant="destructive">Out of Stock</Badge>
                                )}
                            </div>

                            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-muted-foreground">
                                    {product.rating} ({product.reviews} reviews)
                                </span>
                            </div>

                            <p className="text-3xl font-bold text-primary mb-6">
                                {product.price}
                            </p>

                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div className="mb-8">
                                <h3 className="font-semibold text-foreground mb-3">Key Features:</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                                            <Check className="w-4 h-4 text-green-600" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quantity & Add to Cart */}
                            {product.inStock && (
                                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                                    <div className="flex items-center border rounded-lg">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="w-12 text-center font-medium">{quantity}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            <Plus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="cta"
                                        size="lg"
                                        className="flex-1 gap-2"
                                        onClick={handleAddToCart}
                                        disabled={addedToCart}
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        {addedToCart ? "Added!" : "Add to Cart"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={handleToggleWishlist}
                                        className={`gap-2 ${wishlist.includes(String(product.id)) ? "text-red-500 border-red-500" : ""}`}
                                    >
                                        <Heart className={`w-5 h-5 ${wishlist.includes(String(product.id)) ? "fill-current" : ""}`} />
                                    </Button>
                                </div>
                            )}

                            <Button
                                variant="whatsapp"
                                size="lg"
                                className="w-full gap-2 mb-6"
                                onClick={handleWhatsApp}
                            >
                                <MessageCircle className="w-5 h-5" />
                                Enquire via WhatsApp
                            </Button>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                                <div className="text-center">
                                    <Truck className="w-6 h-6 mx-auto text-primary mb-2" />
                                    <p className="text-sm text-muted-foreground">Free Delivery</p>
                                    <p className="text-xs text-muted-foreground">Busia & nearby</p>
                                </div>
                                <div className="text-center">
                                    <Shield className="w-6 h-6 mx-auto text-primary mb-2" />
                                    <p className="text-sm text-muted-foreground">Quality Guaranteed</p>
                                    <p className="text-xs text-muted-foreground">Trusted brand</p>
                                </div>
                                <div className="text-center">
                                    <Clock className="w-6 h-6 mx-auto text-primary mb-2" />
                                    <p className="text-sm text-muted-foreground">Quick Support</p>
                                    <p className="text-xs text-muted-foreground">24/7 response</p>
                                </div>
                            </div>

                            {/* Social Share */}
                            <div className="pt-4 border-t">
                                <SocialShare
                                    title={product.name}
                                    description={product.description}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-12 lg:py-16 bg-muted/50">
                    <div className="container mx-auto px-4">
                        <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                            Related Products
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((related) => (
                                <Card key={related.id} className="overflow-hidden card-elevated bg-card">
                                    <div className="aspect-square overflow-hidden">
                                        <img
                                            src={related.image}
                                            alt={related.name}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 cursor-pointer"
                                            onClick={() => navigate(`/products/${related.id}`)}
                                        />
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
                                            {related.name}
                                        </h3>
                                        <p className="text-primary font-bold">{related.price}</p>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full mt-3"
                                            onClick={() => navigate(`/products/${related.id}`)}
                                        >
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Recently Viewed */}
            <RecentlyViewed currentProductId={String(product?.id)} />
        </Layout>
    );
};

export default ProductDetail;
