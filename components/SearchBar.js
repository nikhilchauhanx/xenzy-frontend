"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state with the current search query from the URL
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSearch = (e) => {
    e.preventDefault();
    // When the form is submitted, we push a new URL with the search query.
    // This will cause the Shop page to re-render with the filtered results.
    router.push(`/shop?q=${query}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center w-full mb-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for items..."
        className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
