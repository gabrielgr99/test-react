import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { GetFavoriteMoviesResponse } from "src/api/get-favorite-movies/types";
import { getFavoriteMovies } from "src/api/get-favorite-movies";
import { GET_FAVORITE_MOVIES_PARAMS_SORT_BY, removeFavoriteMovie } from "src/api";
import { useState } from "react";
import { orderData } from "../../mappers/order-data";

export function useFavoriteMovies() {
	const [orderBy, setOrderBy] = useState(GET_FAVORITE_MOVIES_PARAMS_SORT_BY.TITLE_ASC);

	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data: favoriteMovies = [], isFetching } = useQuery({
		queryKey: ["get-favorite-movies"],
		queryFn: getFavoriteMovies,
		select: (data) => orderData(data, orderBy),
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

	const onOrderBy = (orderBy: GET_FAVORITE_MOVIES_PARAMS_SORT_BY) => setOrderBy(orderBy);

	const hasMovies = favoriteMovies.length > 0;

	return {
		movies: favoriteMovies,
		hasMovies,
		isFetching,
		onRedirectToDetails,
		onRedirectToHome,
		onRemoveFavoriteMovie,
		orderBy,
		onOrderBy
	}
}