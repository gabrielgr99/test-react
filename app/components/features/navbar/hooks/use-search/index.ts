import { useEffect, useState } from "react";
import { redirect, useLocation, useNavigate, useSearchParams } from "react-router";

export function useSearch() {
	const [searchValue, setSearchValue] = useState<string>('');

	const [searchParams, setSearchParams] = useSearchParams();
	const location = useLocation();
	const navigate = useNavigate();

	const searchParamsQuery = searchParams.get('query');

	const onChangeSearch = (query: string) => {
		setSearchValue(query);
	};

	 useEffect(() => {
		const timeout = setTimeout(() => {
			if (!searchValue && location.pathname !== '/') {
				navigate('/');
				return searchParams.delete('query')
			}

			if (location.pathname !== '/search' && searchValue) {
				return navigate(`search?query=${searchValue}`);
			}
			
			if (searchParamsQuery !== searchValue && searchValue) {
				setSearchParams({ query: searchValue });
			}
		}, 500);

		return () => clearTimeout(timeout);
	}, [onChangeSearch, searchValue, searchParamsQuery]);

	return {
		searchValue,
		onChangeSearch
	};
}