import type { GetMovieByIdResponse } from "~/api";
import { formatDate } from "../formate-date";

export const formatMovie = (movie: GetMovieByIdResponse, favorite: boolean) => ({
	...movie,
	release_date: formatDate(movie.release_date),
	backdrop_path: `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`,
	favorite
});
