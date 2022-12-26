type ShareUrlData = {
  input: string;
  parser: string;
};

export function generateShareUrl({ input, parser }: ShareUrlData) {
  const origin = location.origin;
  const json = JSON.stringify({ input, parser });
  return `${origin}/#${encodeURIComponent(json)}`;
}

export function getShareDataFromUrl(): ShareUrlData | null {
  const data = location.hash.slice(1);
  if (!data) return null;

  try {
    const { input, parser } = JSON.parse(decodeURIComponent(data));
    if (typeof input !== "string" || typeof parser !== "string") return null;

    return { input, parser };
  } catch {
    return null;
  }
}
