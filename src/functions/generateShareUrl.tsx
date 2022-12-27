import type { ShareUrlData } from "../types";

export function generateShareUrl({ input, parser }: ShareUrlData) {
  const origin = location.origin;
  const json = JSON.stringify({ input, parser });
  return `${origin}/#${encodeURIComponent(json)}`;
}
