import axios from "axios";

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_TMDB_BASE_URL,
	headers: {
		Accept: 'application/json',
		Authorization: `Bearer ${import.meta.env.VITE_TMDB_BASE_URL}`
	}
});

export { apiClient };
