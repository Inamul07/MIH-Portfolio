import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { getAllPosts } from "../lib/posts";
import PostList from "./PostList";

const LATEST_COUNT = 3;

const LatestPosts = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const posts = getAllPosts().slice(0, LATEST_COUNT);

	if (posts.length === 0) return null;

	return (
		<section className="section latest-posts" id="writing" ref={ref}>
			<motion.div
				className="container"
				initial={{ opacity: 0, y: 24 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
				transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			>
				<div className="section-head">
					<h2 className="section-title">Writing</h2>
					<p className="section-lead">
						Notes on whatever I'm curious about at the moment.
					</p>
				</div>
				<PostList posts={posts} headingLevel="h3" />
				<Link to="/blog" className="text-link latest-posts-all">
					All posts <FaArrowRight aria-hidden="true" />
				</Link>
			</motion.div>
		</section>
	);
};

export default LatestPosts;
