type CardMovieProps = {
	title: string,
	voteAverage: string,
	posterPath: string | null,
	onAddFavorite?: () => void,
	onRemoveFavorite: () => void,
	isFavorite: boolean,
	onClick: () => void,
	iconName: 'trash' | 'heart',
	term?: string
}

export type { CardMovieProps }