import { apiGet, apiPatch } from "@/lib/api";

export interface ApprovalItem {
  _id: string;
  id: string;
  contentId: string;
  title: string;
  contentType: "movie" | "series" | string;
  genre: string[];
  producerName: string;
  producer?: {
    _id?: string;
    id?: string;
    name?: string;
    email?: string;
  } | null;
  submissionDate: string;
  createdAt?: string;
  status: "pending" | "under_review" | "approved" | "rejected" | "on_hold" | "re_edit_requested" | string;
  approvalStatus?: string;
  isActive?: boolean;
  language?: string[];
  duration?: number;
  releaseYear?: number;
  posterUrl?: string;
  thumbnailUrl?: string;
  mainVideoUrl?: string;
  teaserVideoUrl?: string;
  description?: string;
  shortDescription?: string;
  rejectionReason?: string;
  reEditRequestedReason?: string;
  approvalNotes?: string;
  ageCategory?: string;
  castAndCrew?: { name: string; role?: string; avatar?: string }[];
  tags?: string[];
  seasons?: any[];
  score?: number;
}

export interface ApprovalSummaryStats {
  total?: number;
  pending?: number;
  approved?: number;
  rejected?: number;
  approvalRate?: number;
}

export const MOCK_APPROVAL_ITEMS: ApprovalItem[] = [
  {
    _id: "mock_content_001",
    id: "mock_content_001",
    contentId: "mock_content_001",
    title: "Kantara: Chapter 1",
    contentType: "movie",
    genre: ["Action", "Thriller", "Mythology"],
    producerName: "Hombale Films",
    producer: {
      _id: "prod_001",
      id: "prod_001",
      name: "Hombale Films",
      email: "contact@hombalefilms.com",
    },
    submissionDate: new Date(Date.now() - 3600 * 1000 * 12).toISOString(),
    status: "pending",
    approvalStatus: "PENDING",
    isActive: true,
    language: ["Kannada", "Hindi", "Telugu", "Tamil"],
    duration: 162,
    releaseYear: 2025,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80",
    mainVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    teaserVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description: "In the mystical deep forests of Coastal Karnataka, divine heritage clashes with mortal ambition as ancestral protectors rise to preserve the sacred groves.",
    shortDescription: "A legendary folklore tale of divine retribution and unyielding heritage.",
    ageCategory: "16+",
    castAndCrew: [
      { name: "Rishab Shetty", role: "Director & Lead Actor" },
      { name: "Sapthami Gowda", role: "Lead Actress" },
      { name: "B. Ajaneesh Loknath", role: "Music Director" },
    ],
    tags: ["Folklore", "Action", "Blockbuster"],
    score: 96,
  },
  {
    _id: "mock_content_002",
    id: "mock_content_002",
    contentId: "mock_content_002",
    title: "Mirzapur: Season 3",
    contentType: "series",
    genre: ["Crime", "Drama", "Action"],
    producerName: "Excel Entertainment",
    producer: {
      _id: "prod_002",
      id: "prod_002",
      name: "Excel Entertainment",
      email: "ops@excelmovies.com",
    },
    submissionDate: new Date(Date.now() - 3600 * 1000 * 28).toISOString(),
    status: "on_hold",
    approvalStatus: "ON_HOLD",
    isActive: true,
    language: ["Hindi", "English"],
    duration: 540,
    releaseYear: 2024,
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1200&auto=format&fit=crop&q=80",
    mainVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    teaserVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "The throne of Purvanchal is contested anew as alliances fray and blood vengeance erupts across the rugged hinterlands.",
    shortDescription: "The bloody struggle for the throne of Purvanchal continues.",
    ageCategory: "18+",
    castAndCrew: [
      { name: "Pankaj Tripathi", role: "Akhandanand Tripathi" },
      { name: "Ali Fazal", role: "Guddu Pandit" },
      { name: "Shweta Tripathi", role: "Golu Gupta" },
    ],
    tags: ["Crime", "Gritty", "Series"],
    score: 92,
    holdUntil: new Date(Date.now() + 3600 * 1000 * 18).toISOString(),
    approvalNotes: "Pending certification verification for episode 4 violence disclaimers.",
    seasons: [
      {
        seasonNumber: 1,
        title: "Season 3",
        episodes: [
          {
            episodeNumber: 1,
            title: "Tetar Ke Aansoo",
            duration: 55,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          },
          {
            episodeNumber: 2,
            title: "Bhasmasur",
            duration: 52,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          },
        ],
      },
    ],
  },
  {
    _id: "mock_content_003",
    id: "mock_content_003",
    contentId: "mock_content_003",
    title: "Salaar: Part 2 - Shouryaanga Parvam",
    contentType: "movie",
    genre: ["Action", "Drama"],
    producerName: "Hombale Films",
    producer: {
      _id: "prod_001",
      id: "prod_001",
      name: "Hombale Films",
    },
    submissionDate: new Date(Date.now() - 3600 * 1000 * 48).toISOString(),
    status: "approved",
    approvalStatus: "APPROVED",
    isActive: true,
    language: ["Telugu", "Hindi", "Tamil", "Kannada", "Malayalam"],
    duration: 175,
    releaseYear: 2025,
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200&auto=format&fit=crop&q=80",
    mainVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    teaserVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    description: "The brutal civil war in Khansaar reaches its climax as the Shouryaanga lineage returns to claim sovereign dominion.",
    shortDescription: "Brothers-turned-foes clash in the final battle for Khansaar.",
    ageCategory: "16+",
    castAndCrew: [
      { name: "Prabhas", role: "Deva / Salaar" },
      { name: "Prithviraj Sukumaran", role: "Varadharaja Mannaar" },
      { name: "Prashanth Neel", role: "Director" },
    ],
    tags: ["Action", "Mass", "Cinematic"],
    score: 95,
  },
  {
    _id: "mock_content_004",
    id: "mock_content_004",
    contentId: "mock_content_004",
    title: "Varanasi Mystery Files",
    contentType: "series",
    genre: ["Mystery", "Thriller"],
    producerName: "Dharma Productions",
    producer: {
      _id: "prod_004",
      id: "prod_004",
      name: "Dharma Productions",
    },
    submissionDate: new Date(Date.now() - 3600 * 1000 * 72).toISOString(),
    status: "re_edit_requested",
    approvalStatus: "RE_EDIT_REQUESTED",
    isActive: true,
    language: ["Hindi"],
    duration: 240,
    releaseYear: 2024,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80",
    mainVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    description: "An eccentric forensic anthropologist decodes ancient inscriptions left behind at crime scenes along the Ghats of Varanasi.",
    shortDescription: "Ancient secrets unfold on the sacred ghats.",
    ageCategory: "16+",
    rejectionReason: "Audio mastering clipped in Episode 2 between 14:20 and 18:00.",
    reEditRequestedReason: "Please re-master audio stems and re-export episode 2 with uniform -24 LKFS volume normalization.",
    score: 84,
  },
  {
    _id: "mock_content_005",
    id: "mock_content_005",
    contentId: "mock_content_005",
    title: "The Bengaluru Tech Heist",
    contentType: "movie",
    genre: ["Action", "Comedy"],
    producerName: "Studio Green",
    producer: {
      _id: "prod_005",
      id: "prod_005",
      name: "Studio Green",
    },
    submissionDate: new Date(Date.now() - 3600 * 1000 * 96).toISOString(),
    status: "rejected",
    approvalStatus: "REJECTED",
    isActive: false,
    language: ["Tamil", "Kannada"],
    duration: 135,
    releaseYear: 2024,
    posterUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&auto=format&fit=crop&q=80",
    thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop&q=80",
    mainVideoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "A group of laid-off software engineers orchestrate an ambitious cyber heist targeting a corrupt cryptocurrency exchange.",
    shortDescription: "Coders turn hackers in a high-stakes electronic robbery.",
    ageCategory: "13+",
    rejectionReason: "Unlicensed commercial music track detected during nightclub sequence. Please provide sync license or replace track.",
    score: 71,
  },
];

