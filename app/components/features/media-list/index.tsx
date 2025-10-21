import { CardMovie } from "./components/card-movie";
import { Skeleton } from "~/components/ui/skeleton";
import type { MediaItem, MediaListProps } from "./types";

export function MediaList({
	medias,
	loading,
	onRedirect,
	onAddFavorite,
	onRemoveFavorite,
	iconName = 'heart',
	term
}: MediaListProps) {
	const handleAddFavorite = (mediaId: MediaItem) => {
		if (onAddFavorite) {
			onAddFavorite(mediaId)
		}
	};

	return (
		<ul className="flex gap-4 flex-wrap">
			{medias.map(({ favorite, ...media }, index) => (
				<CardMovie
					key={media.id + index}
					title={media.title}
					posterPath={media.posterPath}
					voteAverage={media.voteAverage.toFixed(1)}
					isFavorite={!!favorite}
					onAddFavorite={() => handleAddFavorite(media)}
					onRemoveFavorite={() => onRemoveFavorite(media.id)}
					onClick={() => onRedirect(media.id)}
					iconName={iconName}
					term={term}
				/>
			))}
			{loading && Array(20).fill('').map((_, index) => (
				<li key={index}>
					<Skeleton className="w-[200px] h-[368px]" />
				</li>
			))}
		</ul>
	);
}