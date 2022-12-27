import type { ShareUrlData } from "../types";

export function getShareDataFromUrl(): ShareUrlData | null {
  const data = location.hash.slice(1);
  if (!data) return null;
  location.hash = "";
  try {
    const { input, parser } = JSON.parse(decodeURIComponent(data));
    if (typeof input !== "string" || typeof parser !== "string") return null;

    return { input, parser };
  } catch {
    return null;
  }
}
