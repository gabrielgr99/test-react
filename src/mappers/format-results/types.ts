type ResultItem = {
	id: number,
	posterPath: string,
	favorite: boolean,
	title: string,
	voteAverage: number
}

type FormatDataResponse = {
	totalResults: number,
	results: ResultItem[]
}

export type { FormatDataResponse }