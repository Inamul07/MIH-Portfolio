import { Link } from "react-router-dom";
import { formatPostDate, isoPostDate } from "../lib/posts";
import "./PostList.css";

// Editorial list of posts: date + reading time on the left, title on the right.
const PostList = ({ posts, headingLevel = "h2" }) => {
	const Heading = headingLevel;

	return (
		<ol className="post-list">
			{posts.map((post) => (
				<li key={post.slug} className="post-list-item">
					<div className="post-list-meta">
						<time dateTime={isoPostDate(post.date)}>
							{formatPostDate(post.date)}
						</time>
						<span>{post.readingMinutes} min read</span>
					</div>
					<div className="post-list-body">
						<Heading className="post-list-title">
							<Link to={`/blog/${post.slug}`}>{post.title}</Link>
						</Heading>
						{post.description && <p>{post.description}</p>}
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
					</div>
				</li>
			))}
		</ol>
	);
};

export default PostList;
