import Image from 'next/image';
import Link from 'next/link';

// This is an async function that fetches a single product by its ID from our backend.
// It runs on the server before the page is rendered.
async function getProductById(id) {
  try {
    const res = await fetch(`http://localhost:3001/api/products/${id}`, { cache: 'no-store' });

    if (!res.ok) {
      // If the product is not found (404), we can handle it gracefully.
      if (res.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch product');
    }
    
    return res.json();
  } catch (error) {
    console.error("Error in getProductById:", error);
    return null; // Return null on error
  }
}

// This is now an async Server Component.
// It receives `params` which contains the dynamic parts of the URL (e.g., params.id)
export default async function ProductDetailPage({ params }) {
  const productId = params.id;
  const product = await getProductById(productId);

  // If the product was not found, display a message.
  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Product not found.</h1>
        <Link href="/shop" className="mt-4 inline-block text-sage-green hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Convert price to number for formatting
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
          {/* A real app would have more images here */}
          <div className="mt-4 grid grid-cols-5 gap-4">
             <div className="aspect-square rounded-lg overflow-hidden border-2 border-sage-green">
                <Image src={product.imageUrl} alt="thumbnail" width={150} height={150} className="w-full h-full object-cover"/>
             </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl lg:text-4xl font-bold text-near-black">{product.name}</h1>
          <p className="text-3xl mt-2 text-sage-green">${priceAsNumber.toFixed(2)}</p>
          
          <div className="mt-6 border-t border-b border-gray-200 py-5">
            <h3 className="font-semibold text-lg">Description</h3>
            {/* In a real app, this would be a separate field in the database */}
            <p className="mt-2 text-gray-600">A high-quality, pre-loved item from a seller in our community. Perfect for adding a unique touch to your wardrobe.</p>
          </div>

          <div className="mt-8">
            <button className="w-full bg-dusty-terracotta text-white py-3 rounded-lg font-semibold hover:opacity-90">
              Add to Cart
            </button>
            <button className="w-full mt-4 border border-sage-green text-sage-green py-3 rounded-lg font-semibold hover:bg-sage-green hover:text-white transition-colors">
              Message Seller
            </button>
          </div>

          {/* Seller Info Box */}
          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 flex items-center">
            <Image src="https://placehold.co/64x64/E07A5F/FFFFFF?text=S" alt="Seller avatar" width={64} height={64} className="rounded-full" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Sold by</p>
              <p className="font-bold text-lg">{product.seller}</p>
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
