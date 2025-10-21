import { Card, CardContent, CardHeader, CardTitle } from "src/components/ui/card";
import type { CardMovieProps } from "./types";
import { VoteAverage } from "src/components/ui/vote-average";
import { HeartIcon, Trash2Icon } from "lucide-react";

export function CardMovie({
	title,
	voteAverage,
	posterPath,
	onAddFavorite,
	onRemoveFavorite,
	isFavorite,
	onClick,
	iconName,
	term
}: CardMovieProps) {
	const formatTextToRich = (text: string) => {
		const textToLowerCase = text.toLowerCase();
		const termToLowerCase = term?.toLowerCase();

		if (termToLowerCase && textToLowerCase?.includes(termToLowerCase)) {
			const firstIndex = textToLowerCase.search(termToLowerCase);
			const lastIndex = firstIndex + termToLowerCase.length;

			return text.substring(0, firstIndex)
				+ "<span class='bg-background-sun text-background p-1 rounded-sm' }}>"
				+ text.substring(firstIndex, lastIndex)
				+ '</span>'
				+ text.substring(lastIndex);
		}

		return text;
	};

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
					<CardTitle
						className="text-sm font-medium overflow-hidden text-ellipsis text-nowrap"
						title={title}
						dangerouslySetInnerHTML={{ __html: formatTextToRich(title) }}
					/>
					<VoteAverage voteAverage={voteAverage} />
				</CardHeader>
			</Card>
		</li>
	);
}