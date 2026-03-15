import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, Phone, MessageCircle, ChevronRight, HelpCircle } from "lucide-react";

const faqs = [
  {
    category: "Products",
    question: "What products do you sell?",
    answer: "We sell a wide range of building materials including glass (window, door, frameless, mirrors), paints (interior, exterior, primers), sinks, taps, toilets, showers, and bathroom accessories.",
  },
  {
    category: "Services",
    question: "Do you offer glass cutting services?",
    answer: "Yes! We offer professional glass cutting and sizing services. Bring your measurements or have us visit your site for accurate sizing.",
  },
  {
    category: "Delivery",
    question: "What areas do you deliver to?",
    answer: "We deliver to Busia, Kisumu, Kakamega, and surrounding areas. Delivery fees vary based on location and order size. Contact us for a quote.",
  },
  {
    category: "Services",
    question: "Do you offer installation services?",
    answer: "Yes, we provide professional installation services for glass, mirrors, sinks, taps, toilets, and showers. Our experienced team ensures quality workmanship.",
  },
  {
    category: "Payment",
    question: "What payment methods do you accept?",
    answer: "We accept cash, M-Pesa, and bank transfers. For large orders or custom work, we may require a deposit.",
  },
  {
    category: "Orders",
    question: "How do I get a quote?",
    answer: "You can request a quote through our website, call us, or send a WhatsApp message. We typically respond within 24 hours.",
  },
  {
    category: "Products",
    question: "Do you offer warranties on products?",
    answer: "Product warranties vary by manufacturer. We provide manufacturer warranties where applicable and stand behind the quality of our products.",
  },
  {
    category: "General",
    question: "What are your business hours?",
    answer: "We're open Monday to Saturday, 8:00 AM to 6:00 PM. We're closed on Sundays and public holidays.",
  },
  {
    category: "Returns",
    question: "Can I return a product?",
    answer: "Yes, unused products in original condition can be returned within 7 days with proof of purchase. Custom-cut items and mixed paints cannot be returned.",
  },
  {
    category: "Orders",
    question: "Do you offer bulk discounts?",
    answer: "Yes! We offer competitive pricing for bulk orders and contractors. Contact us to discuss your project needs.",
  },
];

const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

const FAQ = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <section className="py-16 lg:py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary-foreground">FAQ</span>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          {filtered.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-3">
              {filtered.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-2xl px-6 data-[state=open]:shadow-md transition-shadow duration-300"
                >
                  <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary py-5">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-accent shrink-0" />
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{faq.category}</span>
                        <p className="text-base">{faq.question}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 pl-8 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No questions match your search.</p>
              <p className="text-muted-foreground text-sm mt-1">Try different keywords or browse all categories.</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 p-8 lg:p-10 rounded-2xl hero-gradient text-center">
            <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">
              Still have questions?
            </h3>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
              Our team is ready to help. Reach out to us anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta" size="lg" onClick={() => (window.location.href = "tel:+254728508906")} className="gap-2">
                <Phone className="w-5 h-5" />
                Call Us
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                onClick={() => window.open("https://wa.me/254728508906", "_blank")}
                className="gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
