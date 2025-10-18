type MediaItem = {
	id: number,
	title: string,
	poster_path: string,
	vote_average: number,
	favorite?: boolean
}

export type MediaListProps = {
	medias: MediaItem[],
	loading: boolean,
	onRedirect: (mediaId: number) => void,
	onAddFavorite?: (mediaId: number) => void,
	onRemoveFavorite: (mediaId: number) => void,
	iconName?: 'trash' | 'heart'
};
