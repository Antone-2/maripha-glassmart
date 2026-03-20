import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, User, Tag, ArrowLeft } from "lucide-react";

// Import local images
import heroBg from "@/assets/hero-bg.jpg";
import luxuryShower from "@/assets/Luxury Shower Systems.jpg";
import premiumGlass from "@/assets/Premium Quality Glass.jpg";
import paintServices from "@/assets/Professional Paint Services.jpg";
import sanitaryWare from "@/assets/Sanitary Ware Collection.jpg";

// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Choosing the Right Glass for Your Windows",
        excerpt: "A comprehensive guide to selecting the perfect glass type for your windows based on insulation needs, budget, and climate considerations.",
        content: "When it comes to choosing glass for your windows, there are several factors to consider. From energy efficiency to noise reduction, the right choice can significantly impact your comfort and energy bills...",
        image: premiumGlass,
        author: "Phabian Maripha",
        date: "2024-01-15",
        readTime: "5 min read",
        category: "Guides",
        featured: true,
    },
    {
        id: 2,
        title: "2024 Bathroom Design Trends You Should Know",
        excerpt: "Discover the latest trends in bathroom design, from modern fixtures to sustainable materials that are transforming Kenyan homes.",
        content: "The bathroom has evolved from a purely functional space to a personal sanctuary. In 2024, we're seeing exciting trends that combine functionality with aesthetics...",
        image: sanitaryWare,
        author: "Sarah Marketing",
        date: "2024-01-10",
        readTime: "4 min read",
        category: "Trends",
        featured: false,
    },
    {
        id: 3,
        title: "How to Maintain Your Glass Fixtures",
        excerpt: "Expert tips on keeping your glass windows, mirrors, and shower enclosures in pristine condition for years to come.",
        content: "Proper maintenance of glass fixtures can extend their lifespan significantly. Here are our expert tips for maintaining different types of glass installations...",
        image: luxuryShower,
        author: "John Maripha",
        date: "2024-01-05",
        readTime: "6 min read",
        category: "Maintenance",
        featured: false,
    },
    {
        id: 4,
        title: "Understanding Paint Types for Kenyan Climate",
        excerpt: "Learn how to choose paints that can withstand the harsh African sun, humidity, and seasonal rains.",
        content: "Kenya's climate presents unique challenges for paint durability. From the hot coastal regions to the cooler highlands, understanding which paint formulations work best is essential...",
        image: paintServices,
        author: "James Paint Expert",
        date: "2023-12-28",
        readTime: "7 min read",
        category: "Guides",
        featured: false,
    },
    {
        id: 5,
        title: "Kitchen Sink Materials: Pros and Cons",
        excerpt: "A detailed comparison of stainless steel, ceramic, and composite sinks to help you make the right choice.",
        content: "Choosing the right kitchen sink involves more than just aesthetics. Material choice affects durability, maintenance, and even the value of your home...",
        image: heroBg,
        author: "Mary Installations",
        date: "2023-12-20",
        readTime: "5 min read",
        category: "Guides",
        featured: false,
    },
    {
        id: 6,
        title: "Energy-Saving Tips for Your Home",
        excerpt: "Simple changes you can make to reduce energy consumption and lower your utility bills while staying comfortable.",
        content: "With rising energy costs, every Kenyan homeowner is looking for ways to save. Here are proven strategies to reduce your energy consumption...",
        image: premiumGlass,
        author: "Green Living Team",
        date: "2023-12-15",
        readTime: "4 min read",
        category: "Tips",
        featured: false,
    },
];

const categories = [
    { name: "All Posts", count: blogPosts.length },
    { name: "Guides", count: blogPosts.filter(p => p.category === "Guides").length },
    { name: "Trends", count: blogPosts.filter(p => p.category === "Trends").length },
    { name: "Maintenance", count: blogPosts.filter(p => p.category === "Maintenance").length },
    { name: "Tips", count: blogPosts.filter(p => p.category === "Tips").length },
];

