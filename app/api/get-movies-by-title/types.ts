import type { GET_MOVIES_LANGUAGES } from "~/constants/languages"

type GetMoviesByTitleParams = {
	page?: number | null,
	language?: GET_MOVIES_LANGUAGES | null,
	query: string
}

type MovieItem = {
	id: number,
	title: string,
	poster_path: string,
	vote_average: number
}

type GetMoviesByTitleResponse = {
	page: number,
	total_pages: number,
	total_results: number,
	results: MovieItem[]
}

export {
	type GetMoviesByTitleParams,
	type GetMoviesByTitleResponse
};
