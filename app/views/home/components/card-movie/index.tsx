import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { CardMovieProps } from "./types";
import { VoteAverage } from "~/components/ui/vote-average";

export function CardMovie({ title, voteAverage, posterPath }: CardMovieProps) {
	return (
		<Card className="p-0 border-0 w-[200px] h-max gap-0">
			<CardContent className="p-0">
				<img alt="Movie poster" src={posterPath} />
			</CardContent>
			<CardHeader className="p-3">
				<CardTitle className="text-sm font-medium h-[2lh] line-clamp-2" title={title}>{title}</CardTitle>
				<VoteAverage voteAverage={voteAverage} />
			</CardHeader>
		</Card>
	);
}