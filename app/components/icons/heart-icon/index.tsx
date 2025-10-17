import { HeartIcon as LucideHeartIcon } from "lucide-react";
import type { HeartIconProps } from "./types";

export function HeartIcon({ fill, onClick }: HeartIconProps) {
	return (
		<LucideHeartIcon
			size={22}
			fill={fill ? "red" : "transparent"}
			color="red"
			className="bg-background p-1 hover:p-0.5 m-2 duration-300 rounded-full absolute cursor-pointer right-0"
			onClick={onClick}
		/>
	);
}