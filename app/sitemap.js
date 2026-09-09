import { locations } from "../src/data/locationData";

const SITE_URL = "https://www.superemas.id";

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/syarat-dan-ketentuan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...locations.map((location) => ({
      url: `${SITE_URL}/harga-emas-hari-ini/${location.slug}`,
      lastModified: now,
      changeFrequency: "hourly",
      priority: 0.9,
    })),
  ];
}
