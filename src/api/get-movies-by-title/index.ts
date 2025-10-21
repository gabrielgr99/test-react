import { GET_MOVIES_LANGUAGES } from "src/constants/languages";
import { apiClient } from "../clients/api-client";
import { type GetMoviesByTitleParams, type GetMoviesByTitleResponse } from "./types";

const getMoviesByTitle = async (params?: GetMoviesByTitleParams): Promise<GetMoviesByTitleResponse> => (
	await apiClient.get('/search/movie', {
		params: {
			page: 1,
			language: GET_MOVIES_LANGUAGES.PT_BR,
			...params
		}
	})
).data;

export { getMoviesByTitle };
