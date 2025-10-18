import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { addFavoriteMovie, getMovieById } from "~/api";
import { formatMovie } from "../../mappers/format-movie";

export function useMovieDetails() {
	const { movieId } = useParams();

	const { data: movie, isFetching, refetch } = useQuery({
		queryKey: ['get-movie-by-id', movieId],
		queryFn: () => getMovieById(movieId ?? ''),
		select: (data) => formatMovie(data),
		enabled: !!movieId
	})

	const mutation = useMutation({ mutationFn: addFavoriteMovie	});

	const onFavoriteMovie = () => mutation.mutate(Number(movieId));

	return {
		movie,
		isFetching,
		refetch,
		onFavoriteMovie,
		hasMovie: !isFetching && !movie
	}
}