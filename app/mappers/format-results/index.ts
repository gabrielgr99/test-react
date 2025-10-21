import type { GetPopularMoviesResponse } from "~/api";
import type { FormatDataResponse } from "./types";
import { POSTER_PREFIX_URL } from "~/constants/image-prefix-url";

export const formatData = (data: GetPopularMoviesResponse[], favoriteMoviesId: number[]): FormatDataResponse => ({
	totalResults: data[0]?.total_results || 0,
	results: data.length > 0 ? data.flatMap(page => page.results).map(movie => ({
		id: movie.id,
		title: movie.title,
		voteAverage: movie.vote_average,
		favorite: favoriteMoviesId.includes(movie.id),
		posterPath: `${POSTER_PREFIX_URL}${movie.poster_path}`
	})) : []
});