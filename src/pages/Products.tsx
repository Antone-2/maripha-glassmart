import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, ShoppingCart, Check, Heart, SlidersHorizontal } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "all", name: "All Products" },
  { id: "glass", name: "Glass & Mirrors" },
  { id: "paints", name: "Paints" },
  { id: "sinks", name: "Sinks & Taps" },
  { id: "toilets", name: "Toilets" },
  { id: "showers", name: "Showers & Accessories" },
];

const products = [
  // Glass & Mirrors
  {
    id: 1,
    name: "Clear Float Glass",
    category: "glass",
    description: "Premium quality clear float glass for windows and doors.",
    features: ["4mm - 12mm thickness", "Custom cutting available", "Windows & doors"],
    price: "From KSH 800/sqm",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Tinted Glass",
    category: "glass",
    description: "Solar control tinted glass in bronze, grey, and green.",
    features: ["Bronze, grey, green options", "Heat reduction", "Privacy glass"],
    price: "From KSH 1,200/sqm",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Frameless Wall Mirror",
    category: "glass",
    description: "Beveled edge decorative mirror for bathrooms and living spaces.",
    features: ["Beveled edges", "Multiple sizes", "Wall mounting"],
    price: "From KSH 3,200",
    image: "https://images.unsplash.com/photo-1675807526240-fb2e22e39048?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fEZyYW1lbGVzcyUyMFdhbGwlMjBNaXJyb3J8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 4,
    name: "Glass Shelves",
    category: "glass",
    description: "Tempered glass shelves for display and storage.",
    features: ["Tempered safety glass", "Various lengths", "Brackets included"],
    price: "From KSH 1,500",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=400&fit=crop",
  },
  // Paints
  {
    id: 5,
    name: "Interior Emulsion Paint",
    category: "paints",
    description: "High-quality water-based emulsion paint for interior walls.",
    features: ["All colors available", "Washable finish", "Low odor"],
    price: "KSH 2,500/20L",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Exterior Weather Shield",
    category: "paints",
    description: "Durable exterior paint with weather protection.",
    features: ["Weather resistant", "UV protection", "5-year warranty"],
    price: "KSH 3,500/20L",
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=400&h=400&fit=crop",
  },
  {
    id: 7,
    name: "Primer & Undercoat",
    category: "paints",
    description: "Professional grade primer for new surfaces.",
    features: ["New surface prep", "Better adhesion", "Quick drying"],
    price: "KSH 1,800/20L",
    image: "https://images.unsplash.com/photo-1558618047-f6e7c5b1e7e3?w=400&h=400&fit=crop",
  },
  // Sinks & Taps
  {
    id: 8,
    name: "Stainless Steel Kitchen Sink",
    category: "sinks",
    description: "Double bowl stainless steel sink with drainer.",
    features: ["Double bowl design", "With drainer", "304 stainless steel"],
    price: "KSH 8,500",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
  },
  {
    id: 9,
    name: "Ceramic Bathroom Basin",
    category: "sinks",
    description: "Elegant ceramic wash basin for bathrooms.",
    features: ["Counter-top mount", "White ceramic", "Overflow included"],
    price: "From KSH 4,500",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=400&fit=crop",
  },
  {
    id: 10,
    name: "Kitchen Mixer Tap",
    category: "sinks",
    description: "Chrome finish kitchen mixer with swivel spout.",
    features: ["Swivel spout", "Hot/cold mixer", "Chrome finish"],
    price: "KSH 3,800",
    image: "https://images.unsplash.com/photo-1584622781867-1c5e27c4b1e5?w=400&h=400&fit=crop",
  },
  // Toilets
  {
    id: 11,
    name: "Close-Coupled Toilet Set",
    category: "toilets",
    description: "Complete WC set with cistern, seat, and fittings.",
    features: ["Dual flush", "Soft-close seat", "Complete set"],
    price: "KSH 12,000",
    image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=400&h=400&fit=crop",
  },
  {
    id: 12,
    name: "Wall-Hung Toilet",
    category: "toilets",
    description: "Modern wall-mounted toilet with concealed cistern.",
    features: ["Wall mounted", "Concealed cistern", "Modern design"],
    price: "KSH 25,000",
    image: "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=400&h=400&fit=crop",
  },
  {
    id: 13,
    name: "Toilet Seat (Soft Close)",
    category: "toilets",
    description: "Universal soft-close toilet seat.",
    features: ["Soft close mechanism", "Easy clean", "Universal fit"],
    price: "KSH 2,500",
    image: "https://images.unsplash.com/photo-1584622781867-1c5e27c4b1e5?w=400&h=400&fit=crop",
  },
  // Showers & Accessories
  {
    id: 14,
    name: "Rain Shower Head",
    category: "showers",
    description: "8-inch stainless steel rain shower head with wall arm.",
    features: ["8-inch diameter", "Stainless steel", "Wall mount arm"],
    price: "KSH 4,500",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=400&fit=crop",
  },
  {
    id: 15,
    name: "Shower Column Set",
    category: "showers",
    description: "Complete shower column with overhead, hand shower, and mixer.",
    features: ["Overhead shower", "Hand shower", "Thermostatic mixer"],
    price: "KSH 18,000",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=400&fit=crop",
  },
  {
    id: 16,
    name: "Glass Shower Enclosure",
    category: "showers",
    description: "Frameless tempered glass shower enclosure.",
    features: ["Tempered glass", "Frameless design", "Custom sizing"],
    price: "From KSH 35,000",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop",
  },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const addToCart = useStore((state) => state.addToCart);
  const wishlist = useStore((state) => state.wishlist);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const removeFromWishlist = useStore((state) => state.removeFromWishlist);
  const { toast } = useToast();

  const getPriceValue = (price: string): number => {
    const match = price.match(/([\d,]+)/);
    if (match) {
      return parseInt(match[1].replace(/,/g, ""));
    }
    return 0;
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const priceValue = getPriceValue(product.price);
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under5" && priceValue < 5000) ||
        (priceRange === "5to15" && priceValue >= 5000 && priceValue < 15000) ||
        (priceRange === "15to30" && priceValue >= 15000 && priceValue < 30000) ||
        (priceRange === "over30" && priceValue >= 30000);

      return matchesCategory && matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return getPriceValue(a.price) - getPriceValue(b.price);
        case "price-high":
          return getPriceValue(b.price) - getPriceValue(a.price);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    setAddedToCart((prev) => [...prev, product.id]);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
    setTimeout(() => {
      setAddedToCart((prev) => prev.filter((id) => id !== product.id));
    }, 2000);
  };

  const handleToggleWishlist = (productId: number, productName: string) => {
    if (wishlist.includes(String(productId))) {
      removeFromWishlist(String(productId));
      toast({
        title: "Removed from wishlist",
        description: `${productName} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(String(productId));
      toast({
        title: "Added to wishlist!",
        description: `${productName} has been added to your wishlist.`,
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 lg:py-16 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Our Products
            </h1>
            <p className="text-primary-foreground/90">
              Explore our wide range of quality glass, paints, and sanitary ware products.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-card border-b border-border sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2 items-center w-full lg:w-auto">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under5">Under KSH 5,000</SelectItem>
                  <SelectItem value="5to15">KSH 5,000 - 15,000</SelectItem>
                  <SelectItem value="15to30">KSH 15,000 - 30,000</SelectItem>
                  <SelectItem value="over30">Over KSH 30,000</SelectItem>
                </SelectContent>
              </Select>

              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto mt-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      < section className="py-12 bg-background" >
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found. Try a different search or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                  <Card key={product.id} className="overflow-hidden card-elevated bg-card group h-full">
                    <div className="aspect-square overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleWishlist(product.id, product.name);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-md transition-colors"
                        aria-label={wishlist.includes(String(product.id)) ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart
                          className={`w-4 h-4 ${wishlist.includes(String(product.id)) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                        />
                      </button>
                    </div>
                    <CardContent className="p-4">
                      <span className="text-xs font-medium text-primary uppercase tracking-wide">
                        {categories.find(c => c.id === product.category)?.name}
                      </span>
                      <h3 className="font-display font-semibold text-base text-foreground mt-1 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <span className="font-bold text-primary text-sm">{product.price}</span>
                        <Button
                          variant={addedToCart.includes(product.id) ? "secondary" : "default"}
                          size="sm"
                          className="h-8 text-xs"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                        >
                          {addedToCart.includes(product.id) ? "Added" : "Add"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section >

      {/* CTA */}
      < section className="py-12 bg-secondary" >
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contact us with your specific requirements. We can source most products on request.
          </p>
          <Button variant="cta" size="lg" asChild>
            <a href="/quote">Request a Quote</a>
          </Button>
        </div>
      </section >
    </Layout >
  );
};

export default Products;