const Blog = () => {
    const { id } = useParams();
    const [selectedCategory, setSelectedCategory] = useState("All Posts");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPost = blogPosts.find(p => p.featured);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-KE", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    // If we have an ID, show the individual blog post
    const postId = id ? parseInt(id) : null;
    const post = postId ? blogPosts.find(p => p.id === postId) : null;

    if (post) {
        return (
            <Layout>
                <article className="py-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <Button variant="ghost" asChild className="mb-6">
                            <Link to="/blog">
                                <ArrowLeft className="mr-2 w-4 h-4" />
                                Back to Blog
                            </Link>
                        </Button>

                        <div className="mb-8">
                            <Badge className="mb-4">{post.category}</Badge>
                            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-6 text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    {post.author}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {formatDate(post.date)}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            </div>
                        </div>

                        <div className="aspect-video mb-8 rounded-lg overflow-hidden">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
                            <p>{post.content}</p>
                            <p>At Maripha Glassmart, we understand that choosing the right products for your home is an important decision. Whether you're looking for high-quality glass solutions, premium paints, or modern sanitary ware, our team is here to help you every step of the way.</p>
                            <p>If you have any questions about this topic or any of our products, please don't hesitate to contact us. We're always happy to assist our customers in making informed decisions for their homes.</p>
                        </div>

                        <div className="mt-12 pt-8 border-t">
                            <h3 className="font-display text-xl font-semibold mb-4">Related Articles</h3>
                            <div className="grid md:grid-cols-3 gap-4">
                                {blogPosts.filter(p => p.id !== post.id).slice(0, 3).map(relatedPost => (
                                    <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                        <Link to={`/blog/${relatedPost.id}`}>
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={relatedPost.image}
                                                    alt={relatedPost.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <CardContent className="p-4">
                                                <h4 className="font-semibold text-sm line-clamp-2">{relatedPost.title}</h4>
                                            </CardContent>
                                        </Link>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary via-primary to-blue-700 text-primary-foreground py-16 lg:py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Blog & News
                    </h1>
                    <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
                        Expert tips, guides, and insights on glass, paints, sanitary ware, and home improvement.
                    </p>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && selectedCategory === "All Posts" && !searchQuery && (
                <section className="py-12 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <h2 className="font-display text-2xl font-bold mb-6">Featured Article</h2>
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="grid md:grid-cols-2">
                                <div className="aspect-video md:aspect-auto">
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <CardContent className="p-6 flex flex-col justify-center">
                                    <Badge className="w-fit mb-3">{featuredPost.category}</Badge>
                                    <h3 className="font-display text-2xl font-bold mb-3 line-clamp-2">
                                        {featuredPost.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                        <span className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            {featuredPost.author}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(featuredPost.date)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {featuredPost.readTime}
                                        </span>
                                    </div>
                                    <Button asChild className="w-fit">
                                        <Link to={`/blog/${featuredPost.id}`}>
                                            Read Article <ArrowRight className="ml-2 w-4 h-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Filters & Search */}
            <section className="py-8 bg-background border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Button
                                    key={category.name}
                                    variant={selectedCategory === category.name ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category.name)}
                                    className="gap-1"
                                >
                                    <Tag className="w-3 h-3" />
                                    {category.name}
                                    <Badge variant="secondary" className="ml-1 text-xs">
                                        {category.count}
                                    </Badge>
                                </Button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="w-full md:w-64">
                            <Input
                                type="search"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSelectedCategory("All Posts");
                                    setSearchQuery("");
                                }}
                                className="mt-2"
                            >
                                Clear filters
                            </Button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPosts.map((post) => (
                                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                                    <Link to={`/blog/${post.id}`}>
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <CardContent className="p-5">
                                            <Badge className="w-fit mb-2 text-xs">{post.category}</Badge>
                                            <h3 className="font-display font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                <span>{formatDate(post.date)}</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                        </CardContent>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter CTA - Removed - Already shown via Layout component */}
        </Layout>
    );
};

export default Blog;
