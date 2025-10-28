import {
	Outlet,
	RouterProvider,
	type LinksFunction,
} from "react-router";

import "./app.css";
import { PageLayout } from "./components/features/page-layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchMoviesProvider } from "./contexts/use-search-movies";
import { createRoot } from "react-dom/client";
import router from "./routes";
import { initClarity } from "./lib/clarity";

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 3,
			retryDelay: 5000,
			refetchOnWindowFocus: false
		}
	}
});

export function App() {
	initClarity();

	return (
		<QueryClientProvider client={queryClient}>
			<SearchMoviesProvider>
				<PageLayout>
					<Outlet />
				</PageLayout>
			</SearchMoviesProvider>
		</QueryClientProvider>
	);
}

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
