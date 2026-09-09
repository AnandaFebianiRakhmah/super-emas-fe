const API_BASE_URL = process.env.API_BASE_URL || "https://super-emas-be.onrender.com";

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
