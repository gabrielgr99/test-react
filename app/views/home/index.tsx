import { MediaList } from "~/components/features/media-list";
import { ErrorState } from "../../components/features/error-state";
import { useMovies } from "./hooks/use-movies";

export function HomeView() {
	const {
		data,
		hasMovies,
		isFetching,
		refetch,
		onRedirect,
		onFavoriteMovie
	} = useMovies();

	if (!isFetching && !hasMovies) {
		return <ErrorState onClick={refetch} />
	}

	return (
		<MediaList
			medias={data}
			loading={isFetching}
			onRedirect={onRedirect}
			onFavorite={onFavoriteMovie}
		/>
	);
}
