import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { RotateCcw, XCircle, Camera, Clock, Phone, ChevronRight, CheckCircle } from "lucide-react";

const sections = [
  {
    icon: CheckCircle,
    title: "Return Eligibility",
    content: "We want you to be completely satisfied with your purchase. Returns are accepted under the following conditions:",
    items: [
      "Item is unused and in original condition",
      "Return is requested within 7 days of purchase/delivery",
      "Original receipt or proof of purchase is provided",
      "Item is not a custom-cut or special order product",
    ],
  },
  {
    icon: XCircle,
    title: "Non-Returnable Items",
    content: "The following items cannot be returned or exchanged:",
    items: [
      "Custom-cut glass and mirrors",
      "Mixed or tinted paints",
      "Installed products",
      "Items damaged after delivery due to customer handling",
    ],
  },
  {
    icon: Camera,
    title: "Damaged or Defective Items",
    content: "If you receive a damaged or defective item, please follow these steps:",
    items: [
      "Notify us within 24 hours of delivery",
      "Provide photos of the damage",
      "We will arrange for replacement or refund",
    ],
  },
  {
    icon: Clock,
    title: "Refund Process",
    content: "Approved refunds will be processed within 7-14 business days. Refunds will be issued via the original payment method or M-Pesa as agreed.",
    items: [],
  },
  {
    icon: Phone,
    title: "Contact Us",
    content: "For returns or refund inquiries, reach out to us:",
    items: ["WhatsApp: +254 728 508 906", "Email: info@mariphaglass.co.ke", "Visit our shop in Busia Town"],
  },
];

const ReturnPolicy = () => {
  return (
    <Layout>
      <section className="py-16 lg:py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary-foreground">Return Policy</span>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Return & Refund Policy
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            We stand behind the quality of our products. Learn about our hassle-free return process.
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

export default ReturnPolicy;
