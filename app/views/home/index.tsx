import { MovieList } from "~/components/features/movie-list";
import { ErrorState } from "../../components/features/error-state";
import { useMovies } from "./hooks/use-movies";

export function HomeView() {
	const {
		data,
		hasMovies,
		isFetching,
		refetch
	} = useMovies();

	if (!isFetching && !hasMovies) {
		return <ErrorState onClick={refetch} />
	}

	return (
		<MovieList
			movies={data}
			loading={isFetching}
		/>
	);
}
