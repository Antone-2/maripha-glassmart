import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Shield, Eye, Lock, Users, Mail, ChevronRight } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "1. Information We Collect",
    content: "We collect information you provide directly to us, such as when you request a quote, contact us, or communicate with us via phone, email, or WhatsApp.",
    items: ["Name and contact details", "Phone number and email address", "Product or service interests", "Project specifications and measurements"],
  },
  {
    icon: Users,
    title: "2. How We Use Your Information",
    content: "We use the information we collect to serve you better:",
    items: ["Respond to your inquiries and provide customer support", "Process your orders and deliver products", "Send you updates about your orders", "Improve our products and services"],
  },
  {
    icon: Shield,
    title: "3. Information Sharing",
    content: "We do not sell, trade, or otherwise transfer your personal information to third parties. We may share information with trusted partners who assist us in operating our business, provided they agree to keep this information confidential.",
    items: [],
  },
  {
    icon: Lock,
    title: "4. Data Security",
    content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    items: [],
  },
  {
    icon: Mail,
    title: "5. Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us:",
    items: ["Email: info@mariphaglass.co.ke", "Phone: +254 728 508 906", "WhatsApp: +254 728 508 906"],
  },
];

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="py-16 lg:py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-primary-foreground/70 text-sm mb-4">
            <Link to="/" className="hover:text-primary-foreground transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary-foreground">Privacy Policy</span>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl">
            Your privacy matters to us. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-primary-foreground/60 text-sm mt-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      {/* Content */}
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

export default PrivacyPolicy;
