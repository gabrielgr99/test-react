import { MediaList } from "~/components/features/media-list";
import { useFavoriteMovies } from "./hooks/use-favorite-movies";
import { EmptyState } from "./components/empty-state";

export function FavoritesView() {
	const {
		hasMovies,
		isFetching,
		movies,
		onRemoveFavoriteMovie,
		onRedirectToDetails,
		onRedirectToHome
	} = useFavoriteMovies();
	
	if (!isFetching && !hasMovies) {
		return <EmptyState onClick={onRedirectToHome} />
	}

	return (
		<article>
			<h2 className="scroll-m-20 mb-4 text-3xl font-bold tracking-tight first:mt-0">
				Meus Filmes Favoritos
			</h2>

			<MediaList
				loading={isFetching}
				medias={movies}
				onRedirect={onRedirectToDetails}
				onRemoveFavorite={onRemoveFavoriteMovie}
				iconName="trash"
			/>
		</article>
	);
}
