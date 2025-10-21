import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { redirect, useNavigate, useParams, useSearchParams } from "react-router";
import { addFavoriteMovie, getFavoriteMovies, getMoviesByTitle, removeFavoriteMovie, type AddFavoriteMovieParams, type GetFavoriteMoviesResponse, type GetMoviesByTitleResponse } from "~/api";
import { useInfinityScroll } from "~/hooks/use-infinity-scroll";
import { formatData } from "~/mappers/format-results";
import type { FormatDataResponse } from "~/mappers/format-results/types";

export function useSearchMovies() {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	console.log({params: searchParams.get('query')});

	if (!searchParams.get('query')) redirect('/');

	const query = searchParams.get('query') || '';

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
		data: researchedMovies,
		fetchNextPage,
		hasNextPage,
		isFetching: isPopularMoviesFetching
	} = useInfiniteQuery<
		GetMoviesByTitleResponse,
		Error,
		FormatDataResponse,
		string[],
		number
	>({
		queryKey: ["get-movies-by-title", query],
		queryFn: ({ pageParam = 1 }) => getMoviesByTitle({ page: pageParam, query }),
		getNextPageParam: (lastPage) => lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		select: (data) => formatData(data.pages, favoriteMoviesId),
		initialPageParam: 1,
		initialData: { pageParams: [], pages: [] },
		enabled: isFavoriteMovieIdsSuccess
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

	const onRedirectToDetails = (movieId: number) => navigate(`/movie/${movieId}`);

	const goToNextPage = () => {
		if (hasNextPage) {
			fetchNextPage()
		}
	}
	
	useInfinityScroll({ onTrigger: goToNextPage });

	return {
		query,
		researchedMovies: researchedMovies.results,
		totalResutls: researchedMovies.totalResults,
		hasMovies: researchedMovies.totalResults > 0,
		isFetching: isFavoriteMoviesFetching || isPopularMoviesFetching,
		onRedirectToDetails,
		onRemoveFavoriteMovie,
		onAddFavoriteMovie
	};
}