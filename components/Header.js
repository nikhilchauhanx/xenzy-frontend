"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

// --- Helper component for icons ---
function Icon({ name, ...props }) {
    const icons = { menu: '☰' };
    return <span {...props}>{icons[name] || ''}</span>;
}

export default function Header() {
  // Get the user's status and the logout function from our global context
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-off-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="font-playfair text-3xl font-bold text-near-black">
            Xenzy
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-near-black hover:text-sage-green">Shop</Link>
            <Link href="/sell" className="text-near-black hover:text-sage-green">Sell</Link>
            <Link href="/about" className="text-near-black hover:text-sage-green">About</Link>
            <Link href="/community" className="text-near-black hover:text-sage-green">Community</Link>
          </nav>

          {/* Action Buttons & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // If the user IS authenticated, show their email and a Logout button
              <>
                <span className="hidden sm:block text-sm text-gray-600">Welcome, {user.email}</span>
                <button 
                  onClick={logout} 
                  className="hidden sm:block text-near-black hover:text-sage-green"
                >
                  Log Out
                </button>
              </>
            ) : (
              // If the user is NOT authenticated, show the Log In and Sign Up links
              <>
                <Link href="/login" className="hidden sm:block text-near-black hover:text-sage-green">
                  Log In
                </Link>
                <Link href="/signup" className="hidden sm:block bg-sage-green text-white px-5 py-2 rounded-lg hover:opacity-90">
                  Sign Up
                </Link>
              </>
            )}
            <button className="md:hidden p-2 rounded-md text-near-black hover:bg-gray-200">
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
