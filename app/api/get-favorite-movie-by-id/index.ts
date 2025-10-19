import { safeTransaction } from "../clients/indexed-db-client";
import type { GetFavoriteMovieByIdResponse } from "./types";

const getFavoriteMovieById = async (movieId: number) => {
	const store = await safeTransaction('readwrite');

	if (store) {
		return new Promise<GetFavoriteMovieByIdResponse>((resolve, reject) => {
			const request = store.get(movieId);
			request.onsuccess = () => resolve(request.result || null);
			request.onerror = () => reject(request.error);
		});
	}
};

export { getFavoriteMovieById };
