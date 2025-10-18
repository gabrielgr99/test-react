enum GET_MOVIES_LANGUAGES {
	EN_US = 'en_US',
	PT_BR = 'pt_BR'
}

type GetPopularMoviesParams = {
	page?: number | null,
	language?: GET_MOVIES_LANGUAGES | null
}

type MovieItem = {
	id: number,
	title: string,
	poster_path: string,
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
	type GetPopularMoviesResponse,
	GET_MOVIES_LANGUAGES
};
