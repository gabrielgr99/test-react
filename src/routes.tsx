import Home from "./routes/home";
import Favorites from "./routes/favorites";
import Movie from "./routes/movie";
import Search from "./routes/search";
import { App } from "./main";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "favorites", element: <Favorites /> },
      { path: "movie/:movieId", element: <Movie /> },
      { path: "search", element: <Search /> },
    ],
  },
]);

export default router;
