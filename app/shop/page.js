import ProductCard from '@/components/ProductCard';

// This is an async function that fetches data on the server.
async function getProducts() {
  try {
    // We fetch directly from our backend API.
    // The { cache: 'no-store' } option is crucial here.
    const res = await fetch('http://localhost:3001/api/products', { cache: 'no-store' });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await res.json();
    
    // Filter for valid products on the server
    return data.filter(product => 
      product && typeof product.imageUrl === 'string' && product.imageUrl.startsWith('http')
    );

  } catch (error) {
    console.error("Error in getProducts:", error);
    return []; // Return an empty array on error
  }
}


// This is now an async Server Component
export default async function ShopPage() {
  // We call our data fetching function and wait for the result
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Sidebar (remains the same) */}
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
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
            {/* We map over the products fetched on the server and render the cards */}
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
