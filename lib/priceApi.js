const API_BASE_URL = process.env.API_BASE_URL || "https://super-emas-be.onrender.com";
const TROY_OUNCE_GRAMS = 31.1034768;

export async function getPriceData() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/comparison-data`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Price API returned ${response.status}`);
    }

    const data = await response.json();
    if (!data?.priceData || typeof data.priceData !== "object") {
      throw new Error("Price API returned an invalid format");
    }

    const prices = Object.entries(data.priceData)
      .map(([karat, value]) => ({
        karat,
        label: String(karat).replace(/^_+/, "").replace(/_/g, " ").replace(/\s+/g, " ").trim(),
        price: Number(
          value?.buybackPrice ?? value?.buyBackPrice ?? value?.price ?? value ?? 0
        ),
      }))
      .filter((item) => item.karat && item.price > 0);

    return {
      prices,
      date: data.date || null,
      latestUpdate: data.latestUpdate || null,
    };
  } catch (error) {
    console.error("Unable to load server price data:", error);
    return { prices: [], date: null, latestUpdate: null };
  }
}

export async function getWorldGoldPrice() {
  try {
    const [goldResponse, exchangeResponse] = await Promise.all([
      fetch("https://api.gold-api.com/price/XAU", { next: { revalidate: 300 } }),
      fetch("https://open.er-api.com/v6/latest/USD", { next: { revalidate: 300 } }),
    ]);

    if (!goldResponse.ok || !exchangeResponse.ok) {
      throw new Error(`World gold price API returned ${goldResponse.status}/${exchangeResponse.status}`);
    }

    const [goldData, exchangeData] = await Promise.all([
      goldResponse.json(),
      exchangeResponse.json(),
    ]);
    const goldPriceUsdPerOunce = Number(goldData?.price);
    const usdToIdr = Number(exchangeData?.rates?.IDR);

    if (
      goldData?.currency !== "USD" ||
      exchangeData?.result !== "success" ||
      !Number.isFinite(goldPriceUsdPerOunce) ||
      goldPriceUsdPerOunce <= 0 ||
      !Number.isFinite(usdToIdr) ||
      usdToIdr <= 0
    ) {
      throw new Error("World gold price API returned invalid price or exchange-rate data");
    }

    const timestamps = [goldData.updatedAt, exchangeData.time_last_update_utc]
      .map((timestamp) => Date.parse(timestamp))
      .filter(Number.isFinite);

    return {
      pricePerGram: (goldPriceUsdPerOunce * usdToIdr) / TROY_OUNCE_GRAMS,
      updatedAt: timestamps.length ? new Date(Math.min(...timestamps)).toISOString() : null,
    };
  } catch (error) {
    console.error("Unable to load world gold price:", error);
    return null;
  }
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("IDR", "Rp");
}