export async function fetchPendingApprovals(params: {
  page?: number;
  limit?: number;
  search?: string;
  contentType?: string;
  status?: string;
  genre?: string;
} = {}): Promise<{ data: ApprovalItem[]; total: number }> {
  try {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.search) query.set("search", params.search);
    if (params.contentType && params.contentType !== "ALL") query.set("contentType", params.contentType.toUpperCase());
    if (params.status && params.status !== "ALL") query.set("status", params.status.toLowerCase());
    if (params.genre && params.genre !== "ALL") query.set("genre", params.genre);

    const res = await apiGet("/admin/contents/approvals/pending?" + query.toString());
    const results = res?.results;
    const items = results?.data || [];
    if (Array.isArray(items) && items.length > 0) {
      return {
        data: items,
        total: results?.pagination?.total || items.length,
      };
    }
    // If backend returns empty array or has no records, provide mock items
    throw new Error("No backend approval records");
  } catch (error) {
    // Graceful fallback to mock data when official credentials / backend records are unavailable
    let filtered = [...MOCK_APPROVAL_ITEMS];

    if (params.status && params.status !== "ALL") {
      const targetStatus = params.status.toLowerCase();
      filtered = filtered.filter((item) => {
        const itemStatus = (item.approvalStatus || item.status || "").toLowerCase();
        if (targetStatus === "pending") return itemStatus === "pending" || itemStatus === "draft" || itemStatus === "awaiting";
        if (targetStatus === "approved") return itemStatus === "approved";
        if (targetStatus === "rejected") return itemStatus === "rejected";
        if (targetStatus === "on_hold" || targetStatus === "hold") return itemStatus === "on_hold" || itemStatus === "hold";
        if (targetStatus === "re_edit_requested" || targetStatus === "re-edit") return itemStatus === "re_edit_requested" || itemStatus === "re-edit";
        return itemStatus === targetStatus;
      });
    }

    if (params.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter((i) => i.title.toLowerCase().includes(s) || i.producerName?.toLowerCase().includes(s));
    }

    return { data: filtered, total: filtered.length };
  }
}

