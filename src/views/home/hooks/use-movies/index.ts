import { useInfiniteQuery, useMutation, useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { addFavoriteMovie } from "src/api/add-favorite-movie";
import { useInfinityScroll } from "src/hooks/use-infinity-scroll";
import { formatData } from "../../../../mappers/format-results";
import { getFavoriteMovies, getPopularMovies, removeFavoriteMovie, type AddFavoriteMovieParams, type GetFavoriteMoviesResponse, type GetPopularMoviesResponse } from "src/api";
import type { FormatDataResponse } from "src/mappers/format-results/types";

export function useMovies() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const {
		data: favoriteMoviesId = [],
		isSuccess: isFavoriteMovieIdsSuccess,
		isFetching: isFavoriteMoviesFetching
	} = useQuery({
		queryKey: ["get-favorite-movies"],
		queryFn: getFavoriteMovies,
		select: (data) => data?.map(item => item.id),
		staleTime: Infinity
	})

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching: isPopularMoviesFetching,
		refetch,
	} = useInfiniteQuery<
		GetPopularMoviesResponse,
		Error,
		FormatDataResponse,
		string[],
		number
	>({
		queryKey: ["get-popular-movies"],
		queryFn: ({ pageParam = 1 }) => getPopularMovies({ page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		select: (data) => formatData(data.pages, favoriteMoviesId),
		initialPageParam: 1,
		enabled: isFavoriteMovieIdsSuccess,
		placeholderData: (prev) => prev || { pageParams: [], pages: [] },
		refetchOnMount: false
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
		if (hasNextPage && !isPopularMoviesFetching) {
			fetchNextPage()
		}
	}

	useInfinityScroll({ onTrigger: goToNextPage });

	return {
		data: data!.results,
		hasMovies: data!.totalResults,
		isFetching: isFavoriteMoviesFetching || isPopularMoviesFetching,
		refetch,
		onRedirect,
		onAddFavoriteMovie,
		onRemoveFavoriteMovie
	}
}