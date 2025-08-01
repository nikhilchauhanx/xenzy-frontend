"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext'; // 1. Import the useCart hook
import { useRouter } from 'next/navigation';

// A simple SVG icon for the shopping cart
function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

export default function Header() {
  const { user, isAuthenticated, supabase } = useAuth();
  const { cartItemCount } = useCart(); // 2. Get the item count from the CartContext
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Xenzy
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/shop" className="text-gray-600 hover:text-blue-500">Shop</Link>
          {isAuthenticated ? (
            <>
              <Link href="/sell" className="text-gray-600 hover:text-blue-500">Seller Dashboard</Link>
              {/* Ensure user object exists before trying to access email */}
              <span className="text-gray-700">{user?.email}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Login
            </Link>
          )}

          {/* 3. Add the Cart Link and Item Count */}
          <Link href="/cart" className="relative text-gray-600 hover:text-blue-500">
            <CartIcon />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

        </div>
      </nav>
    </header>
  );
}
