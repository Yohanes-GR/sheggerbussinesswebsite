export function mapsSearchUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export function mapsLink(address: string, mapsUrl = "") {
  return mapsUrl.trim() || mapsSearchUrl(address);
}

export function parseMapsCoords(url: string) {
  const match = url.match(/(-?\d{1,3}\.\d{3,})\s*,\s*(-?\d{1,3}\.\d{3,})/);
  return match ? `${match[1]},${match[2]}` : null;
}

function embedSrc(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;
}

export function mapsEmbedUrl(address: string, mapsUrl = "") {
  return embedSrc(parseMapsCoords(mapsUrl) ?? address);
}

export async function mapsEmbedSrc(address: string, mapsUrl = "") {
  const fromUrl = parseMapsCoords(mapsUrl);
  if (fromUrl) return embedSrc(fromUrl);

  const share = mapsUrl.trim();
  if (share) {
    try {
      const res = await fetch(share, {
        method: "HEAD",
        redirect: "manual",
        headers: { "User-Agent": "Mozilla/5.0" },
      });
      const location = res.headers.get("location") ?? "";
      const fromRedirect = parseMapsCoords(location);
      if (fromRedirect) return embedSrc(fromRedirect);
    } catch {
      /* fall through to address search */
    }
  }

  return embedSrc(address);
}

export function telHref(value: string) {
  return `tel:${value.replace(/\s/g, "")}`;
}