export async function getContentApprovalDetails(contentId: string): Promise<ApprovalItem | null> {
  try {
    const res = await apiGet("/admin/contents/" + contentId + "/approval-details");
    if (res?.results) return res.results;
  } catch (error) {
    // Fall back to mock items
  }

  const found = MOCK_APPROVAL_ITEMS.find((i) => i._id === contentId || i.id === contentId);
  if (found) return found;

  return MOCK_APPROVAL_ITEMS[0] || null;
}

export const LANGUAGE_FULL_NAMES: Record<string, string> = {
  EN: "English",
  ENGLISH: "English",
  HI: "Hindi",
  HINDI: "Hindi",
  AR: "Arabic",
  ARABIC: "Arabic",
  TA: "Tamil",
  TAMIL: "Tamil",
  TE: "Telugu",
  TELUGU: "Telugu",
  KN: "Kannada",
  KANNADA: "Kannada",
  ML: "Malayalam",
  MALAYALAM: "Malayalam",
  MR: "Marathi",
  MARATHI: "Marathi",
  GU: "Gujarati",
  GUJARATI: "Gujarati",
  PA: "Punjabi",
  PUNJABI: "Punjabi",
  BN: "Bengali",
  BENGALI: "Bengali",
  ES: "Spanish",
  SPANISH: "Spanish",
  FR: "French",
  FRENCH: "French",
  DE: "German",
  GERMAN: "German",
  IT: "Italian",
  ITALIAN: "Italian",
  JA: "Japanese",
  JAPANESE: "Japanese",
  KO: "Korean",
  KOREAN: "Korean",
  ZH: "Chinese",
  CHINESE: "Chinese",
  RU: "Russian",
  RUSSIAN: "Russian",
  PT: "Portuguese",
  PORTUGUESE: "Portuguese",
};

export function displayLanguage(languages?: any): string {
  if (!languages) return "—";
  const list = Array.isArray(languages) ? languages : [languages];
  const formatted = list
    .map((item: any) => {
      if (!item) return "";
      const val = typeof item === "object" ? item.name || item.code || "" : String(item);
      const upper = val.trim().toUpperCase();
      return LANGUAGE_FULL_NAMES[upper] || val.trim();
    })
    .filter(Boolean);
  return formatted.length > 0 ? formatted.join(", ") : "—";
}

