import { apiClient } from "../client";

const addFavoriteMovie = async (movieId: string): Promise<void> => (
	await apiClient.post(`/account/${import.meta.env.VITE_TMDB_ACCOUNT_ID}/favorite`, {
		media_type: 'movie',
		favorite: true,
		media_id: movieId
	})
).data;

export { addFavoriteMovie };
