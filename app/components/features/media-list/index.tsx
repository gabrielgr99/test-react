import { CardMovie } from "./components/card-movie";
import { Skeleton } from "~/components/ui/skeleton";
import type { MediaListProps } from "./types";

export function MediaList({
	medias,
	loading,
	onRedirect,
	onAddFavorite,
	onRemoveFavorite,
	iconName = 'heart'
}: MediaListProps) {
	const handleAddFavorite = (mediaId: number) => {
		if (onAddFavorite) {
			onAddFavorite(mediaId)
		}
	};

	return (
		<ul className="flex gap-4 flex-wrap justify-center">
			{medias.map(media => (
				<CardMovie
					key={media.id}
					title={media.title}
					posterPath={media.poster_path}
					voteAverage={media.vote_average.toFixed(1)}
					isFavorite={!!media.favorite}
					onAddFavorite={() => handleAddFavorite(media.id)}
					onRemoveFavorite={() => onRemoveFavorite(media.id)}
					onClick={() => onRedirect(media.id)}
					iconName={iconName}
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