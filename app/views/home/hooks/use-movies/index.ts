import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getPopularMovies, type GetPopularMoviesResponse } from "~/api";
import { addFavoriteMovie } from "~/api/add-favorite-movie";
import { useInfinityScroll } from "~/hooks/use-infinity-scroll";
import { formatResults } from "~/views/home/mappers/format-results";
import type { FormatResultsResponse } from "../../mappers/format-results/types";

export function useMovies() {
	const navigate = useNavigate();

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		refetch
	} = useInfiniteQuery<
		GetPopularMoviesResponse,
		Error,
		FormatResultsResponse[],
		string[],
		number
	>({
		queryKey: ["get-popular-movies"],
		queryFn: ({ pageParam = 1 }) => getPopularMovies({ page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.page + 1,
		select: (data) => formatResults(data.pages.flatMap(page => page.results), []),
		initialPageParam: 1,
		initialData: { pageParams: [], pages: [] }
	});

	const mutation = useMutation({ mutationFn: addFavoriteMovie	});

	const onFavoriteMovie = (movieId: number) => mutation.mutate(movieId);

	const onRedirect = (movieId: number) => navigate(`/movie/${movieId}`);

	const goToNextPage = () => {
		if (hasNextPage) {
			fetchNextPage()
		}
	}

	useInfinityScroll({ onTrigger: goToNextPage });

	const hasMovies = data && data.length > 0;

	return {
		data,
		hasMovies,
		isFetching,
		refetch,
		onRedirect,
		onFavoriteMovie
	}
}