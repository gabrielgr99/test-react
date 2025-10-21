import { MediaList } from "src/components/features/media-list";
import { useFavoriteMovies } from "./hooks/use-favorite-movies";
import { SingleSelect } from "src/components/ui/select";
import { GET_FAVORITE_MOVIES_PARAMS_SORT_BY } from "src/api";
import { PageBody } from "src/components/features/page-body";
import { getOrderByOptions } from "./mappers/get-order-by-options";
import { EmptyState } from "src/components/features/empty-state";

export function FavoritesView() {
	const {
		hasMovies,
		isFetching,
		movies,
		onRemoveFavoriteMovie,
		onRedirectToDetails,
		onRedirectToHome,
		onOrderBy,
		orderBy
	} = useFavoriteMovies();

	if (!isFetching && !hasMovies) {
		return <EmptyState
			title="Nenhum filme favorito ainda"
			description="Comece explorando filmes populares e adicione seus favoritos!"
			actionLabel="Explorar Filmes"
			onClick={onRedirectToHome}
		/>
	}

	return (
		<article>
			{!isFetching && (
				<section className="flex flex-col gap-6 p-4 mb-4 border-b border-card">
					<h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
						Meus Filmes Favoritos
					</h2>

						<div className="flex items-center gap-2">
							<label htmlFor="order-by-select">Ordenar por:</label>
							<SingleSelect
								id="order-by-select"
								onValueChange={(value) => onOrderBy(value as GET_FAVORITE_MOVIES_PARAMS_SORT_BY)}
								value={orderBy}
								defaultValue={GET_FAVORITE_MOVIES_PARAMS_SORT_BY.TITLE_ASC}
								options={getOrderByOptions()}
							/>
						</div>
				</section>
			)}

			<PageBody>
				<MediaList
					loading={isFetching}
					medias={movies}
					onRedirect={onRedirectToDetails}
					onRemoveFavorite={onRemoveFavoriteMovie}
					iconName="trash"
				/>
			</PageBody>
		</article>
	);
}
