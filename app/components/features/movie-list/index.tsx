import { CardMovie } from "./components/card-movie";
import { Skeleton } from "~/components/ui/skeleton";
import type { MovieListProps } from "./types";
import { useNavigate } from "react-router";

export function MovieList({ movies, loading }: MovieListProps) {
	const navigate = useNavigate();

	return (
		<ul className="flex gap-4 flex-wrap justify-center">
			{movies.map(movie => (
				<CardMovie
					key={movie.id}
					title={movie.title}
					posterPath={movie.poster_path}
					voteAverage={movie.vote_average.toFixed(1)}
					isFavorite={false}
					onFavorite={() => console.log('favorite')}
					onClick={() => navigate(`/movie/${movie.id}`)}
				/>
			))}
			{loading && Array(20).fill('').map(() => (
				<li>
					<Skeleton className="w-[200px] h-[368px]" />
				</li>
			))}
		</ul>
	);
}