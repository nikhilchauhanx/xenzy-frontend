"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext'; // 1. Import the useCart hook
import { useRouter } from 'next/navigation';

export default function AddToCartButton({ productId }) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart(); // 2. Get the addToCart function from the context
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }

    setIsLoading(true);
    // 3. Call the addToCart function from our context
    const result = await addToCart(productId);

    if (result.success) {
      // The context will automatically update the header, so we don't need an alert.
      // We can add a more subtle confirmation later if we want.
      console.log('Item added to cart!');
    } else {
      alert(`Error: ${result.error}`);
    }
    
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
