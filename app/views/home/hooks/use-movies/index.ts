import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { addFavoriteMovie } from "~/api/add-favorite-movie";
import { useInfinityScroll } from "~/hooks/use-infinity-scroll";
import { formatResults } from "../../mappers/format-results";
import { getPopularMovies, removeFavoriteMovie, type GetPopularMoviesResponse } from "~/api";
import type { FormatResultsResponse } from "~/views/favorites/mappers/format-results/types";

export function useMovies() {
	const navigate = useNavigate();

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		refetch,
	} = useInfiniteQuery<
		GetPopularMoviesResponse,
		Error,
		FormatResultsResponse[],
		string[],
		number
	>({
		queryKey: ["get-popular-movies"],
		queryFn: ({ pageParam = 1 }) => getPopularMovies({ page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		select: (data) => formatResults(data.pages.flatMap(page => page.results), []),
		initialPageParam: 1,
		initialData: { pageParams: [], pages: [] }
	});

	const mutationAddFavoriteMovie = useMutation({ mutationFn: addFavoriteMovie	});

	const mutationRemoveFavoriteMovie = useMutation({ mutationFn: removeFavoriteMovie });

	const onAddFavoriteMovie = (movieId: number) => mutationAddFavoriteMovie.mutate(movieId);

	const onRemoveFavoriteMovie = (movieId: number) => mutationRemoveFavoriteMovie.mutate(movieId);

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
		onAddFavoriteMovie,
		onRemoveFavoriteMovie
	}
}