type MovieGenre = {
	id: number,
	name: string
}

type GetMovieByIdResponse = {
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
