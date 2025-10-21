import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";

export function Providers({ children }: PropsWithChildren) {
	return (
		<MemoryRouter>
			{children}
		</MemoryRouter>
	);
}