type CardMovieProps = {
	title: string,
	voteAverage: string,
	posterPath: string,
	onAddFavorite?: () => void,
	onRemoveFavorite: () => void,
	isFavorite: boolean,
	onClick: () => void,
	iconName: 'trash' | 'heart'
}

export type { CardMovieProps }