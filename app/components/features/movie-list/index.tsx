import { CardMovie } from "./components/card-movie";
import { Skeleton } from "~/components/ui/skeleton";
import type { MovieListProps } from "./types";

export function MovieList({ movies, loading }: MovieListProps) {
	const hasMovies = movies.total_results > 0;

	if (!loading && !hasMovies) return null;

	return (
		<ul className="flex gap-4 flex-wrap justify-center">
			{movies.results.map(movie => (
				<CardMovie
					key={movie.id}
					title={movie.title}
					posterPath={movie.poster_path}
					voteAverage={movie.vote_average.toFixed(1)}
					isFavorite={false}
					onFavorite={() => {}}
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