import FeaturedCollection from "@/components/home/FeaturedCollection";
import HeroBanner from "@/components/home/HeroBanner";
import OnSale from "@/components/home/OnSale";
import TrustSignals from "@/components/home/TrustSignals";
import FadeIn from "@/components/ui/FadeIn";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const [featuredProducts, saleProducts] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true },
      include: { variants: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
    prisma.product.findMany({
      where: { isActive: true, compareAtPrice: { not: null } },
      include: { variants: true },
    }),
  ]);

  return (
    <main>
      <FadeIn>
        <HeroBanner />
      </FadeIn>
      <FadeIn delay={0.1}>
        <FeaturedCollection products={featuredProducts} />
      </FadeIn>
      <FadeIn delay={0.2}>
        <TrustSignals />
      </FadeIn>
      <FadeIn delay={0.3}>
        <OnSale products={saleProducts} />
      </FadeIn>
    </main>
  );
}
