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
  { id: "glass", name: "Glass" },
  { id: "bathroom", name: "Bathrooms" },
  { id: "paint", name: "Paint" },
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
      {/* Hero Section - Mobile Optimized */}
      <section className="py-8 md:py-12 lg:py-16 hero-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl">
            <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3 md:mb-4">
              Our Projects Gallery
            </h1>
            <p className="text-sm md:text-base text-primary-foreground/90">
              See examples of our work across glass installations, bathroom projects, and painting jobs.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter - Mobile Optimized with horizontal scroll */}
      <section className="py-3 md:py-4 bg-card border-b border-border sticky top-14 md:top-16 lg:top-20 z-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 md:pb-0 md:-mb-0 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="whitespace-nowrap h-9 px-4 text-xs md:text-sm flex-shrink-0"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Mobile Optimized */}
      <section className="py-6 md:py-10 lg:py-12 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-xl card-elevated cursor-pointer"
              >
                {/* Image container with aspect ratio */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Overlay - shows on hover on desktop, always show type on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 md:opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4 md:p-5">
                  <span className="text-xs font-medium text-accent uppercase tracking-wide mb-1">
                    {project.type} • {project.location}
                  </span>
                  <h3 className="font-display font-semibold text-sm md:text-base text-white mb-1 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/80 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Badge - always visible on mobile */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium text-white">
                    {categories.find((c) => c.id === project.category)?.name}
                  </span>
                </div>

                {/* Type badge - desktop hover */}
                <div className="absolute top-3 right-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-2.5 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-xs font-medium text-white">
                    {project.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA - Mobile Optimized */}
      <section className="py-10 md:py-14 lg:py-16 hero-gradient">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground mb-3 md:mb-4">
              Want to See Your Project Here?
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-primary-foreground/90 mb-6 md:mb-8">
              Let us help bring your vision to life with our quality products and services.
            </p>
            <Button variant="cta" size="lg" asChild className="w-full sm:w-auto h-12 md:h-14 text-sm md:text-base px-6 md:px-8">
              <a href="/quote">Start Your Project</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
