import { CodeXmlIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "src/components/ui/button";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<section className="flex flex-col items-center gap-6 mt-36">
			<CodeXmlIcon size={48} className="text-[#7d72ad]"/>
			<div className="flex flex-col items-center gap-2">
				<h4 className="scroll-m-20 text-muted-foreground text-xl font-medium tracking-tight">
					Página não encontrada
				</h4>
				<p className="text-muted-foreground text-sm" title="">
					Ops, parece que não encontramos o que você procura, tente explorar alguns filmes
				</p>
			</div>
			<Button onClick={() => navigate('/')}>
				Ver filmes
			</Button>
		</section>
	);
}