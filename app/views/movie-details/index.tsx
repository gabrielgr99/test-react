import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getMovieById } from "~/api";
import { formatMovieResponse } from "./mappers/format-movie-response";
import { VoteAverage } from "~/components/ui/vote-average";
import { Button } from "~/components/ui/button";
import { HeartIcon } from "lucide-react";
import { ErrorState } from "~/components/features/error-state";
import { MovieDetailsLoading } from "./components/movie-details-loading";


export function MovieDetailsView() {
	const { movieId } = useParams();

	const { data, isFetching, refetch } = useQuery({
		queryKey: ['get-movie-by-id', movieId],
		queryFn: () => getMovieById(movieId ?? ''),
		select: (data) => formatMovieResponse(data),
		enabled: !!movieId,
		refetchOnWindowFocus: false,
		retryDelay: 5000
	})

	if (isFetching) {
		return <MovieDetailsLoading />;
	};

	if (!isFetching && !data) {
		return <ErrorState onClick={refetch} />
	};

	return (
		<article className="flex gap-8">
			<div className="bg-accent animate-pulse flex-1 rounded-lg h-[360px]">
				<img
					alt="Movie poster"
					src={data?.backdrop_path}
					className="w-full h-full rounded-lg object-cover opacity-0"
					onLoad={(event) => {
						event.target.style.opacity = 1;
						event.target.parentNode.style.animation = 'none';
						event.target.parentNode.style.height = 'auto';
					}}
					loading="lazy"
				/>
			</div>

			<section className="flex-1">
				<h2 className="scroll-m-20 mb-4 text-3xl font-bold tracking-tight first:mt-0">
					{data?.title}
				</h2>

				<ul className="flex gap-2 mb-4">
					{data?.genres.map(genre => (
						<li key={genre.id} className="bg-primary text-foreground px-2 py-1 rounded-full text-xs">
							{genre.name}
						</li>
					))}
				</ul>

				<div className="flex gap-1 mb-1 items-center text-muted-light">
					<small className="text-sm leading-none font-semibold ">Data de lançamento:</small>
					<small className="text-sm leading-none">{data?.release_date}</small>
				</div>
				<div className="mb-6 flex gap-1 items-center text-muted-light">
					<small className="text-sm leading-none font-medium">Nota TMDB:</small>
					<VoteAverage voteAverage={data?.vote_average.toFixed(1) ?? ''} />
				</div>

				<div className="mb-6">
					<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
						Sinopse
					</h4>
					<p className="leading-7">
						{data?.overview}
					</p>
				</div>

				<Button variant='destructive' onClick={() => {}}>
					<HeartIcon
						size={22}
						fill="white"
						color="white"
					/>
					Adicionar aos Favoritos
				</Button>
			</section>
		</article>
	);
}