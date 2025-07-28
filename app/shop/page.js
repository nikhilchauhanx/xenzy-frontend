"use client";

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // THE FIX: Filter the data to ensure we only have valid items
        // before setting the state.
        const validProducts = data.filter(product => 
          product && typeof product.imageUrl === 'string' && product.imageUrl.startsWith('http')
        );
        setProducts(validProducts);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Filters</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-dusty-terracotta focus:ring-dusty-terracotta" /> <span className="ml-2">Tops</span></label>
                <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-dusty-terracotta focus:ring-dusty-terracotta" /> <span className="ml-2">Bottoms</span></label>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <input type="range" min="0" max="500" defaultValue="250" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-dusty-terracotta" />
              <div className="flex justify-between text-sm mt-1"><span>$0</span><span>$500+</span></div>
            </div>
            <button className="w-full bg-sage-green text-white py-2 rounded-lg hover:opacity-90 transition-opacity">Apply Filters</button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:col-span-3 mt-10 lg:mt-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">All Items</h1>
            <select className="border-gray-300 rounded-lg focus:ring-sage-green focus:border-sage-green">
              <option>Sort by Newest</option>
              <option>Sort by Price: Low to High</option>
              <option>Sort by Price: High to Low</option>
            </select>
          </div>
          
          {isLoading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
