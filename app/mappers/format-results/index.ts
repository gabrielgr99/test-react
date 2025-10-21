import type { GetPopularMoviesResponse } from "~/api";
import type { FormatDataResponse } from "./types";

export const formatData = (data: GetPopularMoviesResponse[], favoriteMoviesId: number[]): FormatDataResponse => ({
	totalResults: data[0]?.total_results || 0,
	results: data.length > 0 ? data.flatMap(page => page.results).map(movie => ({
		id: movie.id,
		title: movie.title,
		voteAverage: movie.vote_average,
		favorite: favoriteMoviesId.includes(movie.id),
		posterPath: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
	})) : []
});