import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useInfinityScroll } from "~/hooks/use-infinity-scroll";
import { formatResults } from "../../mappers/format-results";
import type { FormatResultsResponse } from "../../mappers/format-results/types";
import type { GetFavoriteMoviesResponse } from "~/api/get-favorite-movies/types";
import { getFavoriteMovies } from "~/api/get-favorite-movies";

export function useFavoriteMovies() {
	const navigate = useNavigate();

	const {
		data: movies,
		fetchNextPage,
		hasNextPage,
		isFetching,
		refetch
	} = useInfiniteQuery<
		GetFavoriteMoviesResponse,
		Error,
		FormatResultsResponse[],
		string[],
		number
	>({
		queryKey: ["get-favorite-movies"],
		queryFn: ({ pageParam = 1 }) => getFavoriteMovies({ page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.page + 1,
		select: (data) => formatResults(data.pages.flatMap(page => page.results)),
		initialPageParam: 1,
		initialData: { pageParams: [], pages: [] }
	});

	const mutation = useMutation({ mutationFn: removeFavoriteMovie	});

	const onRemoveFavoriteMovie = (movieId: number) => mutation.mutate(movieId);

	const onRedirect = (movieId: number) => navigate(`/movie/${movieId}`);

	const goToNextPage = () => {
		if (hasNextPage) {
			fetchNextPage()
		}
	}

	useInfinityScroll({ onTrigger: goToNextPage });

	const hasMovies = movies && movies.length > 0;

	return {
		movies,
		hasMovies,
		isFetching,
		refetch,
		onRedirect,
		onRemoveFavoriteMovie
	}
}