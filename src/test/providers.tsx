import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";

export function Providers({ children }: PropsWithChildren) {
	return (
		<MemoryRouter>
			<QueryClientProvider client={new QueryClient()}>
				{children}
			</QueryClientProvider>
		</MemoryRouter>
	);
}