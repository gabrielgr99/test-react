import type { PropsWithChildren } from "react"
import { Navbar } from "../navbar/navbar"

function PageLayout({ children }: PropsWithChildren) {
	return (
		<main>
			<Navbar />
			{children}
		</main>
	)
}

export { PageLayout }