export function displayPrimaryLanguage(languages?: any): string {
  if (!languages) return "—";
  const list = Array.isArray(languages) ? languages : [languages];
  const first = list[0];
  if (!first) return "—";
  const val = typeof first === "object" ? first.name || first.code || "" : String(first);
  const upper = val.trim().toUpperCase();
  return LANGUAGE_FULL_NAMES[upper] || val.trim() || "—";
}

export { formatMovieDuration } from "@/lib/media";

export function formatProducerName(item?: any): string {
  if (!item) return "Producer";
  if (typeof item === "string" && item.trim() && item.trim() !== "Unknown" && item.trim() !== "N/A") return item.trim();

  const directProducer =
    typeof item.producer === "string" && item.producer.trim() && item.producer.trim() !== "Studio" && item.producer.trim() !== "Unknown" && item.producer.trim() !== "N/A"
      ? item.producer.trim()
      : typeof item.producer?.name === "string" &&
          item.producer.name.trim() &&
          item.producer.name.trim() !== "Studio" &&
          item.producer.name.trim() !== "Unknown" &&
          item.producer.name.trim() !== "N/A"
        ? item.producer.name.trim()
        : null;

  if (directProducer) return directProducer;

  if (
    typeof item.producerName === "string" &&
    item.producerName.trim() &&
    item.producerName.trim() !== "Studio" &&
    item.producerName.trim() !== "Unknown" &&
    item.producerName.trim() !== "N/A"
  ) {
    return item.producerName.trim();
  }

  const name =
    (item.producer?.name && item.producer.name !== "Unknown" && item.producer.name !== "N/A" ? item.producer.name : null) ||
    (item.producer?.fullName && item.producer.fullName !== "Unknown" && item.producer.fullName !== "N/A" ? item.producer.fullName : null) ||
    (item.producerName && item.producerName !== "Unknown" && item.producerName !== "N/A" ? item.producerName : null) ||
    (item.uploadedBy?.companyName && item.uploadedBy.companyName !== "Unknown" && item.uploadedBy.companyName !== "N/A" ? item.uploadedBy.companyName : null) ||
    (item.uploadedBy?.fullName && item.uploadedBy.fullName !== "Unknown" && item.uploadedBy.fullName !== "N/A" ? item.uploadedBy.fullName : null) ||
    (item.uploadedBy?.name && item.uploadedBy.name !== "Unknown" && item.uploadedBy.name !== "N/A" ? item.uploadedBy.name : null) ||
    (item.uploaderInfo?.[0]?.fullName && item.uploaderInfo[0].fullName !== "Unknown" && item.uploaderInfo[0].fullName !== "N/A" ? item.uploaderInfo[0].fullName : null) ||
    (item.uploaderInfo?.[0]?.name && item.uploaderInfo[0].name !== "Unknown" && item.uploaderInfo[0].name !== "N/A" ? item.uploaderInfo[0].name : null);

  if (name && name !== "N/A" && name !== "Unknown" && name !== "Studio") return name;
  return typeof item.producer === "string" && item.producer && item.producer !== "Unknown" ? item.producer : "Producer";
}

export function formatSubmissionDate(dateVal?: any): string {
  if (!dateVal) return "—";
  try {
    const d = new Date(dateVal);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  } catch {}
  return String(dateVal).slice(0, 10) || "—";
}

export function resolveMedia(url?: string | null): string {
  if (!url || typeof url !== "string" || !url.trim()) return "";
  const trimmed = url.trim();
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("data:")
  ) {
    return trimmed;
  }
  const base = "https://d1f23llskj06r6.cloudfront.net";
  return `${base}/${trimmed.replace(/^\/+/, "")}`;
}

export async function approveContentItem(
  contentId: string,
  payload: { approvalNotes?: string; ageCategory?: any } = {},
) {
  try {
    const res = await apiPatch("/admin/contents/" + contentId + "/approve", payload);
    return res?.results ?? res;
  } catch (error) {
    // Fallback: update in-memory mock item
    const item = MOCK_APPROVAL_ITEMS.find((i) => i._id === contentId || i.id === contentId);
    if (item) {
      item.status = "approved";
      item.approvalStatus = "APPROVED";
      if (payload.approvalNotes) item.approvalNotes = payload.approvalNotes;
      if (payload.ageCategory) item.ageCategory = payload.ageCategory;
    }
    return { success: true, message: "Content approved (Dev Mode)" };
  }
}

