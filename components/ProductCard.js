import Image from 'next/image';
import Link from 'next/link';

// This component displays a single product.
// We pass in product data as 'props' (properties).
export default function ProductCard({ product }) {
  // Use default values if product data is missing, to prevent errors
  const item = product || {};

  return (
    <Link href={`/product/${item.id || '1'}`} className="group cursor-pointer">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <Image 
          src={item.imageUrl || 'https://placehold.co/400x400/B2AC88/FFFFFF?text=Item'} 
          alt={item.name || 'Product Image'}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>
      <h4 className="mt-4 text-base font-medium text-near-black">{item.name || 'Product Name'}</h4>
      <p className="mt-1 text-sm text-gray-500">Sold by {item.seller || '@seller'}</p>
      <p className="mt-1 text-lg font-semibold text-near-black">${item.price ? item.price.toFixed(2) : '0.00'}</p>
    </Link>
  );
}
