import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home/index.tsx"),
	route("/favorites", 'routes/favorites/index.tsx'),
	route("/movie/:movieId", 'routes/movie/index.tsx'),
	route("/search", 'routes/search/index.tsx')
] satisfies RouteConfig;
