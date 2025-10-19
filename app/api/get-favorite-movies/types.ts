enum GET_FAVORITE_MOVIES_PARAMS_SORT_BY {
	TITLE_ASC = 'title.asc',
	TITLE_DESC = 'title.desc'
}

type GetFavoriteMoviesResponse = {
	id: number,
	title: string,
	poster_path: string,
	vote_average: number
}

export {
	type GetFavoriteMoviesResponse,
	GET_FAVORITE_MOVIES_PARAMS_SORT_BY
};
