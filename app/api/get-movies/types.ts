enum GET_MOVIES_SORT_BY {
	POPULARITY_DESC = 'popularity.desc',
	POPULARITY_ASC = 'popularity.asc'
}

type TGetMoviesParams = {
	page?: number | null,
	sort_by?: GET_MOVIES_SORT_BY | null
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
	GET_MOVIES_SORT_BY
};
