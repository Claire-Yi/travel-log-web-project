import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import 'react-day-picker/dist/style.module.css';
// import './day-picker.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Log",
  description: "Nick and Claire travel app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
          <main className="relative overflow-hidden">
            {children}
          </main>
        <Footer />
      </body>
    </html>
  );
}
