import { Skeleton } from "src/components/ui/skeleton";

export function MovieDetailsLoading() {
	return (
		<article className="flex gap-8 flex-col md:flex-row">
			<Skeleton className="flex-none md:flex-1 h-[360px]"/>

			<section className="flex-1">
				<Skeleton className="max-w-96 h-8 mb-4"/>

				<div className="flex gap-2 mb-4">
					<Skeleton className="rounded-full w-14 h-6"/>
					<Skeleton className="rounded-full w-14 h-6"/>
					<Skeleton className="rounded-full w-14 h-6"/>
				</div>

				<Skeleton className="w-60 h-4 mb-1"/>
				<Skeleton className="w-36 h-4 mb-6"/>
				
				<Skeleton className="w-20 h-6 mb-2"/>
				<Skeleton className="w-full h-20 mb-6"/>
			</section>
		</article>
	);
}