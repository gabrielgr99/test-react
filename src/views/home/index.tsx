import { MediaList } from "src/components/features/media-list";
import { useMovies } from "./hooks/use-movies";
import { EmptyState } from "src/components/features/empty-state";

export function HomeView() {
	const {
		data,
		hasMovies,
		isFetching,
		refetch,
		onRedirect,
		onAddFavoriteMovie,
		onRemoveFavoriteMovie
	} = useMovies();

	if (!isFetching && !hasMovies) {
		return <EmptyState
			title="Sem filmes por aqui"
			description="Ops, acho que tivemos um erro, por favor, tente novamente..."
			actionLabel="Tentar novamente"
			onClick={refetch}
		/>
	}

	return (
		<MediaList
			medias={data}
			loading={isFetching}
			onRedirect={onRedirect}
			onAddFavorite={onAddFavoriteMovie}
			onRemoveFavorite={onRemoveFavoriteMovie}
		/>
	);
}
