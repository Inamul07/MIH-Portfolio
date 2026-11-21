// Minimal frontmatter parser shared by the browser bundle and the RSS build
// plugin in vite.config.js. It supports what blog posts need:
//
//   ---
//   title: "Post title"
//   date: 2026-11-21
//   description: One-line summary
//   tags: [notes, learning]       # or a "- item" list on the following lines
//   ---
//
// Keep this file free of Node or browser-only APIs.

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

const unquote = (value) => {
	const v = value.trim();
	if (
		v.length >= 2 &&
		((v.startsWith('"') && v.endsWith('"')) ||
			(v.startsWith("'") && v.endsWith("'")))
	) {
		return v.slice(1, -1);
	}
	return v;
};

const parseValue = (raw) => {
	const value = raw.trim();
	if (value.startsWith("[") && value.endsWith("]")) {
		return value
			.slice(1, -1)
			.split(",")
			.map(unquote)
			.filter(Boolean);
	}
	if (value === "true") return true;
	if (value === "false") return false;
	return unquote(value);
};

export const parseFrontmatter = (source) => {
	const match = source.match(FRONTMATTER_RE);
	if (!match) return { data: {}, content: source };

	const data = {};
	let listKey = null;

	for (const line of match[1].split(/\r?\n/)) {
		if (!line.trim() || line.trim().startsWith("#")) continue;

		const listItem = line.match(/^\s+-\s+(.*)$/);
		if (listItem && listKey) {
			data[listKey].push(unquote(listItem[1]));
			continue;
		}

		const pair = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
		if (!pair) continue;

		const [, key, value] = pair;
		if (value.trim() === "") {
			// Start of a "- item" list
			data[key] = [];
			listKey = key;
		} else {
			data[key] = parseValue(value);
			listKey = null;
		}
	}

	return { data, content: source.slice(match[0].length) };
};

// "2026-11-21" -> local-time Date, so the day doesn't shift with the timezone
export const parsePostDate = (value) => {
	const m = String(value ?? "").match(/^(\d{4})-(\d{2})-(\d{2})/);
	if (!m) return null;
	return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
};

export const slugFromPath = (path) =>
	path
		.split("/")
		.pop()
		.replace(/\.md$/, "");

export const toTagList = (tags) => {
	if (Array.isArray(tags)) return tags.map(String);
	if (typeof tags === "string" && tags) return [tags];
	return [];
};
