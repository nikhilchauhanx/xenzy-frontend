import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";

// Configure the fonts using next/font
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-playfair',
});

export const metadata = {
  title: "Xenzy - Style Reimagined. Sustainably Sourced.",
  description: "A multi-vendor marketplace for second-hand and vintage clothing.",
};

// --- Helper component for icons ---
// A real app would use a library like Lucide-React, but this is fine for now.
function Icon({ name, ...props }) {
  const icons = {
    menu: '☰',
    instagram: 'IG',
    twitter: 'X',
    facebook: 'FB',
  };
  return <span {...props}>{icons[name] || ''}</span>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="font-inter bg-off-white text-near-black">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-off-white/80 backdrop-blur-lg border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="font-playfair text-3xl font-bold text-near-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-green rounded">
                Xenzy
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/shop" className="text-near-black hover:text-sage-green transition-colors duration-300">Shop</Link>
                <Link href="/sell" className="text-near-black hover:text-sage-green transition-colors duration-300">Sell</Link>
                <Link href="/about" className="text-near-black hover:text-sage-green transition-colors duration-300">About</Link>
                <Link href="/community" className="text-near-black hover:text-sage-green transition-colors duration-300">Community</Link>
              </nav>

              {/* Action Buttons & Mobile Menu Toggle */}
              <div className="flex items-center space-x-4">
                <button className="hidden sm:block text-near-black hover:text-sage-green transition-colors duration-300">Log In</button>
                <button className="hidden sm:block bg-sage-green text-white px-5 py-2 rounded-lg hover:opacity-90 transition-opacity duration-300">Sign Up</button>
                <button className="md:hidden p-2 rounded-md text-near-black hover:bg-gray-200">
                  <Icon name="menu" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* This is where the content of other pages (like page.js) will be inserted */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-playfair text-xl font-bold mb-4">Xenzy</h3>
                <p className="text-sm text-gray-600">Style Reimagined. Sustainably Sourced.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="#" className="hover:underline">New Arrivals</Link></li>
                  <li><Link href="#" className="hover:underline">Trending</Link></li>
                  <li><Link href="#" className="hover:underline">Categories</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">About</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li><Link href="#" className="hover:underline">Our Story</Link></li>
                  <li><Link href="#" className="hover:underline">Sustainability</Link></li>
                  <li><Link href="#" className="hover:underline">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <Link href="#" className="text-gray-500 hover:text-near-black"><Icon name="instagram" /></Link>
                  <Link href="#" className="text-gray-500 hover:text-near-black"><Icon name="twitter" /></Link>
                  <Link href="#" className="text-gray-500 hover:text-near-black"><Icon name="facebook" /></Link>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
              <p>&copy; 2024 Xenzy. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
