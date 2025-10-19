import { useInfiniteQuery, useMutation, useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
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

	const { data: favoriteMovies = [], isFetching } = useQuery({
		queryKey: ["get-favorite-movies"],
		queryFn: getFavoriteMovies,
		staleTime: Infinity
	});

	const onSuccessMutate = (movieId: number) => {
		queryClient.setQueryData(
			['get-favorite-movies'],
			(oldData: GetFavoriteMoviesResponse[]) => oldData.filter(data => data.id !== movieId)
		)
	}

	const mutation = useMutation({
		mutationFn: removeFavoriteMovie,
		onSuccess: (_, movieId) => onSuccessMutate(movieId)
	});

	const onRemoveFavoriteMovie = (movieId: number) => mutation.mutate(movieId);

	const onRedirectToDetails = (movieId: number) => navigate(`/movie/${movieId}`);

	const onRedirectToHome = () => navigate('/');

	const hasMovies = favoriteMovies.length > 0;

	return {
		movies: favoriteMovies,
		hasMovies,
		isFetching,
		onRedirectToDetails,
		onRedirectToHome,
		onRemoveFavoriteMovie
	}
}