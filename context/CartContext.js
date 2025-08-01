"use client";

import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

// Create the context
const CartContext = createContext(null);

// Create the CartProvider component
export function CartProvider({ children }) {
  const { user, supabase } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch the user's current cart from the database
  const fetchCart = useCallback(async () => {
    if (!user) {
      setCartItems([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select('*, products(*)') // Also fetch the full product details
        .eq('user_id', user.id)
        .order('created_at', { ascending: true }); // Sort by when they were added

      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, supabase]);

  // Fetch the cart when the user's auth state changes
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Function to add an item to the cart
  const addToCart = async (productId) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) throw new Error('Failed to add item.');
      await fetchCart(); // Refresh cart state
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  // --- NEW: Function to remove an item from the cart ---
  const removeItem = async (cartItemId) => {
    try {
        const response = await fetch('/api/cart/remove', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItemId }),
        });
        if (!response.ok) throw new Error('Failed to remove item.');
        await fetchCart(); // Refresh cart state
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
  };

  // --- NEW: Function to update an item's quantity ---
  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
        const response = await fetch('/api/cart/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cartItemId, newQuantity }),
        });
        if (!response.ok) throw new Error('Failed to update quantity.');
        await fetchCart(); // Refresh cart state
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
  };
  
  // Calculate the total number of items in the cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeItem,      // Expose the new function
    updateQuantity,  // Expose the new function
    fetchCart,
    isLoading,
    cartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Create the custom hook to use the context easily
export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
