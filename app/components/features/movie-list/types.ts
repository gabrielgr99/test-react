import type { TGetMoviesResponse } from "~/api";

export type MovieListProps = {
	movies: TGetMoviesResponse['results'],
	loading: boolean
};
