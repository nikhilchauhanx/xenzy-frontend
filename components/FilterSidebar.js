"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// A list of available categories. In a real app, you might fetch this from the database.
const categories = ['Tops', 'Bottoms', 'Accessories'];

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State to hold the selected filters
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(500);

  // When the component loads, read the filters from the URL and set the initial state
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    const categoriesFromUrl = params.get('categories')?.split(',') || [];
    const priceFromUrl = params.get('maxPrice') || 500;
    
    setSelectedCategories(categoriesFromUrl);
    setMaxPrice(Number(priceFromUrl));
  }, [searchParams]);

  // Handle changes to the category checkboxes
  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category) // Uncheck: remove from array
      : [...selectedCategories, category]; // Check: add to array
    setSelectedCategories(newCategories);
  };

  // Handle applying the filters
  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams);

    // Set the categories in the URL
    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','));
    } else {
      params.delete('categories');
    }

    // Set the max price in the URL
    params.set('maxPrice', maxPrice);

    // Push the new URL. This will cause the Shop page to re-render with the filters.
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <aside className="lg:col-span-1">
      <h2 className="text-2xl font-bold mb-6">Filters</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="ml-2">{category}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <input
            type="range"
            min="0"
            max="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-sm mt-1">
            <span>$0</span>
            <span>${maxPrice}{maxPrice == 500 ? '+' : ''}</span>
          </div>
        </div>
        <button
          onClick={handleApplyFilters}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
