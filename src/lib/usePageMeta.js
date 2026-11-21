import { useEffect } from "react";

const SITE_NAME = "Mohammed Inamul Hassan M";

// Sets the tab title and meta description for client-rendered pages, and
// restores the homepage values when the page unmounts.
const usePageMeta = (title, description) => {
	useEffect(() => {
		const meta = document.querySelector('meta[name="description"]');
		const previousTitle = document.title;
		const previousDescription = meta?.getAttribute("content");

		document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME;
		if (meta && description) meta.setAttribute("content", description);

		return () => {
			document.title = previousTitle;
			if (meta && previousDescription != null) {
				meta.setAttribute("content", previousDescription);
			}
		};
	}, [title, description]);
};

export default usePageMeta;
