import type { TGetMovieByIdResponse } from "~/api";
import { formatDate } from "../formate-date";

export const formatMovieResponse = (movie: TGetMovieByIdResponse): TGetMovieByIdResponse => ({
	...movie,
	release_date: formatDate(movie.release_date),
	backdrop_path: `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`
});
