import { safeTransaction } from "../indexed-db-client";

const removeFavoriteMovie = async (movieId: number) => {
	const store = await safeTransaction('readwrite');

	if (store) {
		return new Promise((resolve, reject) => {
			const request = store.delete(movieId);
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => reject(request.error);
		});
	}
};

export { removeFavoriteMovie };
