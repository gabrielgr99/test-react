import { GET_FAVORITE_MOVIES_PARAMS_SORT_BY, type GetFavoriteMoviesResponse } from "src/api";

function formatText(text: string) {
	return text.toLowerCase().replaceAll(' ', '');
}

export function orderData(data: GetFavoriteMoviesResponse[], orderBy: GET_FAVORITE_MOVIES_PARAMS_SORT_BY) {
	if (orderBy === GET_FAVORITE_MOVIES_PARAMS_SORT_BY.TITLE_ASC) {
		return data.sort((a, b) => formatText(a.title) > formatText(b.title) ? 1 : -1);
	}

	if (orderBy === GET_FAVORITE_MOVIES_PARAMS_SORT_BY.TITLE_DESC) {
		return data.sort((a, b) => formatText(a.title) < formatText(b.title) ? 1 : -1);
	}

	if (orderBy === GET_FAVORITE_MOVIES_PARAMS_SORT_BY.VOTE_AVERAGE_ASC) {
		return data.sort((a, b) => a.voteAverage > b.voteAverage ? 1 : -1);
	}

	if (orderBy === GET_FAVORITE_MOVIES_PARAMS_SORT_BY.VOTE_AVERAGE_DESC) {
		return data.sort((a, b) => a.voteAverage < b.voteAverage ? 1 : -1);
	}

	return data;
}