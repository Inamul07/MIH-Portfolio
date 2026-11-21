import {
	parseFrontmatter,
	parsePostDate,
	slugFromPath,
	toTagList,
} from "./frontmatter";

// Every Markdown file in /content/blog becomes a post at /blog/<file-name>.
// Vite bundles them at build time; new files are picked up in dev automatically.
const files = import.meta.glob("/content/blog/*.md", {
	query: "?raw",
	import: "default",
	eager: true,
});

const WORDS_PER_MINUTE = 220;

const posts = Object.entries(files)
	.map(([path, source]) => {
		const { data, content } = parseFrontmatter(source);
		const slug = slugFromPath(path);
		const date = parsePostDate(data.date);

		if (!data.title || !date) {
			console.warn(
				`[blog] Skipping ${path}: frontmatter needs "title" and "date" (YYYY-MM-DD).`,
			);
			return null;
		}

		const words = content.trim().split(/\s+/).length;

		return {
			slug,
			title: data.title,
			description: data.description ?? "",
			date,
			tags: toTagList(data.tags),
			readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
			content,
		};
	})
	.filter(Boolean)
	.sort((a, b) => b.date - a.date);

export const getAllPosts = () => posts;

export const getPost = (slug) => posts.find((post) => post.slug === slug);

export const getAllTags = () =>
	[...new Set(posts.flatMap((post) => post.tags))].sort((a, b) =>
		a.localeCompare(b),
	);

const dateFormatter = new Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
});

export const formatPostDate = (date) => dateFormatter.format(date);

// ISO date for <time dateTime>, without UTC conversion shifting the day
export const isoPostDate = (date) =>
	[
		date.getFullYear(),
		String(date.getMonth() + 1).padStart(2, "0"),
		String(date.getDate()).padStart(2, "0"),
	].join("-");
