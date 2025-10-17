import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { CardMovieProps } from "./types";
import { VoteAverage } from "~/components/ui/vote-average";
import { HeartIcon } from "lucide-react";

export function CardMovie({ title, voteAverage, posterPath, onFavorite, isFavorite }: CardMovieProps) {
	return (
		<li>
			<Card className="p-0 border-0 w-[200px] h-max gap-0">
				<CardContent className="p-0 relative">
					<HeartIcon
						size={22}
						fill={isFavorite ? "red" : "transparent"}
						color="red"
						className="bg-background p-1 hover:p-0.5 m-2 duration-300 rounded-full absolute cursor-pointer right-0"
						onClick={onFavorite}
					/>
					<img alt="Movie poster" className="rounded-t-md" src={posterPath} />
				</CardContent>
				<CardHeader className="p-3">
					<CardTitle className="text-sm font-medium overflow-hidden text-ellipsis text-nowrap" title={title}>{title}</CardTitle>
					<VoteAverage voteAverage={voteAverage} />
				</CardHeader>
			</Card>
		</li>
	);
}