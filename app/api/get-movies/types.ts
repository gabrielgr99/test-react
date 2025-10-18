enum GET_MOVIES_LANGUAGES {
	EN_US = 'en_US',
	PT_BR = 'pt_BR'
}

type TGetMoviesParams = {
	page?: number | null,
	language?: GET_MOVIES_LANGUAGES | null
}

type MovieItem = {
	id: number,
	title: string,
	poster_path: string,
	vote_average: number
}

type TGetMoviesResponse = {
	page: number,
	total_pages: number,
	total_results: number,
	results: MovieItem[]
}

export {
	type TGetMoviesParams,
	type TGetMoviesResponse,
	GET_MOVIES_LANGUAGES
};
