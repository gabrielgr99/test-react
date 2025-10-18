enum GET_FAVORITE_MOVIES_PARAMS_SORT_BY {
	TITLE_ASC = 'title.asc',
	TITLE_DESC = 'title.desc'
}

type GetFavoriteMoviesParams = {
	page?: number | null,
	sort_by?: GET_FAVORITE_MOVIES_PARAMS_SORT_BY | null
}

type MovieItem = {
	id: number,
	title: string,
	poster_path: string,
	vote_average: number
}

type GetFavoriteMoviesResponse = {
	page: number,
	total_pages: number,
	total_results: number,
	results: MovieItem[]
}

export {
	type GetFavoriteMoviesParams,
	type GetFavoriteMoviesResponse,
	GET_FAVORITE_MOVIES_PARAMS_SORT_BY
};
