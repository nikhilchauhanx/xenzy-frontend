import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header"; // <-- Import our new Header component
import Link from "next/link"; // Link is still needed for the Footer

// Configure the fonts
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

// --- Helper component for icons (only needed for Footer now) ---
function Icon({ name, ...props }) {
  const icons = {
    instagram: 'IG',
    twitter: 'X',
    facebook: 'FB',
  };
  return <span {...props}>{icons[name] || ''}</span>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body>
        <AuthProvider>
          <div className="font-inter bg-off-white text-near-black">
            
            {/* THE FIX: Use our new, dynamic Header component */}
            <Header />

            {/* Main Page Content */}
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
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
