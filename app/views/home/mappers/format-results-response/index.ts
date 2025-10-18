import type { TGetMoviesResponse } from "~/api";

export const formatResultsResponse = (movies: TGetMoviesResponse['results']): TGetMoviesResponse['results'] => (
	movies.map(movie => ({ ...movie, poster_path: `https://image.tmdb.org/t/p/w300/${movie.poster_path}` }))
);