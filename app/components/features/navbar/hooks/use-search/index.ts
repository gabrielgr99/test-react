import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { useSearchMoviesContext } from "~/contexts/use-search-movies";

export function useSearch() {
	const { searchTerm, onChangeSearchTerm } = useSearchMoviesContext();

	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const searchParamsQuery = searchParams.get('query');

	const onChangeSearch = (query: string) => onChangeSearchTerm(query);

	const onClearSearch = useCallback(() => {
		onChangeSearchTerm('');
	}, []);

	 useEffect(() => {
		const timeout = setTimeout(() => {
			if (!searchTerm && location.pathname === '/search') {
				onChangeSearchTerm('');
				return navigate('/');
			}

			if (location.pathname !== '/search' && searchTerm) {
				return navigate(`search?query=${searchTerm}`);
			}
			
			if (searchParamsQuery !== searchTerm && searchTerm) {
				setSearchParams({ query: searchTerm });
			}
		}, 500);

		return () => clearTimeout(timeout);
	}, [onChangeSearch, searchTerm, searchParamsQuery, onClearSearch]);

	return {
		searchTerm: searchTerm || '',
		onChangeSearchTerm
	};
}