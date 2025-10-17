import type { TGetMoviesResponse } from "~/api";

export type MovieListProps = {
	movies: TGetMoviesResponse,
	loading: boolean
};
