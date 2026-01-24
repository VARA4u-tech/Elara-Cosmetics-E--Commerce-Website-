import { ReactNode } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import Footer from "./Footer";
import CartDrawer from "./CartDrawer";
import BackToTop from "@/components/ui/BackToTop";
import ChatbotWidget from "@/components/ui/ChatbotWidget";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <BackToTop />
      <ChatbotWidget />
    </div>
  );
};

export default Layout;
