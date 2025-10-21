let dbInstance: IDBDatabase | null = null;

const indexedDbClient = () => {
	if (dbInstance) return Promise.resolve(dbInstance);

	return new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open('Movies', 1);

		request.onupgradeneeded = () => {
			const db = request.result;
			db.createObjectStore('favorites', { keyPath: 'id' });
		};

		request.onsuccess = () => {
			dbInstance = request.result;
			resolve(dbInstance);
		};

		request.onerror = () => {
			reject(request.error);
		};
	});
};

const safeTransaction = async (mode: IDBTransactionMode) => {
	try {
		const db = await indexedDbClient();
		const tx = db.transaction('favorites', mode);
		const store = tx.objectStore('favorites');

		return store;
	} catch {
		dbInstance = null;
		return null;
	}
};

export { indexedDbClient, safeTransaction };