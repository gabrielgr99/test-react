import { GET_FAVORITE_MOVIES_PARAMS_SORT_BY, labelsSortBy } from "~/api";

export function getOrderByOptions() {
	return Object.values(GET_FAVORITE_MOVIES_PARAMS_SORT_BY).map(option => ({
		label: labelsSortBy[option],
		value: option
	}));
}