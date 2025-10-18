import type { TGetMovieByIdResponse } from "~/api";

export const formatMovie = (movie: TGetMovieByIdResponse): TGetMovieByIdResponse => ({
	...movie,
	backdrop_path: `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`
});
