import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovies } from "~/api";
import { useInfinityScroll } from "~/hooks/use-infinity-scroll";
import { formatResults } from "~/mappers/format-movies";

export function useMovies() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetching,
		refetch
	} = useInfiniteQuery({
		queryKey: ["get-movies-explorer"],
		queryFn: ({ pageParam = 1 }) => getMovies({ page: pageParam }),
		getNextPageParam: (lastPage) => lastPage.page + 1,
		select: (data) => formatResults(data.pages.flatMap(page => page.results)),
		initialPageParam: 1,
		initialData: { pageParams: [], pages: [] }
	});

	const goToNextPage = () => {
		if (hasNextPage) {
			fetchNextPage()
		}
	}

	useInfinityScroll({ onTrigger: goToNextPage });

	const hasMovies = data && data.length > 0;

	return {
		data,
		hasMovies,
		isFetching,
		refetch
	}
}