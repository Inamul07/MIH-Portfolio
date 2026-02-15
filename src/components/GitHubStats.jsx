import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import axios from "axios";
import portfolioData from "../data/portfolio";
import "./GitHubStats.css";

const GitHubStats = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [stats, setStats] = useState(null);
	const [loading, setLoading] = useState(true);
	const username = portfolioData.personal.github;

	useEffect(() => {
		const fetchGitHubStats = async () => {
			try {
				const userResponse = await axios.get(
					`https://api.github.com/users/${username}`,
				);
				const reposResponse = await axios.get(
					`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
				);

				const repos = reposResponse.data;
				const totalStars = repos.reduce(
					(acc, repo) => acc + repo.stargazers_count,
					0,
				);
				const totalForks = repos.reduce(
					(acc, repo) => acc + repo.forks_count,
					0,
				);

				// Fetch streak and commit data from GitHub Streak Stats API
				let totalCommits = 0;
				let longestStreak = 0;

				try {
					const streakResponse = await axios.get(
						`https://github-readme-streak-stats.herokuapp.com/?user=${username}&type=json`,
						{ timeout: 10000 },
					);

					if (streakResponse.data) {
						totalCommits =
							streakResponse.data.totalContributions || 0;
						longestStreak =
							streakResponse.data.longestStreak?.length || 0;
					}
				} catch (streakError) {
					console.warn(
						"Streak stats unavailable (works after deployment):",
						streakError.message,
					);
					// Set to 0 for now, will work after deployment
					totalCommits = 0;
					longestStreak = 0;
				}

				setStats({
					publicRepos: userResponse.data.public_repos,
					followers: userResponse.data.followers,
					following: userResponse.data.following,
					totalStars,
					totalForks,
					totalCommits,
					longestStreak,
					avatarUrl: userResponse.data.avatar_url,
					bio: userResponse.data.bio,
				});
				setLoading(false);
			} catch (error) {
				console.error("Error fetching GitHub stats:", error);
				setLoading(false);
			}
		};

		if (isInView) {
			fetchGitHubStats();
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
		<section className="github-stats" ref={ref}>
			<div className="container">
				<motion.div
					className="stats-header"
					initial={{ opacity: 0, y: 30 }}
					animate={
						isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
					}
					transition={{ duration: 0.6 }}
				>
					<FaGithub className="stats-icon" />
					<h2>GitHub Statistics</h2>
				</motion.div>

				{loading ? (
					<div className="loading">
						<div className="loader"></div>
						<p>Loading GitHub stats...</p>
					</div>
				) : stats ? (
					<motion.div
						className="stats-grid"
						variants={containerVariants}
						initial="hidden"
						animate={isInView ? "visible" : "hidden"}
					>
						<motion.div
							className="stat-card"
							variants={itemVariants}
						>
							<div className="stat-value">
								{stats.publicRepos}
							</div>
							<div className="stat-label">
								Public Repositories
							</div>
						</motion.div>
						<motion.div
							className="stat-card"
							variants={itemVariants}
						>
							<div className="stat-value">{stats.totalStars}</div>
							<div className="stat-label">
								<FaStar /> Total Stars
							</div>
						</motion.div>
						<motion.div
							className="stat-card"
							variants={itemVariants}
						>
							<div className="stat-value">{stats.totalForks}</div>
							<div className="stat-label">
								<FaCodeBranch /> Total Forks
							</div>
						</motion.div>
						<motion.div
							className="stat-card"
							variants={itemVariants}
						>
							<div className="stat-value">{stats.followers}</div>
							<div className="stat-label">Followers</div>
						</motion.div>
						<motion.div
							className="stat-card"
							variants={itemVariants}
						>
							<div className="stat-value">
								{stats.totalCommits > 0
									? stats.totalCommits.toLocaleString()
									: "N/A"}
							</div>
							<div className="stat-label">Total Commits</div>
						</motion.div>
						<motion.div
							className="stat-card"
							variants={itemVariants}
						>
							<div className="stat-value">
								{stats.longestStreak > 0
									? `${stats.longestStreak} days`
									: "N/A"}
							</div>
							<div className="stat-label">Longest Streak</div>
						</motion.div>
					</motion.div>
				) : (
					<div className="error-message">
						<p>
							Unable to load GitHub stats. Please try again later.
						</p>
					</div>
				)}

				<motion.div
					className="github-link"
					initial={{ opacity: 0 }}
					animate={isInView ? { opacity: 1 } : { opacity: 0 }}
					transition={{ delay: 0.8 }}
				>
					<a
						href={`https://github.com/${username}`}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-secondary"
					>
						<FaGithub /> View GitHub Profile
					</a>
				</motion.div>
			</div>
		</section>
	);
};

export default GitHubStats;
