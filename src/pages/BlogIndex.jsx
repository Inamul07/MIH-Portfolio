import { Link, useSearchParams } from "react-router-dom";
import { FaRss } from "react-icons/fa";
import { getAllPosts, getAllTags } from "../lib/posts";
import usePageMeta from "../lib/usePageMeta";
import PostList from "../components/PostList";
import "./Blog.css";

const BlogIndex = () => {
	const [searchParams] = useSearchParams();
	const activeTag = searchParams.get("tag");
	const tags = getAllTags();
	const posts = getAllPosts().filter(
		(post) => !activeTag || post.tags.includes(activeTag),
	);

	usePageMeta(
		activeTag ? `Posts tagged “${activeTag}”` : "Blog",
		"Notes and thoughts by Mohammed Inamul Hassan M.",
	);

	return (
		<div className="blog-page section">
			<div className="container">
				<header className="section-head blog-head">
					<h1 className="section-title">Blog</h1>
					<p className="section-lead">
						Notes on whatever I'm curious about at the moment.{" "}
						<a href="/rss.xml" className="text-link blog-rss">
							<FaRss aria-hidden="true" /> RSS
						</a>
					</p>
				</header>

				{tags.length > 0 && (
					<nav className="tag-filter" aria-label="Filter by tag">
						<Link
							to="/blog"
							className={`badge-pill ${!activeTag ? "is-active" : ""}`}
							aria-current={!activeTag ? "page" : undefined}
						>
							All
						</Link>
						{tags.map((tag) => (
							<Link
								key={tag}
								to={`/blog?tag=${encodeURIComponent(tag)}`}
								className={`badge-pill ${activeTag === tag ? "is-active" : ""}`}
								aria-current={
									activeTag === tag ? "page" : undefined
								}
							>
								{tag}
							</Link>
						))}
					</nav>
				)}

				{posts.length > 0 ? (
					<PostList posts={posts} />
				) : (
					<p className="blog-empty">
						{activeTag ? (
							<>
								No posts tagged “{activeTag}”.{" "}
								<Link to="/blog" className="text-link">
									See all posts
								</Link>
							</>
						) : (
							"No posts yet. Check back soon."
						)}
					</p>
				)}
			</div>
		</div>
	);
};

export default BlogIndex;
