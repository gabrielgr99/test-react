import type { PropsWithChildren } from "react"

function PageBody({ children }: PropsWithChildren) {
	return (
		<div className="p-4 max-w-[1600px] mx-auto">
			{children}
		</div>
	)
}

export { PageBody }
