import { VoteAverage } from "src/components/ui/vote-average";
import { Button } from "src/components/ui/button";
import { HeartIcon } from "lucide-react";
import { MovieDetailsLoading } from "./components/movie-details-loading";
import { useMovieDetails } from "./hooks/use-movie-details";
import { EmptyState } from "src/components/features/empty-state";


export function DetailsView() {
	const {
		movie,
		isFetching,
		onAddFavoriteMovie,
		onRemoveFavoriteMovie,
		refetch,
		hasMovie
	} = useMovieDetails();

	if (isFetching) {
		return <MovieDetailsLoading />;
	};

	if (hasMovie) {
		return <EmptyState
			title="Sem filmes por aqui"
			description="Ops, acho que tivemos um erro, por favor, tente novamente..."
			actionLabel="Tentar novamente"
			onClick={refetch}
		/>
	};

	return (
		<article className="flex gap-8">
			<div className="bg-accent animate-pulse flex-1 rounded-lg h-[360px]">
				<img
					alt="Movie poster"
					src={movie?.backdropPath}
					className="w-full h-full rounded-lg object-cover opacity-0"
					onLoad={(event) => {
						event.currentTarget.style.opacity = '1';
						event.currentTarget.parentElement!.style.animation = 'none';
						event.currentTarget.parentElement!.style.height = 'auto';
					}}
					loading="lazy"
				/>
			</div>

			<section className="flex-1">
				<h2 className="scroll-m-20 mb-4 text-3xl font-bold tracking-tight first:mt-0">
					{movie?.title}
				</h2>

				<ul className="flex gap-2 mb-4">
					{movie?.genres.map(genre => (
						<li key={genre.id} className="bg-primary text-foreground px-2 py-1 rounded-full text-xs">
							{genre.name}
						</li>
					))}
				</ul>

				<div className="flex gap-1 mb-1 items-center text-muted-light">
					<small className="text-sm leading-none font-semibold ">Data de lançamento:</small>
					<small className="text-sm leading-none">{movie?.releaseDate}</small>
				</div>
				<div className="mb-6 flex gap-1 items-center text-muted-light">
					<small className="text-sm leading-none font-medium">Nota TMDB:</small>
					<VoteAverage voteAverage={movie?.voteAverage.toFixed(1) ?? ''} />
				</div>

				<div className="mb-6">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
						Sinopse
					</h4>
					<p className="leading-7">
						{movie?.overview}
					</p>
				</div>

				<Button variant='destructive' onClick={movie?.favorite ? onRemoveFavoriteMovie : onAddFavoriteMovie}>
					<HeartIcon
						size={22}
						fill="white"
						color="white"
					/>
					{movie?.favorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
				</Button>
			</section>
		</article>
	);
}