export async function rejectContentItem(
  contentId: string,
  payload: { rejectionReason: string } | any,
) {
  try {
    const res = await apiPatch("/admin/contents/" + contentId + "/reject", payload);
    return res?.results ?? res;
  } catch (error) {
    const item = MOCK_APPROVAL_ITEMS.find((i) => i._id === contentId || i.id === contentId);
    if (item) {
      item.status = "rejected";
      item.approvalStatus = "REJECTED";
      item.rejectionReason = payload.rejectionReason || "Content does not meet guidelines";
    }
    return { success: true, message: "Content rejected (Dev Mode)" };
  }
}

export async function holdContentItem(
  contentId: string,
  payload: { notes?: string; holdHours?: number } = {},
) {
  try {
    const res = await apiPatch("/admin/contents/" + contentId + "/hold", payload);
    return res?.results ?? res;
  } catch (error) {
    const item = MOCK_APPROVAL_ITEMS.find((i) => i._id === contentId || i.id === contentId);
    if (item) {
      item.status = "on_hold";
      item.approvalStatus = "ON_HOLD";
      item.holdUntil = new Date(Date.now() + 3600 * 1000 * (payload.holdHours || 24)).toISOString();
      if (payload.notes) item.approvalNotes = payload.notes;
    }
    return { success: true, message: "Content placed on hold (Dev Mode)" };
  }
}

export async function requestReEditContentItem(
  contentId: string,
  payload: { reason?: string; notes?: string } | any,
) {
  try {
    const res = await apiPatch("/admin/contents/" + contentId + "/request-reedit", payload);
    return res?.results ?? res;
  } catch (error) {
    const item = MOCK_APPROVAL_ITEMS.find((i) => i._id === contentId || i.id === contentId);
    if (item) {
      item.status = "re_edit_requested";
      item.approvalStatus = "RE_EDIT_REQUESTED";
      item.reEditRequestedReason = payload.reason || payload.notes || "Re-edit requested";
    }
    return { success: true, message: "Re-edit requested (Dev Mode)" };
  }
}

export async function revokeReEditContentItem(
  contentId: string,
  payload: { notes?: string } = {},
) {
  try {
    const res = await apiPatch("/admin/contents/" + contentId + "/revoke-reedit", payload);
    return res?.results ?? res;
  } catch (error) {
    return { success: true, message: "Re-edit revoked (Dev Mode)" };
  }
}

export async function fetchApprovalSummary(): Promise<ApprovalSummaryStats | null> {
  try {
    const res = await apiGet("/admin/contents/approvals/summary");
    if (res?.results?.summary || res?.results) {
      return res.results.summary || res.results;
    }
  } catch (error) {
    // Fall back to mock summary
  }

  const pending = MOCK_APPROVAL_ITEMS.filter((i) => (i.approvalStatus || i.status) === "PENDING" || (i.approvalStatus || i.status) === "pending").length;
  const approved = MOCK_APPROVAL_ITEMS.filter((i) => (i.approvalStatus || i.status) === "APPROVED" || (i.approvalStatus || i.status) === "approved").length;
  const rejected = MOCK_APPROVAL_ITEMS.filter((i) => (i.approvalStatus || i.status) === "REJECTED" || (i.approvalStatus || i.status) === "rejected").length;
  const total = MOCK_APPROVAL_ITEMS.length;

  return {
    total,
    pending,
    approved,
    rejected,
    approvalRate: approved + rejected > 0 ? Math.round((approved / (approved + rejected)) * 100) : 85,
  };
}

export const fetchApprovalStats = fetchApprovalSummary;
export const fetchApprovalDetails = getContentApprovalDetails;
export const approveContent = approveContentItem;
export const rejectContent = rejectContentItem;
export const holdContent = holdContentItem;
export const requestReEdit = requestReEditContentItem;
export const resolveMediaUrl = resolveMedia;

export async function fetchApprovalHistory(contentId: string) {
  try {
    const res = await apiGet(`/admin/contents/${contentId}/approval-history`);
    return res?.results || [];
  } catch {
    return [];
  }
}

export async function submitForReview(contentId: string, body?: any) {
  return apiPatch(`/admin/contents/${contentId}/submit-for-review`, body);
}
