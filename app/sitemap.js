import { locations } from "../src/data/locationData";
import { getPriceData } from "../lib/priceApi";

const SITE_URL = "https://www.superemas.id";

function parsePriceDate(dateText) {
  if (!dateText) return null;

  const monthNames = {
    januari: 0,
    februari: 1,
    maret: 2,
    april: 3,
    mei: 4,
    juni: 5,
    juli: 6,
    agustus: 7,
    september: 8,
    oktober: 9,
    november: 10,
    desember: 11,
  };
  const match = String(dateText).toLowerCase().match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
  if (!match || monthNames[match[2]] === undefined) return null;

  return new Date(Number(match[3]), monthNames[match[2]], Number(match[1]));
}

export default async function sitemap() {
  const priceData = await getPriceData();
  const now = new Date();
  const priceUpdatedAt = parsePriceDate(priceData.date) || now;

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    {
      url: `${SITE_URL}/syarat-dan-ketentuan`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/harga-jual-emas-hari-ini`,
      lastModified: priceUpdatedAt,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    ...locations.map((location) => ({
      url: `${SITE_URL}/harga-emas-hari-ini/${location.slug}`,
      lastModified: priceUpdatedAt,
      changeFrequency: "hourly",
      priority: 0.9,
    })),
  ];
}
