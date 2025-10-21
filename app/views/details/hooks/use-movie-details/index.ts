import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { addFavoriteMovie, getMovieById, removeFavoriteMovie, type AddFavoriteMovieParams, type GetFavoriteMoviesResponse } from "~/api";
import { formatMovie } from "../../mappers/format-movie";
import { getFavoriteMovieById } from "~/api/get-favorite-movie-by-id";

export function useMovieDetails() {
	const { movieId } = useParams();
	const queryClient = useQueryClient();

	const { data: favoriteMovie, isFetching: isFavoriteMovieFetching } = useQuery({
		queryKey: ['get-favorite-movie-by-id', movieId],
		queryFn: () => getFavoriteMovieById(Number(movieId ?? '')),
		enabled: !!movieId
	});

	const { data: movie, isFetching: isMovieFetching, refetch } = useQuery({
		queryKey: ['get-movie-by-id', movieId],
		queryFn: () => getMovieById(movieId ?? ''),
		select: (data) => formatMovie(data, !!favoriteMovie),
		enabled: !!movieId && !isFavoriteMovieFetching
	});

	const onSuccessAddFavoriteMovieMutate = (addedMovie: AddFavoriteMovieParams) => {
		const queryGetFavoriteMovies = queryClient.getQueryState(['get-favorite-movies']);

		if (queryGetFavoriteMovies) {
			queryClient.setQueryData(
				['get-favorite-movies'],
				(oldData: GetFavoriteMoviesResponse[]) => ([ ...oldData, addedMovie ])
			);
		}

		queryClient.setQueryData(
			['get-favorite-movie-by-id', movieId],
			() => addedMovie
		);
	};

	const addFavoriteMovieMutation = useMutation({
		mutationFn: addFavoriteMovie,
		onSuccess: (_, movie) => onSuccessAddFavoriteMovieMutate(movie)
	});

	const onAddFavoriteMovie = () => {
		if (movie && movieId) {
			addFavoriteMovieMutation.mutate({
				id: Number(movieId),
				posterPath: movie.posterPath,
				title: movie.title,
				voteAverage: movie.voteAverage
			});
		}
	};

	const onSuccessRemoveFavoriteMovieMutate = (removedMovieId: number) => {
		const queryGetFavoriteMovies = queryClient.getQueryState(['get-favorite-movies']);

		if (queryGetFavoriteMovies) {
			queryClient.setQueryData(
				['get-favorite-movies'],
				(oldData: GetFavoriteMoviesResponse[]) => oldData.filter(data => data.id !== removedMovieId)
			);
		}

		queryClient.setQueryData(
			['get-favorite-movie-by-id', movieId],
			() => null
		);
	};

	const removeFavoriteMovieMutation = useMutation({
		mutationFn: removeFavoriteMovie,
		onSuccess: (_, movieId) => onSuccessRemoveFavoriteMovieMutate(movieId)
	});

	const onRemoveFavoriteMovie = () => {
		if (movieId) {
			removeFavoriteMovieMutation.mutate(Number(movieId));
		}
	};

	return {
		movie,
		isFetching: isMovieFetching || isFavoriteMovieFetching,
		refetch,
		onAddFavoriteMovie,
		onRemoveFavoriteMovie,
		hasMovie: !isMovieFetching && !movie
	}
}