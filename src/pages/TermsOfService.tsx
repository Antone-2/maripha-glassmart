import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { FileText, ShoppingCart, CreditCard, Truck, RotateCcw, Phone, ChevronRight } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: "By accessing and using the Maripha Glassmart website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
    items: [],
  },
  {
    icon: ShoppingCart,
    title: "2. Products and Services",
    content: "We strive to display accurate product information including descriptions, images, and pricing. However, we reserve the right to correct any errors and update information without prior notice. Prices are subject to change.",
    items: [],
  },
  {
    icon: CreditCard,
    title: "3. Orders and Payment",
    content: "All orders are subject to availability and confirmation:",
    items: [
      "Payment terms will be communicated upon order confirmation",
      "We accept cash, M-Pesa, and bank transfers",
      "Custom orders may require a deposit",
      "Prices are in Kenya Shillings (KSH)",
    ],
  },
  {
    icon: Truck,
    title: "4. Delivery",
    content: "Delivery is available within Busia, Kisumu, Kakamega, and surrounding areas. Delivery fees and timelines vary based on location and order size. We will communicate delivery details upon order confirmation.",
    items: [],
  },
  {
    icon: RotateCcw,
    title: "5. Returns and Refunds",
    content: "Please inspect all products upon delivery. Claims for damaged or incorrect items must be made within 24 hours of delivery. Custom-cut glass and special orders are non-refundable.",
    items: [],
  },
  {
    icon: Phone,
    title: "6. Contact",
    content: "For questions about these terms, contact us:",
    items: ["Email: info@mariphaglass.co.ke", "Phone: +254 728 508 906"],
  },
];

const TermsOfService = () => {
  return (
    <Layout>
      <section className="py-16 lg:py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary-foreground">Terms of Service</span>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Please read these terms carefully before using our products and services.
          </p>
          <p className="text-primary-foreground/60 text-sm mt-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-6">
            {sections.map((section) => (
              <div
                key={section.title}
                className="group p-6 lg:p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <section.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-semibold text-foreground mb-3">{section.title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-3">{section.content}</p>
                    {section.items.length > 0 && (
                      <ul className="space-y-2">
                        {section.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
