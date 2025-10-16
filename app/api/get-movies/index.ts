import { apiClient } from "../client";
import { GET_MOVIES_SORT_BY, type TGetMoviesParams, type TGetMoviesResponse } from "./types";

const getMovies = async (params?: TGetMoviesParams): Promise<TGetMoviesResponse> => (
	await apiClient.get('/discover/movie', {
		params: {
			page: 1,
			sort_by: GET_MOVIES_SORT_BY.POPULARITY_DESC,
			...params
		}
	})
).data;

export { getMovies };
