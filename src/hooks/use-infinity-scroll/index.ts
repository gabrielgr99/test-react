import { useCallback, useEffect } from "react";
import type { UseInfinityScrollParams } from "./types";

export function useInfinityScroll({ onTrigger, enableTrigger }: UseInfinityScrollParams) {
	const handleScroll = useCallback(() => {
		const scrollTop = window.scrollY;
		const windowHeight = window.innerHeight;
		const fullHeight = document.documentElement.scrollHeight;

		const scrollPercent = (scrollTop + windowHeight) / fullHeight;

		if (scrollPercent >= 0.90 && scrollPercent < 1 && enableTrigger) {
			onTrigger();
		}
	}, [onTrigger, enableTrigger]);

	const loadDocument = useCallback(() => {
		handleScroll();

		const windowHeight = window.innerHeight;
		const fullHeight = document.documentElement.scrollHeight;

		if (windowHeight === fullHeight && enableTrigger) {
			onTrigger();
		}
	}, [onTrigger, enableTrigger]);

	useEffect(() => {
		loadDocument();

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll, loadDocument]);
}
