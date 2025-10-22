import { Button } from "src/components/ui/button";
import type { EmptyStateProps } from "./types";
import { ClapperboardIcon } from "lucide-react";

export function EmptyState({ onClick, actionLabel, description, title }: EmptyStateProps) {
	const hasAction = onClick && actionLabel;

	return (
		<section className="flex flex-col items-center gap-6 mt-36">
			<ClapperboardIcon size={48} className="text-[#7d72ad]"/>
			<div className="flex flex-col items-center gap-2">
				<h4 className="scroll-m-20 text-muted-foreground text-xl font-medium tracking-tight">
					{title}
				</h4>
				<p className="text-muted-foreground text-sm" aria-label={description}>
					{description}
				</p>
			</div>
			{hasAction && (
				<Button onClick={onClick}>
					{actionLabel}
				</Button>
			)}
		</section>
	);
}