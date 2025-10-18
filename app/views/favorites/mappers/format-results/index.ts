import type { GetPopularMoviesResponse } from "~/api";
import type { FormatResultsResponse } from "./types";

export const formatResults = (movies: GetPopularMoviesResponse['results']): FormatResultsResponse[] => (
	movies.map(movie => ({
		id: movie.id,
		title: movie.title,
		vote_average: movie.vote_average,
		poster_path: `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
	}))
);