"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  // Get the new functions from our upgraded context
  const { cartItems, isLoading, cartItemCount, removeItem, updateQuantity } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.products?.price) || 0;
    const quantity = parseInt(item.quantity, 10) || 0;
    return total + (price * quantity);
  }, 0);

  if (isLoading) {
    return <div className="text-center py-10">Loading your cart...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cartItemCount > 0 ? (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2">
            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                    <Image
                      src={item.products.imageUrl}
                      alt={item.products.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link href={`/product/${item.product_id}`}>{item.products.name}</Link>
                        </h3>
                        <p className="ml-4">${(item.products.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      {/* --- NEW: Interactive Quantity Controls --- */}
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-l-md"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-lg font-medium text-gray-600 hover:bg-gray-100 rounded-r-md"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex">
                        {/* --- NEW: Functional Remove Button --- */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          type="button" 
                          className="font-medium text-red-600 hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900">Order total</p>
                  <p className="text-base font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6">
                <button
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
          <h2 className="text-xl font-medium text-gray-900">Your cart is empty</h2>
          <p className="mt-1 text-sm text-gray-500">Looks like you haven't added anything to your cart yet.</p>
          <div className="mt-6">
            <button
              onClick={() => router.push('/shop')}
              className="bg-blue-600 text-white py-2 px-5 rounded-md font-semibold hover:bg-blue-700"
            >
              Start Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
