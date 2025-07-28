import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative text-center h-[70vh] flex items-center justify-center">
        <Image 
          src="https://placehold.co/1600x900/F5F5DC/B2AC88?text=Sustainable+Fashion" 
          alt="Stylish person wearing thrifted clothing" 
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="relative z-10 p-4">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold text-near-black">Style Reimagined.</h1>
          <h2 className="font-playfair text-4xl md:text-6xl text-sage-green">Sustainably Sourced.</h2>
          <p className="mt-4 max-w-xl mx-auto text-lg">Discover unique, pre-loved pieces from closets just like yours. Join the movement.</p>
          <Link href="/shop" className="mt-8 inline-block bg-dusty-terracotta text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dusty-terracotta">
            Shop All Thrift
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 sm:py-24 bg-off-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Shop by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <Link href="/shop" className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
              <Image 
                src="https://placehold.co/400x400/B2AC88/FFFFFF?text=Vintage+Denim" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
                alt="Vintage Denim" 
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h4 className="text-white text-2xl font-bold">Vintage Denim</h4>
              </div>
            </Link>
            <Link href="/shop" className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
              <Image 
                src="https://placehold.co/400x400/E07A5F/FFFFFF?text=90s+Streetwear" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
                alt="90s Streetwear" 
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h4 className="text-white text-2xl font-bold">90s Streetwear</h4>
              </div>
            </Link>
            <Link href="/shop" className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
              <Image 
                src="https://placehold.co/400x400/B2AC88/FFFFFF?text=Cozy+Knitwear" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
                alt="Cozy Knitwear" 
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h4 className="text-white text-2xl font-bold">Cozy Knitwear</h4>
              </div>
            </Link>
            <Link href="/shop" className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer">
              <Image 
                src="https://placehold.co/400x400/E07A5F/FFFFFF?text=Unique+Accessories" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
                alt="Accessories" 
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h4 className="text-white text-2xl font-bold">Accessories</h4>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
