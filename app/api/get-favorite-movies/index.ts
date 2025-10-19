import { safeTransaction } from "../clients/indexed-db-client";
import type { GetFavoriteMoviesResponse } from "./types";

const getFavoriteMovies = async () => {
	const store = await safeTransaction('readwrite');

	if (store) {
		return new Promise<GetFavoriteMoviesResponse[]>((resolve, reject) => {
			const request = store.getAll();
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}

	return [];
};

export { getFavoriteMovies };
