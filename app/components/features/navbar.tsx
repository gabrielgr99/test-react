import { ClapperboardIcon } from "lucide-react"
import { buttonVariants } from "../ui/button"
import { Input } from "../ui/input"
import { NavLink } from "react-router"

function Navbar() {
	return (
		<header className="w-full border-b border-neutral-400 flex justify-between items-center py-4 px-3 flex-col md:flex-row gap-4 md:h-">
			<h3 className="scroll-m-20 text-2xl font-bold tracking-tight text-[#ed9511] flex gap-2 items-center">
				<ClapperboardIcon className="text-[#7d72ad]" />
				MovieDB
			</h3>

			<Input placeholder="Buscar filmes..." className="max-w-[336px] h-8" />

			<nav className="flex gap-4">
				<NavLink
					to="/"
					className={({ isActive }) => buttonVariants({ variant: isActive ? 'default' : 'ghost' })}
					end
				>
					Home
				</NavLink>
				<NavLink
					to="/favorites"
					className={({ isActive }) => buttonVariants({ variant: isActive ? 'default' : 'ghost' })}
					end
				>
					Favoritos
				</NavLink>
			</nav>
		</header>
	)
}

export { Navbar }
