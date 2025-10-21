import type { GET_MOVIES_LANGUAGES } from "~/constants/languages"

type GetPopularMoviesParams = {
	page?: number | null,
	language?: GET_MOVIES_LANGUAGES | null
}

type MovieItem = {
	id: number,
	title: string,
	poster_path: string | null,
	vote_average: number
}

type GetPopularMoviesResponse = {
	page: number,
	total_pages: number,
	total_results: number,
	results: MovieItem[]
}

export {
	type GetPopularMoviesParams,
	type GetPopularMoviesResponse
};
