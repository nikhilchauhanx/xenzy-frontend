import Image from 'next/image';
import Link from 'next/link';

// Mock data for the seller's listings.
const sellerListings = [
  { id: 1, name: "Levi's 501 High-Waist Jeans", price: 48.00, status: 'Active', imageUrl: 'https://placehold.co/50x50/E07A5F/FFFFFF?text=Item' },
  { id: 2, name: '70s Floral Maxi Dress', price: 65.00, status: 'Active', imageUrl: 'https://placehold.co/50x50/B2AC88/FFFFFF?text=Item' },
  { id: 3, name: 'Vintage Leather Jacket', price: 85.00, status: 'Pending', imageUrl: 'https://placehold.co/50x50/E07A5F/FFFFFF?text=Item' },
  { id: 4, name: 'Retro Band Tee', price: 22.00, status: 'Sold', imageUrl: 'https://placehold.co/50x50/B2AC88/FFFFFF?text=Item' },
];

// Helper component for dashboard icons
function DashboardIcon({ name }) {
    // In a real app, we'd use a library like Lucide-React.
    // For now, these are simple placeholders.
    const icons = {
        grid: '▦',
        package: '📦',
        dollar: '$',
        user: '👤'
    };
    return <span className="mr-3 w-5 h-5 inline-block">{icons[name]}</span>
}


export default function SellerDashboardPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold font-playfair mb-8">Seller Dashboard</h1>
      <div className="lg:grid lg:grid-cols-4 lg:gap-12">
        {/* Dashboard Navigation Sidebar */}
        <aside className="lg:col-span-1">
          <nav className="flex flex-col space-y-2">
            <Link href="/sell" className="bg-sage-green/20 text-sage-green font-semibold px-4 py-3 rounded-lg flex items-center transition-colors">
              <DashboardIcon name="grid" /> My Listings
            </Link>
            <Link href="#" className="hover:bg-gray-200/60 px-4 py-3 rounded-lg flex items-center transition-colors">
              <DashboardIcon name="package" /> Orders
            </Link>
            <Link href="#" className="hover:bg-gray-200/60 px-4 py-3 rounded-lg flex items-center transition-colors">
              <DashboardIcon name="dollar" /> Payouts
            </Link>
            <Link href="#" className="hover:bg-gray-200/60 px-4 py-3 rounded-lg flex items-center transition-colors">
              <DashboardIcon name="user" /> Public Profile
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-3 mt-10 lg:mt-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Listings</h2>
            <button className="bg-dusty-terracotta text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
              Add New Listing
            </button>
          </div>

          {/* Listings Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
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
                  {sellerListings.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center">
                          <Image src={item.imageUrl} alt={item.name} width={50} height={50} className="rounded-md mr-4 object-cover" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">${item.price.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          item.status === 'Active' ? 'bg-green-100 text-green-800' :
                          item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <a href="#" className="text-sage-green font-semibold hover:underline">Edit</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
