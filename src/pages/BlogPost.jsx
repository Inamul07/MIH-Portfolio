import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { FaArrowLeft } from "react-icons/fa";
import { formatPostDate, getPost, isoPostDate } from "../lib/posts";
import usePageMeta from "../lib/usePageMeta";
import NotFound from "./NotFound";
import "./Blog.css";
import "./highlight.css";

const isExternal = (href = "") => /^https?:\/\//.test(href);
// "/blog/other-post" is a route; "/rss.xml" or "/images/x.png" is a file
const isAppRoute = (href = "") =>
	href.startsWith("/") &&
	!href.startsWith("//") &&
	!/\.[a-z0-9]+(?:[?#]|$)/i.test(href.split("/").pop());

// react-markdown passes its AST node as a prop; keep it off the DOM element
const withoutNode = (props) => {
	const rest = { ...props };
	delete rest.node;
	return rest;
};

const markdownComponents = {
	// Internal links stay in the SPA; external ones open in a new tab
	a: (allProps) => {
		const { href = "", children, ...props } = withoutNode(allProps);
		if (isAppRoute(href)) {
			return (
				<Link to={href} {...props}>
					{children}
				</Link>
			);
		}
		return (
			<a
				href={href}
				{...props}
				{...(isExternal(href) && {
					target: "_blank",
					rel: "noopener noreferrer",
				})}
			>
				{children}
			</a>
		);
	},
	img: (props) => (
		<img
			alt=""
			loading="lazy"
			decoding="async"
			{...withoutNode(props)}
		/>
	),
	// Wide tables scroll inside the article instead of the page
	table: (props) => (
		<div className="prose-table">
			<table {...withoutNode(props)} />
		</div>
	),
};

const BlogPost = () => {
	const { slug } = useParams();
	const post = getPost(slug);

	usePageMeta(post?.title ?? "Post not found", post?.description);

	if (!post) return <NotFound />;

	return (
		<article className="blog-page section">
			<div className="container post-container">
				<Link to="/blog" className="text-link post-back">
					<FaArrowLeft aria-hidden="true" /> All posts
				</Link>

				<header className="post-header">
					<h1 className="post-title">{post.title}</h1>
					{post.description && (
						<p className="post-description">{post.description}</p>
					)}
					<div className="post-meta">
						<time dateTime={isoPostDate(post.date)}>
							{formatPostDate(post.date)}
						</time>
						<span aria-hidden="true">·</span>
						<span>{post.readingMinutes} min read</span>
					</div>
					{post.tags.length > 0 && (
						<ul className="post-tags" aria-label="Tags">
							{post.tags.map((tag) => (
								<li key={tag}>
									<Link
										to={`/blog?tag=${encodeURIComponent(tag)}`}
										className="badge-pill post-tag"
									>
										{tag}
									</Link>
								</li>
							))}
						</ul>
					)}
				</header>

				<div className="prose">
					<ReactMarkdown
						remarkPlugins={[remarkGfm]}
						rehypePlugins={[
							rehypeSlug,
							[rehypeHighlight, { detect: false }],
						]}
						components={markdownComponents}
					>
						{post.content}
					</ReactMarkdown>
				</div>
			</div>
		</article>
	);
};

export default BlogPost;
