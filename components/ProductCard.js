import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  // --- THIS IS THE FIX ---
  // We access the seller's name from the nested 'profiles' object.
  // We use optional chaining (?.) as a safeguard in case a profile is missing for any reason.
  const sellerName = product.profiles?.full_name || 'Anonymous';
  const priceAsNumber = parseFloat(product.price) || 0;

  return (
    <Link href={`/product/${product.id}`} className="group cursor-pointer">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>
      <h4 className="mt-4 text-base font-medium text-gray-800">{product.name}</h4>
      {/* The seller's name is now correctly displayed here */}
      <p className="mt-1 text-sm text-gray-500">Sold by {sellerName}</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">${priceAsNumber.toFixed(2)}</p>
    </Link>
  );
}
