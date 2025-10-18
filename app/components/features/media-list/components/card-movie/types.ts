type CardMovieProps = {
	title: string,
	voteAverage: string,
	posterPath: string,
	onFavorite: () => void,
	isFavorite: boolean,
	onClick: () => void
}

export type { CardMovieProps }