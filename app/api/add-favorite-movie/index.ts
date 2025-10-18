import { safeTransaction } from "../indexed-db-client";
import type { AddFavoriteMovieParams } from "./types";

const addFavoriteMovie = async (movie: AddFavoriteMovieParams) => {
	const store = await safeTransaction('readwrite');

	if (store) {
		return new Promise((resolve, reject) => {
			const request = store.put(movie);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}
};

export { addFavoriteMovie };