import { MovieList } from "~/components/features/movie-list";
import { EmptyState } from "./components/empty-state";
import { useMovies } from "./hooks/use-movies";

export function HomeView() {
	const {
		data,
		hasMovies,
		isFetching,
		refetch
	} = useMovies();

	if (!isFetching && !hasMovies) {
		return <EmptyState onClick={refetch} />
	}

	return (
		<MovieList
			movies={data}
			loading={isFetching}
		/>
	);
}
