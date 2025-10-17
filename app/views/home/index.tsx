import { useEffect, useState } from "react";
import { getMovies, type TGetMoviesResponse } from "~/api";
import { CardMovieList } from "~/components/features/card-movie-list";
import { PageBody } from "~/components/features/page-body";
import { formatResults } from "~/mappers/format-movies";

const INITIAL_VALUE: TGetMoviesResponse = {
	page: 0,
	results: [],
	total_pages: 0,
	total_results: 0
}

export function HomeView() {
	const [movies, setMovies] = useState<TGetMoviesResponse>(INITIAL_VALUE);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getMovies()
			.then(data => setMovies({
				...data,
				results: formatResults(data.results)
			}))
			.finally(() => setLoading(false))
	}, []);

	return (
		<PageBody>
			<CardMovieList
				movies={movies}
				loading={loading}
			/>
		</PageBody>
	);
}
