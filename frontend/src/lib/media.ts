export const CLOUD_FRONT_URL = "https://d1f23llskj06r6.cloudfront.net";

/**
 * Resolves any media path or object (S3 key, relative URL, absolute URL, markdown link)
 * into a fully-qualified CloudFront URL.
 */
export function getMediaUrl(path?: unknown): string {
  if (!path) return "";
  let mediaPath = "";

  if (Array.isArray(path)) {
    for (const item of path) {
      if (item) {
        if (typeof item === "string" && item.trim()) {
          mediaPath = item.trim();
          break;
        }
        if (typeof item === "object" && (item.url || item.path || item.fileUrl || item.key || item.src)) {
          mediaPath = item.url || item.path || item.fileUrl || item.key || item.src;
          break;
        }
      }
    }
  } else if (typeof path === "string") {
    mediaPath = path.trim();
  } else if (typeof path === "object") {
    const media = path as any;
    mediaPath =
      media.url ||
      media.path ||
      media.key ||
      media.fileUrl ||
      media.src ||
      "";
  }

  if (!mediaPath || typeof mediaPath !== "string") return "";

  // Handle markdown formatted links like [image](https://...)
  const markdownMatch = mediaPath.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
  if (markdownMatch) {
    mediaPath = markdownMatch[2];
  }

  if (
    mediaPath.startsWith("http://") ||
    mediaPath.startsWith("https://") ||
    mediaPath.startsWith("blob:") ||
    mediaPath.startsWith("data:")
  ) {
    return mediaPath;
  }

  const baseUrl =
    (typeof import.meta !== "undefined" && import.meta.env
      ? import.meta.env.VITE_CLOUDFRONT_URL || import.meta.env.VITE_MEDIA_BASE_URL
      : "") || CLOUD_FRONT_URL;

  const cleanPath = mediaPath.startsWith("/") ? mediaPath.slice(1) : mediaPath;
  return `${baseUrl.replace(/\/$/, "")}/${cleanPath}`;
}

export const resolveMediaUrl = getMediaUrl;

/**
 * Extracts and resolves the poster image URL from a content, movie, or series item.
 */
export function getPosterUrl(item: any): string {
  if (!item) return "";
  const candidates = [
    item.poster,
    item.posterImage,
    item.posterUrl,
    item.thumbnail,
    item.thumbnailImage,
    item.thumbnailUrl,
    item.banner,
    item.bannerImage,
    item.bannerUrl,
    item.image,
    item.imageUrl,
    item.cover,
    item.coverImage,
  ];

  for (const c of candidates) {
    if (!c) continue;
    if (typeof c === "string" && c.trim()) {
      const u = getMediaUrl(c);
      if (u) return u;
    }
    if (Array.isArray(c) && c.length > 0) {
      for (const sub of c) {
        if (sub) {
          const u = getMediaUrl(sub);
          if (u) return u;
        }
      }
    }
    if (typeof c === "object") {
      const u = getMediaUrl(c.url || c.fileUrl || c.path || c.key || c.src);
      if (u) return u;
    }
  }
  return "";
}

/**
 * Extracts and resolves the banner image URL from a content, movie, or series item.
 */
export function getBannerUrl(item: any): string {
  if (!item) return "";
  const candidates = [
    item.banner,
    item.bannerImage,
    item.bannerUrl,
    item.poster,
    item.posterImage,
    item.posterUrl,
    item.thumbnail,
    item.thumbnailImage,
    item.thumbnailUrl,
  ];

  for (const c of candidates) {
    if (!c) continue;
    if (typeof c === "string" && c.trim()) {
      const u = getMediaUrl(c);
      if (u) return u;
    }
    if (Array.isArray(c) && c.length > 0) {
      for (const sub of c) {
        if (sub) {
          const u = getMediaUrl(sub);
          if (u) return u;
        }
      }
    }
    if (typeof c === "object") {
      const u = getMediaUrl(c.url || c.fileUrl || c.path || c.key || c.src);
      if (u) return u;
    }
  }
  return "";
}

/**
 * Extracts and resolves the thumbnail URL from a content, movie, or series item.
 */
export function getThumbnailUrl(item: any): string {
  if (!item) return "";
  const candidates = [
    item.thumbnail,
    item.thumbnailImage,
    item.thumbnailUrl,
    item.poster,
    item.posterImage,
    item.posterUrl,
    item.banner,
    item.bannerImage,
    item.bannerUrl,
  ];

  for (const c of candidates) {
    if (!c) continue;
    if (typeof c === "string" && c.trim()) {
      const u = getMediaUrl(c);
      if (u) return u;
    }
    if (Array.isArray(c) && c.length > 0) {
      for (const sub of c) {
        if (sub) {
          const u = getMediaUrl(sub);
          if (u) return u;
        }
      }
    }
    if (typeof c === "object") {
      const u = getMediaUrl(c.url || c.fileUrl || c.path || c.key || c.src);
      if (u) return u;
    }
  }
  return "";
}

