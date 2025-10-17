import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { CardMovieProps } from "./types";
import { VoteAverage } from "~/components/ui/vote-average";
import { HeartIcon } from "~/components/icons/heart-icon";

export function CardMovie({ title, voteAverage, posterPath, onFavorite, isFavorite }: CardMovieProps) {
	return (
		<li title={title}>
			<Card className="p-0 border-0 w-[200px] h-max gap-0 hover:scale-105 duration-300">
				<CardContent className="p-0 relative">
					<HeartIcon
						fill={isFavorite}
						onClick={onFavorite}
					/>
					<img alt="Movie poster" className="rounded-t-md h-[300px]" src={posterPath} />
				</CardContent>
				<CardHeader className="p-3">
					<CardTitle className="text-sm font-medium overflow-hidden text-ellipsis text-nowrap" title={title}>
						{title}
					</CardTitle>
					<VoteAverage voteAverage={voteAverage} />
				</CardHeader>
			</Card>
		</li>
	);
}