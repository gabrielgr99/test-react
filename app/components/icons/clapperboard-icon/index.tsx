import { ClapperboardIcon as LucideClapperboardIcon } from "lucide-react";
import type { ClapperboardIconProps } from "./types";

export function ClapperboardIcon({ size }: ClapperboardIconProps) {
	return (
		<LucideClapperboardIcon
			size={size}
			className="text-[#7d72ad]"
		/>
	);
}