import { ClapperboardIcon } from "~/components/icons/clapperboard-icon";
import { Button } from "~/components/ui/button";
import type { EmptyStateProps } from "./types";

export function EmptyState({ onClick }: EmptyStateProps) {
	return (
		<section className="flex flex-col items-center gap-6 mt-36">
			<ClapperboardIcon size={48} />
			<div className="flex flex-col items-center gap-2">
				<h4 className="scroll-m-20 text-muted-foreground text-xl font-medium tracking-tight">
					Sem filmes por aqui
				</h4>
				<p className="text-muted-foreground text-sm">
					Ops, acho que tivemos um erro, por favor, tente novamente...
				</p>
			</div>
			<Button onClick={onClick}>
				Tentar novamente
			</Button>
		</section>
	);
}