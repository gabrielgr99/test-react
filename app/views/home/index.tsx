import { MovieList } from "~/components/features/movie-list";
import { PageBody } from "~/components/features/page-body/page-body";
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
		return (
			<PageBody>
				<EmptyState onClick={refetch} />
			</PageBody>
		);
	}

	return (
		<PageBody>
			<MovieList
				movies={data}
				loading={isFetching}
			/>
		</PageBody>
	);
}
