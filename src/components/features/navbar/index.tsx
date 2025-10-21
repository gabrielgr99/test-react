import { ClapperboardIcon } from "lucide-react"
import { buttonVariants } from "../../ui/button"
import { Input } from "../../ui/input"
import { NavLink } from "react-router"
import { useSearch } from "./hooks/use-search";

function Navbar() {
	const { onChangeSearchTerm, searchTerm } = useSearch();

	return (
		<header className="w-full border-b border-card flex justify-between items-center py-4 px-3 flex-col md:flex-row gap-4 md:h-">
			<h3 className="scroll-m-20 text-2xl font-bold tracking-tight text-sun flex gap-2 items-center">
				<ClapperboardIcon className="text-[#7d72ad]"/>
				MovieDB
			</h3>

			<Input
				title="Search movies"
				placeholder="Buscar filmes..."
				className="max-w-[336px] h-8"
				value={searchTerm}
				onChange={(event) => onChangeSearchTerm(event.target.value)}
			/>

			<nav className="flex gap-4">
				<NavLink
					to="/"
					className={({ isActive }) => buttonVariants({ variant: isActive ? 'default' : 'ghost' })}
					onClick={() => onChangeSearchTerm('')}
					end
				>
					Home
				</NavLink>
				<NavLink
					to="/favorites"
					className={({ isActive }) => buttonVariants({ variant: isActive ? 'default' : 'ghost' })}
					onClick={() => onChangeSearchTerm('')}
					end
				>
					Favoritos
				</NavLink>
			</nav>
		</header>
	)
}

export { Navbar }
