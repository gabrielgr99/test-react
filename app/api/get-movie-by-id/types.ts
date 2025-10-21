type MovieGenre = {
	id: number,
	name: string
}

type GetMovieByIdResponse = {
	poster_path: string | null,
	backdrop_path: string | null,
	title: string,
	genres: MovieGenre[],
	release_date: string,
	vote_average: number,
	overview: string
}

export {
	type GetMovieByIdResponse,
};
