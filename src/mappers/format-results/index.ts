import type { GetPopularMoviesResponse } from "src/api";
import type { FormatDataResponse } from "./types";
import { POSTER_PREFIX_URL } from "src/constants/image-prefix-url";

export const formatData = (data: GetPopularMoviesResponse[], favoriteMoviesId: number[]): FormatDataResponse => ({
	totalResults: data[0]?.total_results || 0,
	results: data.length > 0 ? data.flatMap(page => page.results).map(movie => ({
		id: movie.id,
		title: movie.title,
		voteAverage: movie.vote_average,
		favorite: favoriteMoviesId.includes(movie.id),
		posterPath: movie.poster_path ? `${POSTER_PREFIX_URL}${movie.poster_path}` : null
	})) : []
});