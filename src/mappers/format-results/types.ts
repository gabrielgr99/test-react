type ResultItem = {
	id: number,
	posterPath: string | null,
	favorite: boolean,
	title: string,
	voteAverage: number
}

type FormatDataResponse = {
	totalResults: number,
	results: ResultItem[]
}

export type { FormatDataResponse }