import { apiClient } from "../client";
import { GET_MOVIES_LANGUAGES, type GetPopularMoviesParams, type GetPopularMoviesResponse } from "./types";

const getPopularMovies = async (params?: GetPopularMoviesParams): Promise<GetPopularMoviesResponse> => (
	await apiClient.get('/movie/popular', {
		params: {
			page: 1,
			language: GET_MOVIES_LANGUAGES.PT_BR,
			...params
		}
	})
).data;

export { getPopularMovies };
