import { Link } from "react-router-dom";
import { Layers, Paintbrush, ShowerHead, Droplets, Bath } from "lucide-react";

const categories = [
  {
    name: "Glass & Mirrors",
    description: "Window glass, door glass, mirrors, frameless glass, shelves",
    icon: Layers,
    color: "bg-secondary",
    link: "/products?category=glass",
  },
  {
    name: "Paints",
    description: "Interior, exterior, undercoats, primers, accessories",
    icon: Paintbrush,
    color: "bg-accent/20",
    link: "/products?category=paints",
  },
  {
    name: "Sinks & Taps",
    description: "Kitchen sinks, bathroom sinks, mixers, taps",
    icon: Droplets,
    color: "bg-secondary",
    link: "/products?category=sinks",
  },
  {
    name: "Toilets",
    description: "Toilet sets, cisterns, seats, accessories",
    icon: Bath,
    color: "bg-accent/20",
    link: "/products?category=toilets",
  },
  {
    name: "Showers",
    description: "Shower heads, columns, enclosures, doors",
    icon: ShowerHead,
    color: "bg-secondary",
    link: "/products?category=showers",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of quality building materials and sanitary ware products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group"
            >
              <div className={`${category.color} rounded-2xl p-6 h-full card-elevated flex flex-col items-center text-center transition-all`}>
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <category.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
