import { Link } from "react-router-dom";
import usePageMeta from "../lib/usePageMeta";
import "./Blog.css";

const NotFound = () => {
	usePageMeta("Page not found");

	return (
		<div className="blog-page section">
			<div className="container not-found">
				<p className="badge-coral">404</p>
				<h1 className="section-title">This page doesn't exist.</h1>
				<p className="section-lead">
					The link may be old, or the post may have moved.
				</p>
				<div className="not-found-actions">
					<Link to="/" className="btn btn-primary">
						Go home
					</Link>
					<Link to="/blog" className="btn btn-secondary">
						Read the blog
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
