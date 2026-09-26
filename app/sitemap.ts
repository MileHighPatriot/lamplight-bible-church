import type { MetadataRoute } from "next";
import { books } from "@/data/bible";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    "",
    "/visit",
    "/teaching",
    ...books.map((b) => `/teaching/${b.slug}`),
    "/watch",
    "/groups",
    "/next-gen",
    "/events",
    "/read",
    "/beliefs",
    "/prayer",
    "/give",
    "/about",
  ];
  return routes.map((path) => ({ url: `${site.url}${path}/`, lastModified }));
}
