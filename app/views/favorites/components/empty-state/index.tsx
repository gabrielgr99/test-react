import { Button } from "~/components/ui/button";
import type { ErrorStateProps } from "./types";
import { ClapperboardIcon } from "lucide-react";

export function EmptyState({ onClick }: ErrorStateProps) {
	return (
		<section className="flex flex-col items-center gap-6 mt-36">
			<ClapperboardIcon size={48} className="text-[#7d72ad]"/>
			<div className="flex flex-col items-center gap-2">
				<h4 className="scroll-m-20 text-muted-foreground text-xl font-medium tracking-tight">
					Nenhum filme favorito ainda
				</h4>
				<p className="text-muted-foreground text-sm">
					Comece explorando filmes populares e adicione seus favoritos!
				</p>
			</div>
			<Button onClick={onClick}>
				Explorar Filmes
			</Button>
		</section>
	);
}