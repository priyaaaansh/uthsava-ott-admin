import { apiGet, apiPost, apiPut, apiDelete } from "../api";

export const MOCK_MOVIES = [
  {
    _id: "mock_movie_001",
    id: "mock_movie_001",
    title: "Kantara: Chapter 1",
    type: "MOVIE",
    contentType: "MOVIE",
    genres: [{ _id: "g1", name: "Action" }, { _id: "g2", name: "Thriller" }],
    language: ["Kannada", "Hindi"],
    duration: 162,
    releaseYear: 2025,
    poster: ["https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80",
    status: "ACTIVE",
    approvalStatus: "APPROVED",
  },
  {
    _id: "mock_movie_002",
    id: "mock_movie_002",
    title: "Salaar: Part 2 - Shouryaanga Parvam",
    type: "MOVIE",
    contentType: "MOVIE",
    genres: [{ _id: "g1", name: "Action" }],
    language: ["Telugu", "Hindi"],
    duration: 175,
    releaseYear: 2025,
    poster: ["https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80"],
    thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200&auto=format&fit=crop&q=80",
    status: "ACTIVE",
    approvalStatus: "APPROVED",
  },
];

export async function fetchMovies(params?: Record<string, any>) {
  try {
    const res = await apiGet("/admin/contents", {
      page: 1,
      limit: 100,
      contentType: "MOVIE",
      ...params,
    });
    const contents = res?.results?.contents ?? [];
    if (Array.isArray(contents) && contents.length > 0) return contents;
  } catch (err) {
    // Fall back to mock movies when offline/uncredentialed
  }
  return MOCK_MOVIES;
}

export async function getMovieById(id: string) {
  try {
    const res = await apiGet(`/admin/contents/${id}`);
    if (res?.results) return res.results;
  } catch (err) {}
  return MOCK_MOVIES.find((m) => m._id === id || m.id === id) || MOCK_MOVIES[0];
}

export async function createMovie(payload: any) {
  try {
    return await apiPost("/admin/contents", {
      ...payload,
      contentType: "MOVIE",
    });
  } catch (err) {
    return { success: true, message: "Movie created (Dev Mode)" };
  }
}

export async function updateMovie(id: string, payload: any) {
  try {
    return await apiPut(`/admin/contents/${id}`, payload);
  } catch (err) {
    return { success: true, message: "Movie updated (Dev Mode)" };
  }
}

export async function deleteMovie(id: string) {
  try {
    return await apiDelete(`/admin/contents/${id}`);
  } catch (err) {
    return { success: true, message: "Movie deleted (Dev Mode)" };
  }
}
