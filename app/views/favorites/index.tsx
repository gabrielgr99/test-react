import { MediaList } from "~/components/features/media-list";
import { useFavoriteMovies } from "./hooks/use-favorite-movies";
import { ErrorState } from "~/components/features/error-state";

export function FavoritesView() {
	const {
		hasMovies,
		isFetching,
		movies,
		onRemoveFavoriteMovie,
		onRedirect,
		refetch
	} = useFavoriteMovies();
	
	if (!isFetching && !hasMovies) {
		return <ErrorState onClick={refetch} />
	}

	return (
		<article>
			<h2 className="scroll-m-20 mb-4 text-3xl font-bold tracking-tight first:mt-0">
				Meus Filmes Favoritos
			</h2>

			<MediaList
				loading
				medias={movies}
				onRedirect={onRedirect}
				onRemoveFavorite={onRemoveFavoriteMovie}
				iconName="trash"
			/>
		</article>
	);
}
