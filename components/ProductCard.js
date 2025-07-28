import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  // We can now trust that the 'product' prop is valid because
  // it was filtered in the parent ShopPage component.

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
      <h4 className="mt-4 text-base font-medium text-near-black">{product.name}</h4>
      <p className="mt-1 text-sm text-gray-500">Sold by {product.seller}</p>
      <p className="mt-1 text-lg font-semibold text-near-black">${product.price.toFixed(2)}</p>
    </Link>
  );
}
