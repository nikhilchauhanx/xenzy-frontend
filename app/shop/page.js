import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import FilterSidebar from '@/components/FilterSidebar';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export default async function ShopPage({ searchParams }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const query = searchParams.q;
  const categories = searchParams.categories?.split(',');
  const maxPrice = searchParams.maxPrice;

  let supabaseQuery = supabase
    .from('products')
    .select(`*, profiles (full_name)`);

  if (query) {
    supabaseQuery = supabaseQuery.ilike('name', `%${query}%`);
  }
  if (categories && categories.length > 0) {
    supabaseQuery = supabaseQuery.in('category', categories);
  }
  if (maxPrice) {
    supabaseQuery = supabaseQuery.lte('price', maxPrice);
  }

  const { data: products, error } = await supabaseQuery;

  if (error) {
    console.error("Error fetching products:", error.message);
  }

  return (
    <Suspense fallback={<div className="text-center p-8">Loading...</div>}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <FilterSidebar />
          <div className="lg:col-span-3 mt-10 lg:mt-0">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">All Items</h1>
            </div>
            <SearchBar />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No products found. Try adjusting your filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
