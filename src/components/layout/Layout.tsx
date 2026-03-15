import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingButtons from "@/components/FloatingButtons";
import Newsletter from "@/components/Newsletter";
import Breadcrumb from "@/components/Breadcrumb";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumb />
      <main className="flex-1 pt-16 lg:pt-20">{children}</main>
      <Newsletter />
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default Layout;
