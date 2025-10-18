import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { CardMovieProps } from "./types";
import { VoteAverage } from "~/components/ui/vote-average";
import { HeartIcon, Trash2Icon } from "lucide-react";

export function CardMovie({
	title,
	voteAverage,
	posterPath,
	onAddFavorite,
	onRemoveFavorite,
	isFavorite,
	onClick,
	iconName
}: CardMovieProps) {
	return (
		<li title={title}>
			<Card className="p-0 border-0 w-[200px] h-max gap-0 hover:scale-105 duration-300 cursor-pointer">
				<CardContent className="p-0 relative">
					{iconName === 'heart' && (
						<HeartIcon
							size={22}
							fill={isFavorite ? "red" : "transparent"}
							color="red"
							className="bg-background p-1 hover:p-0.5 m-2 duration-300 rounded-full absolute cursor-pointer right-0"
							onClick={isFavorite ? onRemoveFavorite : onAddFavorite}
						/>
					)}
					{iconName === 'trash' && (
						<Trash2Icon
							size={22}
							color='white'
							className="bg-background p-1 hover:p-0.5 m-2 duration-300 rounded-full absolute cursor-pointer right-0"
							onClick={onRemoveFavorite}
						/>
					)}
					<img
						alt="Movie poster"
						className="rounded-t-md h-[300px]"
						src={posterPath}
						onClick={onClick}
					/>
				</CardContent>
				<CardHeader className="p-3" onClick={onClick}>
					<CardTitle className="text-sm font-medium overflow-hidden text-ellipsis text-nowrap" title={title}>
						{title}
					</CardTitle>
					<VoteAverage voteAverage={voteAverage} />
				</CardHeader>
			</Card>
		</li>
	);
}