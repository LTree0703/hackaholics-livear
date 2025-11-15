import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LiveAR - eVTOL Sky Tours | Electric Aviation Experience",
  description:
    "Experience the future of urban aviation with LiveAR's cutting-edge eVTOL aircraft. Book scheduled tours, custom flights, or try our AR demo. Zero emissions, electric powered, safety certified.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />

          <main className="min-h-[calc(100vh-8rem)]">{children}</main>

          <footer className="bg-emerald-800 text-emerald-100 px-6 flex items-center h-16">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 LiveAR Cathay. All rights reserved.</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
