export default function sitemap() {
  const baseUrl = "https://my-shop-seven-iota.vercel.app";

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), priority: 0.9 },
  ];

  const productSlugs = [
    "classic-cotton-tee",
    "leather-crossbody-bag",
    "minimalist-watch",
    "wool-blend-scarf",
  ];

  const productPages = productSlugs.map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
