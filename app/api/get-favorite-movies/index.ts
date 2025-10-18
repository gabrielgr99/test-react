import { GET_MOVIES_LANGUAGES } from "~/constants/languages";
import { apiClient } from "../client";
import {
	GET_FAVORITE_MOVIES_PARAMS_SORT_BY,
	type GetFavoriteMoviesParams,
	type GetFavoriteMoviesResponse
} from "./types";

const getFavoriteMovies = async (params?: GetFavoriteMoviesParams): Promise<GetFavoriteMoviesResponse> => (
	await apiClient.get(`/account/${import.meta.env.VITE_TMDB_ACCOUNT_ID}/favorite/movies`, {
		params: {
			page: 1,
			language: GET_MOVIES_LANGUAGES.PT_BR,
			sort_by: GET_FAVORITE_MOVIES_PARAMS_SORT_BY.TITLE_ASC,
			...params
		}
	})
).data;

export { getFavoriteMovies };