/**
 * Formats a duration in minutes into a clean "X hrs Y mins", "X hrs", or "Y mins" string.
 * Also handles strings such as "134", "134m", "2h 14m", or seconds.
 */
export function formatDurationHoursMinutes(value: unknown): string {
  if (value === undefined || value === null || value === "") return "—";

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed || trimmed === "0" || trimmed === "—" || trimmed === "-") return "—";

    // If it has hours and minutes like "2h 14m" or "2 hrs 14 mins" or "1 hr 30 mins"
    if (/\d+\s*(?:h|hr|hrs)\b/i.test(trimmed)) {
      const hMatch = trimmed.match(/(\d+)\s*(?:h|hr|hrs)/i);
      const mMatch = trimmed.match(/(\d+)\s*(?:m|min|mins|minutes)/i);
      const hours = hMatch ? parseInt(hMatch[1], 10) : 0;
      const mins = mMatch ? parseInt(mMatch[1], 10) : 0;
      const totalMins = hours * 60 + mins;
      if (totalMins > 0) {
        const h = Math.floor(totalMins / 60);
        const m = totalMins % 60;
        if (h > 0 && m > 0) return `${h} hr${h > 1 ? "s" : ""} ${m} min${m > 1 ? "s" : ""}`;
        if (h > 0) return `${h} hr${h > 1 ? "s" : ""}`;
        return `${m} min${m > 1 ? "s" : ""}`;
      }
    }

    const num = parseInt(trimmed.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(num) && num > 0) {
      const totalMinutes = num > 600 && num % 60 === 0 ? Math.round(num / 60) : num;
      const h = Math.floor(totalMinutes / 60);
      const m = totalMinutes % 60;
      if (h > 0 && m > 0) return `${h} hr${h > 1 ? "s" : ""} ${m} min${m > 1 ? "s" : ""}`;
      if (h > 0) return `${h} hr${h > 1 ? "s" : ""}`;
      return `${m} min${m > 1 ? "s" : ""}`;
    }
    return trimmed;
  }

  if (typeof value === "number") {
    if (value <= 0 || !Number.isFinite(value)) return "—";
    const totalMinutes = value > 600 && value % 60 === 0 ? Math.round(value / 60) : Math.round(value);
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    if (h > 0 && m > 0) return `${h} hr${h > 1 ? "s" : ""} ${m} min${m > 1 ? "s" : ""}`;
    if (h > 0) return `${h} hr${h > 1 ? "s" : ""}`;
    return `${m} min${m > 1 ? "s" : ""}`;
  }

  return "—";
}

export const formatMovieDuration = formatDurationHoursMinutes;

/**
 * Formats duration for Content items (distinguishing movies vs. series with episode counts).
 */
export function formatContentDuration(
  val?: any,
  type?: string,
  seasons?: any[],
  totalEpisodes?: any
): string {
  const isSeries =
    String(type || "").toUpperCase().includes("SERIES") ||
    (Array.isArray(seasons) && seasons.length > 0) ||
    (typeof totalEpisodes === "number" && totalEpisodes > 0);

  if (isSeries) {
    let epCount = 0;
    if (Array.isArray(seasons) && seasons.length > 0) {
      epCount = seasons.reduce(
        (acc: number, s: any) =>
          acc +
          (Array.isArray(s.episodes)
            ? s.episodes.length
            : typeof s.totalEpisodes === "number"
            ? s.totalEpisodes
            : 0),
        0
      );
    }
    if (epCount === 0 && typeof totalEpisodes === "number" && totalEpisodes > 0) {
      epCount = totalEpisodes;
    }
    if (epCount === 0 && val !== undefined && val !== null) {
      const strVal = String(val).toLowerCase();
      if (strVal.includes("eps") || strVal.includes("ep")) {
        const num = parseInt(strVal.replace(/[^0-9]/g, ""), 10);
        if (!isNaN(num) && num > 0) epCount = num;
      }
    }
    if (epCount > 0) {
      return `${epCount} eps`;
    }
    if (val && String(val).toLowerCase().includes("eps")) {
      return String(val).trim();
    }
  }

  return formatDurationHoursMinutes(val);
}
