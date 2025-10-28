import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type PropsWithChildren
} from "react";
import type { SearchMoviesContextValue } from "./types";

const INITAL_VALUE: SearchMoviesContextValue = {
	onChangeSearchTerm: () => {},
	searchTerm: ''
}

const SearchMoviesContext = createContext<SearchMoviesContextValue>(INITAL_VALUE);

function SearchMoviesProvider({ children }: PropsWithChildren) {
	const [searchTerm, setSearchTerm] = useState<string>('');

	const onChangeSearchTerm = useCallback((term: string) => {
		setSearchTerm(term);
	}, [setSearchTerm]);

	const contextValue = useMemo(() => ({
		onChangeSearchTerm,
		searchTerm
	}), [searchTerm, onChangeSearchTerm]);

	return (
		<SearchMoviesContext.Provider value={contextValue}>
			{children}
		</SearchMoviesContext.Provider>
	);
}

const useSearchMoviesContext = () => useContext(SearchMoviesContext);

export { SearchMoviesProvider, useSearchMoviesContext };
