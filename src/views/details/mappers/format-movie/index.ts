import type { GetMovieByIdResponse } from "src/api";
import { formatDate } from "../formate-date";
import { BACKDROP_PREFIX_URL, POSTER_PREFIX_URL } from "src/constants/image-prefix-url";

export const formatMovie = (movie: GetMovieByIdResponse, favorite: boolean) => ({
	title: movie.title,
	genres: movie.genres,
	overview: movie.overview,
	releaseDate: formatDate(movie.release_date),
	backdropPath: movie.backdrop_path ? `${BACKDROP_PREFIX_URL}${movie.backdrop_path}` : null,
	posterPath: movie.poster_path ? `${POSTER_PREFIX_URL}${movie.poster_path}` : null,
	voteAverage: movie.vote_average,
	favorite
});
