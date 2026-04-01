export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/checkout", "/api/"],
    },
    sitemap: "https://your-domain.vercel.app/sitemap.xml",
  };
}
