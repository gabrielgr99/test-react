import axios from "axios";

const apiClient = axios.create({
	baseURL: process.env.TMDB_BASE_URL,
	headers: {
		Accept: 'application/json',
		"Content-Type": 'application/json',
		Authorization: `Bearer ${process.env.TMDB_API_KEY}`
	}
});

export { apiClient };
