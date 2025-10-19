import { useInfiniteQuery, useMutation, useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { addFavoriteMovie } from "~/api/add-favorite-movie";
import { useInfinityScroll } from "~/hooks/use-infinity-scroll";
import { formatResults } from "../../mappers/format-results";
import { getFavoriteMovies, getPopularMovies, removeFavoriteMovie, type AddFavoriteMovieParams, type GetFavoriteMoviesResponse, type GetPopularMoviesResponse } from "~/api";
import type { FormatResultsResponse } from "~/views/favorites/mappers/format-results/types";

export function useMovies() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data: favoriteMoviesId } = useQuery({
		queryKey: ["get-favorite-movies"],
		queryFn: getFavoriteMovies,
		select: (data) => data?.map(item => item.id),
		initialData: []
	})

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
		select: (data) => formatResults(data.pages.flatMap(page => page.results), favoriteMoviesId),
		initialPageParam: 1,
		initialData: { pageParams: [], pages: [] },
		enabled: favoriteMoviesId.length > 0
	});

	const onSuccessMutateAddFavoriteMovie = (movie: AddFavoriteMovieParams) => {
		queryClient.setQueryData(
			['get-favorite-movies'],
			(oldData: GetFavoriteMoviesResponse[]) => ([ ...oldData, movie ])
		)
	}

	const onSuccessMutateRemoveFavoriteMovie = (movieId: number) => {
		queryClient.setQueryData(
			['get-favorite-movies'],
			(oldData: GetFavoriteMoviesResponse[]) => oldData.filter(data => data.id !== movieId)
		)
	}

	const mutationAddFavoriteMovie = useMutation({
		mutationFn: addFavoriteMovie,
		onSuccess: (_, movie) => onSuccessMutateAddFavoriteMovie(movie)
	});

	const mutationRemoveFavoriteMovie = useMutation({
		mutationFn: removeFavoriteMovie,
		onSuccess: (_, movieId) => onSuccessMutateRemoveFavoriteMovie(movieId)
	});

	const onAddFavoriteMovie = (movie: AddFavoriteMovieParams) => mutationAddFavoriteMovie.mutate(movie);

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