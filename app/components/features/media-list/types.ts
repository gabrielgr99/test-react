type MediaItem = {
	id: number,
	title: string,
	posterPath: string,
	voteAverage: number,
	favorite?: boolean
}

type MediaListProps = {
	medias: MediaItem[],
	loading: boolean,
	onRedirect: (mediaId: number) => void,
	onAddFavorite?: (media: MediaItem) => void,
	onRemoveFavorite: (mediaId: number) => void,
	iconName?: 'trash' | 'heart'
};

export type { MediaItem, MediaListProps };
