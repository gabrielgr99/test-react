type MediaItem = {
	id: number,
	title: string,
	poster_path: string,
	vote_average: number,
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
