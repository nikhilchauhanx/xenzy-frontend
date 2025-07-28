import ProductCard from '@/components/ProductCard';

// Mock data for products. Later, this will come from our backend API.
const mockProducts = [
  { id: 1, name: 'Classic Trench Coat', seller: '@timeless_threads', price: 120.00, imageUrl: 'https://placehold.co/400x500/B2AC88/FFFFFF?text=Item+5' },
  { id: 2, name: 'Vintage Silk Scarf', seller: '@vintagesoul', price: 18.00, imageUrl: 'https://placehold.co/400x500/E07A5F/FFFFFF?text=Item+6' },
  { id: 3, name: '80s Windbreaker Jacket', seller: '@retrorewind', price: 75.00, imageUrl: 'https://placehold.co/400x500/B2AC88/FFFFFF?text=Item+7' },
  { id: 4, name: 'Leather Ankle Boots', seller: '@stylehunter', price: 88.00, imageUrl: 'https://placehold.co/400x500/E07A5F/FFFFFF?text=Item+8' },
  { id: 5, name: 'Denim Overall Dress', seller: '@denimdreams', price: 45.00, imageUrl: 'https://placehold.co/400x500/B2AC88/FFFFFF?text=Item+9' },
  { id: 6, name: 'Knit Cardigan', seller: '@cozycorner', price: 32.00, imageUrl: 'https://placehold.co/400x500/E07A5F/FFFFFF?text=Item+10' },
];


export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <h2 className="text-2xl font-bold mb-6">Filters</h2>
          {/* We will make this a separate component later if needed */}
          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-dusty-terracotta focus:ring-dusty-terracotta" /> <span className="ml-2">Tops</span></label>
                <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-dusty-terracotta focus:ring-dusty-terracotta" /> <span className="ml-2">Bottoms</span></label>
                <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-dusty-terracotta focus:ring-dusty-terracotta" /> <span className="ml-2">Dresses</span></label>
                <label className="flex items-center"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-dusty-terracotta focus:ring-dusty-terracotta" /> <span className="ml-2">Outerwear</span></label>
              </div>
            </div>
            {/* Price Filter */}
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
            {/* We map over our mock data and render a ProductCard for each item */}
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
