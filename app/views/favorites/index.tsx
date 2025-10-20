import { MediaList } from "~/components/features/media-list";
import { useFavoriteMovies } from "./hooks/use-favorite-movies";
import { EmptyState } from "./components/empty-state";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { GET_FAVORITE_MOVIES_PARAMS_SORT_BY } from "~/api";
import { PageBody } from "~/components/features/page-body/page-body";
import { useState } from "react";

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
		return <EmptyState onClick={onRedirectToHome} />
	}

	return (
		<article>
			<section className="flex flex-col gap-6 p-4 mb-4 border-b border-card">
				<h2 className="scroll-m-20 text-3xl font-bold tracking-tight first:mt-0">
					Meus Filmes Favoritos
				</h2>

				<div className="flex items-center gap-2">
					<label htmlFor="order-by-select">Ordenar por:</label>
					<Select
						defaultValue={GET_FAVORITE_MOVIES_PARAMS_SORT_BY.TITLE_ASC}
						value={orderBy}
						onValueChange={onOrderBy}
					>
						<SelectTrigger id="order-by-select" className="w-[180px]">
							<SelectValue placeholder="Selecione"/>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value={GET_FAVORITE_MOVIES_PARAMS_SORT_BY.TITLE_ASC}>
									Título (A-Z)
								</SelectItem>
								<SelectItem value={GET_FAVORITE_MOVIES_PARAMS_SORT_BY.TITLE_DESC}>
									Título (Z-A)
								</SelectItem>
								<SelectItem value={GET_FAVORITE_MOVIES_PARAMS_SORT_BY.VOTE_AVERAGE_ASC}>
									Média de votos (crescente)
								</SelectItem>
								<SelectItem value={GET_FAVORITE_MOVIES_PARAMS_SORT_BY.VOTE_AVERAGE_DESC}>
									Média de votos (decrescente)
								</SelectItem>
							</SelectGroup>
					</SelectContent>
					</Select>
				</div>
			</section>

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
