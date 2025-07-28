import Image from 'next/image';
import Link from 'next/link';

// In a real app, you'd fetch this data from your backend based on the `params.id`
// For now, we'll use some mock data.
const mockProduct = {
  id: 1,
  name: "Levi's 501 High-Waist Jeans",
  price: 48.00,
  description: "Classic high-waisted Levi's 501 jeans in a light wash. Perfectly worn-in for a comfortable, vintage feel. No major flaws, just authentic character. A timeless wardrobe staple.",
  condition: "Vintage - Excellent",
  size: "W28 L32",
  color: "Light Wash Blue",
  images: [
    { id: 1, url: 'https://placehold.co/600x600/B2AC88/FFFFFF?text=Levi%27s+501' },
    { id: 2, url: 'https://placehold.co/150x150/B2AC88/FFFFFF?text=Front' },
    { id: 3, url: 'https://placehold.co/150x150/F5F5DC/333333?text=Back' },
    { id: 4, url: 'https://placehold.co/150x150/F5F5DC/333333?text=Detail' },
    { id: 5, url: 'https://placehold.co/150x150/F5F5DC/333333?text=Tag' },
  ],
  seller: {
    username: '@denimdreams',
    avatarUrl: 'https://placehold.co/64x64/E07A5F/FFFFFF?text=D',
    rating: 4.5,
    reviews: 125,
  }
};

// The `params` prop is automatically passed by Next.js for dynamic routes.
// It contains the dynamic part of the URL, so `params.id` will be '1', '2', etc.
export default function ProductDetailPage({ params }) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square w-full rounded-lg overflow-hidden">
            <Image
              src={mockProduct.images[0].url}
              alt={mockProduct.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="mt-4 grid grid-cols-5 gap-4">
            {mockProduct.images.slice(1).map((image) => (
              <button key={image.id} className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-sage-green focus:border-sage-green focus:outline-none">
                <Image
                  src={image.url}
                  alt="thumbnail"
                  width={150}
                  height={150}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-10 lg:mt-0">
          <h1 className="text-3xl lg:text-4xl font-bold text-near-black">{mockProduct.name}</h1>
          <p className="text-3xl mt-2 text-sage-green">${mockProduct.price.toFixed(2)}</p>
          
          <div className="mt-6 border-t border-b border-gray-200 py-5">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="mt-2 text-gray-600">{mockProduct.description}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div><span className="font-semibold">Condition:</span> {mockProduct.condition}</div>
            <div><span className="font-semibold">Size:</span> {mockProduct.size}</div>
            <div><span className="font-semibold">Color:</span> {mockProduct.color}</div>
          </div>

          <div className="mt-8">
            <button className="w-full bg-dusty-terracotta text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dusty-terracotta">
              Add to Cart
            </button>
            <button className="w-full mt-4 border border-sage-green text-sage-green py-3 rounded-lg font-semibold hover:bg-sage-green hover:text-white transition-colors duration-300">
              Message Seller
            </button>
          </div>

          {/* Seller Info Box */}
          <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200 flex items-center">
            <Image src={mockProduct.seller.avatarUrl} alt="Seller avatar" width={64} height={64} className="rounded-full" />
            <div className="ml-4">
              <p className="text-sm text-gray-500">Sold by</p>
              <p className="font-bold text-lg">{mockProduct.seller.username}</p>
              <p className="text-sm text-gray-600">★★★★☆ ({mockProduct.seller.reviews} Reviews)</p>
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
