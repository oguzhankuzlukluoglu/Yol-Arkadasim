import Footer from "@/components/footer/Footer";
import "./globals.css" 
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarSection from "@/components/navbar/NavbarSection";

export const metadata = {
  title: "Yol Arkaşım",
  description: "Yol Arkadaşıma Hoşgeldin!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <div className="wrapper">
            <NavbarSection/>
            {children}
            <Footer/>
          </div>
        </div>
      </body>
    </html>
  );
}
