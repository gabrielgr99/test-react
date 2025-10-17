import type { TGetMoviesResponse } from "~/api";

export const formatResults = (movies: TGetMoviesResponse['results']) => (
	movies.map(movie => ({ ...movie, poster_path: `https://image.tmdb.org/t/p/w300/${movie.poster_path}` }))
);