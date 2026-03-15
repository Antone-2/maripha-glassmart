import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "Clear Float Glass",
    category: "Glass & Mirrors",
    description: "Premium 4mm-12mm clear glass",
    price: "KSH 800/sqm",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
    badge: "Best Seller",
  },
  {
    id: 5,
    name: "Interior Paint",
    category: "Paints",
    description: "Quality emulsion paint",
    price: "KSH 2,500/20L",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=300&h=300&fit=crop",
    badge: "Popular",
  },
  {
    id: 8,
    name: "Steel Sink",
    category: "Sinks & Taps",
    description: "Double bowl steel sink",
    price: "KSH 8,500",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop",
    badge: null,
  },
  {
    id: 11,
    name: "Toilet Set",
    category: "Toilets",
    description: "WC with soft-close seat",
    price: "KSH 12,000",
    image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=300&h=300&fit=crop",
    badge: "New",
  },
  {
    id: 14,
    name: "Rain Shower",
    category: "Showers",
    description: "8-inch rain shower",
    price: "KSH 4,500",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=300&h=300&fit=crop",
    badge: null,
  },
  {
    id: 3,
    name: "Wall Mirror",
    category: "Glass & Mirrors",
    description: "Beveled edge mirror",
    price: "KSH 3,200",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=300&h=300&fit=crop",
    badge: "Featured",
  },
  {
    id: 6,
    name: "Exterior Paint",
    category: "Paints",
    description: "Weather shield paint",
    price: "KSH 3,500/20L",
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=300&h=300&fit=crop",
    badge: null,
  },
  {
    id: 9,
    name: "Ceramic Basin",
    category: "Sinks & Taps",
    description: "Elegant ceramic basin",
    price: "KSH 4,500",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=300&h=300&fit=crop",
    badge: null,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground text-sm">
            Quality products at competitive prices
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card className="overflow-hidden bg-card hover:shadow-md transition-shadow h-full">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  {product.badge && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-primary text-white text-xs font-medium">
                      {product.badge}
                    </span>
                  )}
                </div>
                <CardContent className="p-3">
                  <span className="text-xs text-primary font-medium">
                    {product.category}
                  </span>
                  <h3 className="font-semibold text-sm text-foreground mt-0.5 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary text-sm">{product.price}</span>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-6">
          <Button variant="outline" asChild>
            <a href="/products">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
