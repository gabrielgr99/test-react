type VoteAverageProps = {
	voteAverage: string
}

export function VoteAverage({ voteAverage }: VoteAverageProps) {
	return (
		<div className="bg-[#ed9511] text-background font-semibold text-xs w-max px-1 rounded-full">
			{voteAverage}
		</div>
	);
}