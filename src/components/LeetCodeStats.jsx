import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SiLeetcode } from "react-icons/si";
import axios from "axios";
import portfolioData from "../data/portfolio";
import "./LeetCodeStats.css";

const LeetCodeStats = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const username = portfolioData.personal.leetcode;

	useEffect(() => {
		const fetchLeetCodeStats = async () => {
			try {
				// Using alfa-leetcode-api (more reliable)
				const response = await axios.get(
					`https://alfa-leetcode-api.onrender.com/${username}/solved`,
				);

				const data = response.data;

				const problemsSolved = {
					total: data.solvedProblem || 0,
					easy: data.easySolved || 0,
					medium: data.mediumSolved || 0,
					hard: data.hardSolved || 0,
				};

				setStats(problemsSolved);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching LeetCode stats:", error);
				// Fallback to placeholder data if API fails
				setStats({
					total: 0,
					easy: 0,
					medium: 0,
					hard: 0,
				});
				setLoading(false);
			}
		};

		if (isInView) {
			fetchLeetCodeStats();
		}
	}, [isInView, username]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { scale: 0.8, opacity: 0 },
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<section className="leetcode-stats" ref={ref}>
			<div className="container">
				<motion.div
					className="stats-header"
					initial={{ opacity: 0, y: 30 }}
					animate={
						isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
					}
					transition={{ duration: 0.6 }}
				>
					<SiLeetcode className="stats-icon leetcode-icon" />
					<h2>LeetCode Statistics</h2>
				</motion.div>

				{loading ? (
					<div className="loading">
						<div className="loader"></div>
						<p>Loading LeetCode stats...</p>
					</div>
				) : stats ? (
					<motion.div
						className="stats-grid"
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
					>
						<motion.div
							className="stat-card total"
							variants={itemVariants}
						>
							<div className="stat-value">{stats.total}</div>
							<div className="stat-label">
								Total Problems Solved
							</div>
						</motion.div>
						<motion.div
							className="stat-card easy"
							variants={itemVariants}
						>
							<div className="stat-value">{stats.easy}</div>
							<div className="stat-label">Easy</div>
							<div className="difficulty-badge easy-badge">
								Easy
							</div>
						</motion.div>
						<motion.div
							className="stat-card medium"
							variants={itemVariants}
						>
							<div className="stat-value">{stats.medium}</div>
							<div className="stat-label">Medium</div>
							<div className="difficulty-badge medium-badge">
								Medium
							</div>
						</motion.div>
						<motion.div
							className="stat-card hard"
							variants={itemVariants}
						>
							<div className="stat-value">{stats.hard}</div>
							<div className="stat-label">Hard</div>
							<div className="difficulty-badge hard-badge">
								Hard
							</div>
						</motion.div>
					</motion.div>
				) : (
					<div className="error-message">
						<p>
							Unable to load LeetCode stats. Please try again
							later.
						</p>
					</div>
				)}

				<motion.div
					className="leetcode-link"
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ delay: 0.8 }}
				>
					<a
						href={`https://leetcode.com/${username}`}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-secondary"
					>
						<SiLeetcode /> View LeetCode Profile
					</a>
				</motion.div>
			</div>
		</section>
	);
};

export default LeetCodeStats;
