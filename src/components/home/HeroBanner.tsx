import Image from "next/image";
import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center text-center md:min-h-[80vh]">
      <Image
        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80"
        alt=""
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-white/60" />
      <div className="relative z-10 space-y-6 px-4">
        <span className="text-xs font-medium uppercase tracking-widest text-neutral-500">
          New Collection
        </span>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl md:text-6xl">
          Designed for Everyday
        </h1>
        <p className="mx-auto max-w-md text-lg text-neutral-500">
          Timeless essentials crafted with premium materials and minimal design.
        </p>
        <div>
          <Link
            href="/products"
            className="mx-auto inline-block max-w-xs rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-800 active:bg-neutral-700"
          >
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
}
