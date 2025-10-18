import { apiClient } from "../api-client";

const removeFavoriteMovie = async (movieId: number): Promise<void> => (
	await apiClient.post(`/account/${import.meta.env.VITE_TMDB_ACCOUNT_ID}/favorite`, {
		media_type: 'movie',
		favorite: false,
		media_id: movieId
	})
).data;

export { removeFavoriteMovie };
