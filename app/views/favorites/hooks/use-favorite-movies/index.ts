import { useInfiniteQuery, useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useInfinityScroll } from "~/hooks/use-infinity-scroll";
import { formatResults } from "../../mappers/format-results";
import type { FormatResultsResponse } from "../../mappers/format-results/types";
import type { GetFavoriteMoviesResponse } from "~/api/get-favorite-movies/types";
import { getFavoriteMovies } from "~/api/get-favorite-movies";
import { removeFavoriteMovie } from "~/api";

export function useFavoriteMovies() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

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
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		select: (data) => formatResults(data.pages.flatMap(page => page.results)),
		initialPageParam: 1,
		initialData: { pageParams: [], pages: [] }
	});

	const onSuccessMutate = (movieId: number) => {
		queryClient.setQueryData(
			['get-favorite-movies'],
			(oldData: InfiniteData<GetFavoriteMoviesResponse>): InfiniteData<GetFavoriteMoviesResponse> => ({
				...oldData,
				pages: oldData.pages.map(page => ({
					...page,
					results: page.results.filter(item => item.id !== movieId)
				}))
			})
		)
	}

	const mutation = useMutation({
		mutationFn: removeFavoriteMovie,
		onSuccess: (_, movieId) => onSuccessMutate(movieId)
	});

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