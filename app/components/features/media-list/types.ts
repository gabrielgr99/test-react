type Media = {
	id: number,
	title: string,
	poster_path: string,
	vote_average: number,
	favorite: boolean
}

export type MediaListProps = {
	medias: Media[],
	loading: boolean,
	onRedirect: (mediaId: number) => void,
	onFavorite: (mediaId: number) => void
};
