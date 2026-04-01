export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/checkout", "/api/"],
    },
    sitemap: "https://my-shop-seven-iota.vercel.app/sitemap.xml",
  };
}
