import type { PropsWithChildren } from "react"

function PageBody({ children }: PropsWithChildren) {
	return (
		<div className="p-4">
			{children}
		</div>
	)
}

export { PageBody }
