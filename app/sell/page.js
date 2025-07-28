"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

// Helper component for dashboard icons
function DashboardIcon({ name }) {
    const icons = { grid: '▦', package: '📦', dollar: '$', user: '👤' };
    return <span className="mr-3 w-5 h-5 inline-block">{icons[name]}</span>
}

export default function SellerDashboardPage() {
  const { isAuthenticated, token } = useAuth();
  const router = useRouter();

  // State to hold the user's actual products from the database
  const [myListings, setMyListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // This effect runs when the component loads or when the token changes
  useEffect(() => {
    // Only fetch data if the user is authenticated
    if (isAuthenticated && token) {
      const fetchMyProducts = async () => {
        setIsLoading(true);
        try {
          const response = await fetch('http://localhost:3001/api/my-products', {
            headers: {
              // We must include the token to access this protected route
              'Authorization': `Bearer ${token}`,
            },
            cache: 'no-store', // Always fetch the latest data
          });

          if (!response.ok) {
            throw new Error('Failed to fetch your products.');
          }

          const data = await response.json();
          setMyListings(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchMyProducts();
    } else {
      // If the user is not authenticated, don't try to load anything
      setIsLoading(false);
    }
  }, [isAuthenticated, token]); // Re-run this effect if authentication status changes


  // If loading is finished and user is not logged in, show a message.
  if (!isLoading && !isAuthenticated) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Please log in to view your dashboard.</h1>
        <button onClick={() => router.push('/login')} className="mt-4 bg-sage-green text-white px-6 py-2 rounded-lg">
          Log In
        </button>
      </div>
    );
  }

  // If the user is logged in, show the dashboard.
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold font-playfair mb-8">Seller Dashboard</h1>
      <div className="lg:grid lg:grid-cols-4 lg:gap-12">
        {/* Dashboard Navigation Sidebar */}
        <aside className="lg:col-span-1">
          <nav className="flex flex-col space-y-2">
            <Link href="/sell" className="bg-sage-green/20 text-sage-green font-semibold px-4 py-3 rounded-lg flex items-center">
              <DashboardIcon name="grid" /> My Listings
            </Link>
            {/* ... other links ... */}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-3 mt-10 lg:mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Listings</h2>
            <Link href="/sell/new" className="bg-dusty-terracotta text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90">
              Add New Listing
            </Link>
          </div>

          {/* Listings Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              {isLoading ? (
                <p className="p-4">Loading your listings...</p>
              ) : (
                <table className="w-full text-left">
                  <thead className="border-b bg-gray-50">
                    <tr>
                      <th className="p-4 font-semibold text-sm">Product</th>
                      <th className="p-4 font-semibold text-sm">Price</th>
                      <th className="p-4 font-semibold text-sm">Status</th>
                      <th className="p-4 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myListings.length > 0 ? (
                      myListings.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center">
                              <Image src={item.imageUrl} alt={item.name} width={50} height={50} className="rounded-md mr-4 object-cover" />
                              <span className="font-medium">{item.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-600">${parseFloat(item.price).toFixed(2)}</td>
                          <td className="p-4">
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                              Active
                            </span>
                          </td>
                          <td className="p-4">
                            <a href="#" className="text-sage-green font-semibold hover:underline">Edit</a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="p-4 text-center text-gray-500">You haven't listed any products yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
