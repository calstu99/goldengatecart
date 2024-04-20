import { CartProvider } from "@/components/CartContext";
import "./globals.css";
import "./custom.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@/components/Nav";
import CartModal from "@/components/CartModal";
import ScrollToTopBottom from "@/components/ScrollToTopBottom";
import ScrollToTopIcon from "@/components/ScrollToTopIcon";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Golden Gate Cart",
  description: "Powering Top Fashion for a top price",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    
      {/* <body className= {`${inter.className} relative`}> */}
      <body className= {inter.className}>
        <CartProvider >
          <Nav/>
          <CartModal /> 
         
        
         <div>{children}</div>
         {/* <ScrollToTopBottom/> */}
         {/* <ScrollToTopIcon/> */}
        </CartProvider>
        <Footer/>
      </body>
    </html>
  );
}
