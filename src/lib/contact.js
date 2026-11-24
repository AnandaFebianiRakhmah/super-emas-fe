export const PHONE_E164 = "+6285111405501";
export const PHONE_DISPLAY = "0851-1140-5501";
export const WA_NUMBER = "6285111405501";

export const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
