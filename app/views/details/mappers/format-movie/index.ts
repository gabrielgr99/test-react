import type { GetMovieByIdResponse } from "~/api";
import { formatDate } from "../formate-date";

export const formatMovie = (movie: GetMovieByIdResponse, favorite: boolean) => ({
	title: movie.title,
	genres: movie.genres,
	overview: movie.overview,
	releaseDate: formatDate(movie.release_date),
	backdropPath: `https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`,
	posterPath: movie.poster_path,
	voteAverage: movie.vote_average,
	favorite
});
