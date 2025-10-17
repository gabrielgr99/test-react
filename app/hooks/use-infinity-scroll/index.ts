import { useEffect } from "react";

export function useInfinityScroll(onTrigger: () => void) {
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const windowHeight = window.innerHeight;
			const fullHeight = document.documentElement.scrollHeight;

			const scrollPercent = (scrollTop + windowHeight) / fullHeight;

			if (scrollPercent >= 0.90) {
				onTrigger();
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [onTrigger]);
}
