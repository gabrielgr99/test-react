import type { Route } from "./+types/home";
import { HomeView } from "../pages/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Test React" },
    { name: "description", content: "Welcome to Test React!" },
  ];
}

export default function Home() {
  return <HomeView />;
}
