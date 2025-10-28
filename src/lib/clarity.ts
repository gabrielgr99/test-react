export function initClarity() {
	if (process.env.NODE_ENV === 'development') {
		return;
	}

	const token = process.env.CLARITY;

	if (!token) {
		console.warn("Clarity token is not defined.");
		return;
	}

	(function (c, l, a, r, i, t, y) {
		// @ts-ignore
		c[a] = c[a] || function () {
			// @ts-ignore
			(c[a].q = c[a].q || []).push(arguments);
		};
		t = l.createElement(r);
		t.async = 1;
		t.src = "https://www.clarity.ms/tag/" + i;
		y = l.getElementsByTagName(r)[0];
		y.parentNode?.insertBefore(t, y);
	})(window, document, "clarity", "script", process.env.CLARITY);
}
