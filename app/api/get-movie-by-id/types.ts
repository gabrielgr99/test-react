type MovieGenre = {
	id: number,
	name: string
}

type GetMovieByIdResponse = {
	poster_path: string,
	backdrop_path: string,
	title: string,
	genres: MovieGenre[],
	release_date: string,
	vote_average: number,
	overview: string
}

export {
	type GetMovieByIdResponse,
};
