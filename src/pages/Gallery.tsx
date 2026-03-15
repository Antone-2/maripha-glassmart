import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

// Import local images
import heroBg from "@/assets/hero-bg.jpg";
import luxuryShower from "@/assets/Luxury Shower Systems.jpg";
import premiumGlass from "@/assets/Premium Quality Glass.jpg";
import paintServices from "@/assets/Professional Paint Services.jpg";
import sanitaryWare from "@/assets/Sanitary Ware Collection.jpg";

const categories = [
  { id: "all", name: "All" },
  { id: "glass", name: "Glass Installations" },
  { id: "bathroom", name: "Bathrooms" },
  { id: "paint", name: "Paint Projects" },
];

const projects = [
  {
    id: 1,
    title: "Modern Office Glass Partitions",
    category: "glass",
    type: "Commercial",
    location: "Busia Town",
    description: "Frameless glass partitions for a modern office space",
    image: premiumGlass,
  },
  {
    id: 2,
    title: "Residential Window Installation",
    category: "glass",
    type: "Residential",
    location: "Mumias",
    description: "Complete window glass replacement for a family home",
    image: heroBg,
  },
  {
    id: 3,
    title: "Complete Bathroom Renovation",
    category: "bathroom",
    type: "Residential",
    location: "Kisumu",
    description: "Full bathroom with our toilet, sink, shower, and accessories",
    image: sanitaryWare,
  },
  {
    id: 4,
    title: "Hotel Bathroom Fittings",
    category: "bathroom",
    type: "Commercial",
    location: "Busia",
    description: "Supplied bathroom fixtures for 20 hotel rooms",
    image: luxuryShower,
  },
  {
    id: 5,
    title: "Exterior House Painting",
    category: "paint",
    type: "Residential",
    location: "Kakamega",
    description: "Complete exterior painting using our weathershield paint",
    image: paintServices,
  },
  {
    id: 6,
    title: "Interior Office Painting",
    category: "paint",
    type: "Commercial",
    location: "Busia CBD",
    description: "Interior emulsion paint application for office complex",
    image: paintServices,
  },
  {
    id: 7,
    title: "Shower Glass Enclosure",
    category: "glass",
    type: "Residential",
    location: "Siaya",
    description: "Custom frameless shower enclosure installation",
    image: luxuryShower,
  },
  {
    id: 8,
    title: "Shop Front Glass",
    category: "glass",
    type: "Commercial",
    location: "Busia Market",
    description: "Large display glass installation for retail shop",
    image: premiumGlass,
  },
  {
    id: 9,
    title: "Master Bathroom Suite",
    category: "bathroom",
    type: "Residential",
    location: "Bungoma",
    description: "Luxury master bathroom with premium fixtures",
    image: sanitaryWare,
  },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "all" || project.category === selectedCategory
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 lg:py-16 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Our Projects Gallery
            </h1>
            <p className="text-primary-foreground/90">
              See examples of our work across glass installations, bathroom projects, and painting jobs.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 bg-card border-b border-border sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
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

      {/* Gallery Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl card-elevated"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-xs font-medium text-accent uppercase tracking-wide mb-2">
                    {project.type} • {project.location}
                  </span>
                  <h3 className="font-display font-semibold text-lg text-primary-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/80">
                    {project.description}
                  </p>
                </div>
                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-foreground">
                    {categories.find((c) => c.id === project.category)?.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Want to See Your Project Here?
            </h2>
            <p className="text-primary-foreground/90 text-lg mb-8">
              Let us help bring your vision to life with our quality products and services.
            </p>
            <Button variant="cta" size="xl" asChild>
              <a href="/quote">Start Your Project</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
