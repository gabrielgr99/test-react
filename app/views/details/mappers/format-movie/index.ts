import type { GetMovieByIdResponse } from "~/api";
import { formatDate } from "../formate-date";
import { BACKDROP_PREFIX_URL, POSTER_PREFIX_URL } from "~/constants/image-prefix-url";

export const formatMovie = (movie: GetMovieByIdResponse, favorite: boolean) => ({
	title: movie.title,
	genres: movie.genres,
	overview: movie.overview,
	releaseDate: formatDate(movie.release_date),
	backdropPath: `${BACKDROP_PREFIX_URL}${movie.backdrop_path}`,
	posterPath: `${POSTER_PREFIX_URL}${movie.poster_path}`,
	voteAverage: movie.vote_average,
	favorite
});
