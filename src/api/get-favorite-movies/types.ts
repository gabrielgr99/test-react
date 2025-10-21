enum GET_FAVORITE_MOVIES_PARAMS_SORT_BY {
	TITLE_ASC = 'title.asc',
	TITLE_DESC = 'title.desc',
	VOTE_AVERAGE_ASC = 'vote_average.asc',
	VOTE_AVERAGE_DESC = 'vote_average.desc'
}

const labelsSortBy = {
	[GET_FAVORITE_MOVIES_PARAMS_SORT_BY.TITLE_ASC]: 'Título (A-Z)',
	[GET_FAVORITE_MOVIES_PARAMS_SORT_BY.TITLE_DESC]: 'Título (Z-A)',
	[GET_FAVORITE_MOVIES_PARAMS_SORT_BY.VOTE_AVERAGE_ASC]: 'Média de votos (crescente)',
	[GET_FAVORITE_MOVIES_PARAMS_SORT_BY.VOTE_AVERAGE_DESC]: 'Média de votos (decrescente)'
};

type GetFavoriteMoviesResponse = {
	id: number,
	title: string,
	posterPath: string | null,
	voteAverage: number
}

export {
	type GetFavoriteMoviesResponse,
	GET_FAVORITE_MOVIES_PARAMS_SORT_BY,
	labelsSortBy
};
