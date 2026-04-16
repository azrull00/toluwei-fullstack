import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/katalog", "/hubungi"],
                disallow: ["/admin", "/admin/", "/login"],
            },
        ],
        sitemap: "https://toluwei.biz.id/sitemap.xml",
        host: "https://toluwei.biz.id",
    };
}
