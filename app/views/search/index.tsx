import { PageBody } from "~/components/features/page-body/page-body";
import { useSearchMovies } from "./hooks/use-search-movies";
import { MediaList } from "~/components/features/media-list";
import { EmptyState } from "~/components/features/empty-state";

export function SearchView() {
	const {
		query,
		researchedMovies,
		totalResutls,
		hasMovies,
		isFetching,
		onRedirectToDetails,
		onRemoveFavoriteMovie,
		onAddFavoriteMovie
	} = useSearchMovies();

	if (!isFetching && !hasMovies) {
		return <EmptyState
			title="Nenhum filme encontrado"
			description="Ops, não econtramos nenhum filme com esse nome, tente outro!"
			actionLabel="Tentar novamente"
		/>
	}

	return (
		<article>
			<section className="flex flex-col gap-6 p-4 mb-4 border-b border-card">
				<h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
					Resultados para: <span className="text-sun">"{query}"</span>
				</h2>
				<p>{isFetching ? 'Buscando...' : `Encontrados ${totalResutls} filmes`}</p>
			</section>

			<PageBody>
				<MediaList
					medias={researchedMovies}
					loading={isFetching}
					onRedirect={onRedirectToDetails}
					onAddFavorite={onAddFavoriteMovie}
					onRemoveFavorite={onRemoveFavoriteMovie}
				/>
			</PageBody>
		</article>
	);
}
