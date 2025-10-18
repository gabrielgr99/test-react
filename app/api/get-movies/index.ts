import { apiClient } from "../client";
import { GET_MOVIES_LANGUAGES, type TGetMoviesParams, type TGetMoviesResponse } from "./types";

const getMovies = async (params?: TGetMoviesParams): Promise<TGetMoviesResponse> => (
	await apiClient.get('/movie/popular', {
		params: {
			page: 1,
			language: GET_MOVIES_LANGUAGES.PT_BR,
			...params
		}
	})
).data;

export { getMovies };
