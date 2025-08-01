import Image from 'next/image';
import Link from 'next/link';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton'; // 1. Import the new button

async function getProductAndSeller(id) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      profiles (
        full_name
      )
    `)
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }

  return data;
}

export default async function ProductDetailPage({ params }) {
  const productId = params.id;
  const product = await getProductAndSeller(productId);

  const sellerName = product.profiles?.full_name || 'Anonymous Seller';
  const priceAsNumber = parseFloat(product.price) || 0;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square w-full rounded-lg overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-4">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-blue-500">
                <Image src={product.imageUrl} alt="thumbnail" width={150} height={150} className="w-full h-full object-cover"/>
              </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-3xl mt-2 text-blue-600">${priceAsNumber.toFixed(2)}</p>
          
          <div className="mt-6 border-t border-b border-gray-200 py-5">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="mt-2 text-gray-600">{product.description || 'No description provided.'}</p>
          </div>

          <div className="mt-8">
            {/* 2. Replace the old button with our new, interactive component */}
            <AddToCartButton productId={product.id} />
            
            <button className="w-full mt-4 border border-gray-400 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Message Seller
            </button>
          </div>

          {/* Seller Info Box */}
          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 flex items-center">
            <Image src={`https://placehold.co/64x64/E07A5F/FFFFFF?text=${sellerName.charAt(0)}`} alt="Seller avatar" width={64} height={64} className="rounded-full" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Sold by</p>
              <p className="font-bold text-lg">{sellerName}</p>
            </div>
            <Link href="#" className="ml-auto border border-gray-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100">
              View Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
