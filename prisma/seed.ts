// @ts-nocheck
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data (order matters for foreign keys)
  await prisma.orderItem.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  // 1. Classic Cotton Tee
  await prisma.product.create({
    data: {
      name: "Classic Cotton Tee",
      slug: "classic-cotton-tee",
      description:
        "A wardrobe essential crafted from 100% organic cotton. Features a relaxed fit, ribbed crew neckline, and pre-shrunk fabric for lasting comfort wash after wash.",
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      ],
      variants: {
        create: [
          { color: "Black", size: "S", sku: "CCT-BLK-S", price: 2999, stock: 20 },
          { color: "Black", size: "M", sku: "CCT-BLK-M", price: 2999, stock: 15 },
          { color: "Black", size: "L", sku: "CCT-BLK-L", price: 2999, stock: 10 },
          { color: "White", size: "S", sku: "CCT-WHT-S", price: 2999, stock: 18 },
          { color: "White", size: "M", sku: "CCT-WHT-M", price: 2999, stock: 12 },
          { color: "White", size: "L", sku: "CCT-WHT-L", price: 2999, stock: 8 },
        ],
      },
    },
  });

  // 2. Leather Crossbody Bag
  await prisma.product.create({
    data: {
      name: "Leather Crossbody Bag",
      slug: "leather-crossbody-bag",
      description:
        "Handcrafted from full-grain Italian leather with an adjustable strap and magnetic closure. The perfect everyday companion with room for your phone, wallet, and essentials.",
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      ],
      compareAtPrice: 12900,
      variants: {
        create: [
          { color: "Brown", size: "One Size", sku: "LCB-BRN-OS", price: 8900, stock: 10 },
          { color: "Black", size: "One Size", sku: "LCB-BLK-OS", price: 8900, stock: 8 },
        ],
      },
    },
  });

  // 3. Minimalist Watch
  await prisma.product.create({
    data: {
      name: "Minimalist Watch",
      slug: "minimalist-watch",
      description:
        "Clean dial design with Japanese quartz movement and scratch-resistant sapphire crystal. Water-resistant to 50 meters with a genuine leather strap.",
      images: [
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      ],
      variants: {
        create: [
          { color: "Silver", size: "One Size", sku: "MW-SLV-OS", price: 12900, stock: 6 },
          { color: "Gold", size: "One Size", sku: "MW-GLD-OS", price: 12900, stock: 4 },
          { color: "Rose Gold", size: "One Size", sku: "MW-RSG-OS", price: 12900, stock: 5 },
        ],
      },
    },
  });

  // 4. Wool Blend Scarf
  await prisma.product.create({
    data: {
      name: "Wool Blend Scarf",
      slug: "wool-blend-scarf",
      description:
        "Luxuriously soft 70% merino wool and 30% cashmere blend. Generously sized at 180×60 cm with hand-rolled edges for an elegant drape.",
      images: [
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
        "https://images.unsplash.com/photo-1584736286279-64b03e8e9815?w=800&q=80",
      ],
      compareAtPrice: 5900,
      variants: {
        create: [
          { color: "Camel", size: "One Size", sku: "WBS-CML-OS", price: 3900, stock: 14 },
          { color: "Gray", size: "One Size", sku: "WBS-GRY-OS", price: 3900, stock: 12 },
          { color: "Navy", size: "One Size", sku: "WBS-NVY-OS", price: 3900, stock: 10 },
        ],
      },
    },
  });

  console.log("Seed data inserted successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
