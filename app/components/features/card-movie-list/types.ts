import type { TGetMoviesResponse } from "~/api";

export type CardMovieListProps = {
	movies: TGetMoviesResponse,
	loading: boolean
};
