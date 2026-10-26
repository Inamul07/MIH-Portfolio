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

				// Fetch streak and commit data via proxy API
				let totalCommits = 0;
				let longestStreak = 0;

				try {
					// Use proxy API to avoid CORS (Vite proxy in dev, Vercel function in production)
					const streakResponse = await axios.get(
						`/api/github-streak?username=${username}`,
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
						"Streak stats unavailable:",
						streakError.message,
					);
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
		hidden: { y: 16, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
		},
	};

	const statItems = stats
		? [
				{ label: "Public Repositories", value: stats.publicRepos },
				{
					label: "Total Stars",
					value: stats.totalStars,
					icon: <FaStar aria-hidden="true" />,
				},
				{
					label: "Total Forks",
					value: stats.totalForks,
					icon: <FaCodeBranch aria-hidden="true" />,
				},
				{ label: "Followers", value: stats.followers },
				{
					label: "Total Commits",
					value:
						stats.totalCommits > 0
							? stats.totalCommits.toLocaleString()
							: "N/A",
				},
				{
					label: "Longest Streak",
					value:
						stats.longestStreak > 0
							? `${stats.longestStreak} days`
							: "N/A",
				},
			]
		: [];

	return (
		<motion.article
			className="stats-panel github-stats"
			ref={ref}
			initial={{ opacity: 0, y: 24 }}
			animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
			transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
		>
			<header className="stats-panel-header">
				<FaGithub className="stats-icon" aria-hidden="true" />
				<div>
					<h3>GitHub</h3>
					<p>@{username}</p>
				</div>
			</header>

			<div className="stats-panel-body" aria-live="polite">
				{loading ? (
					<div className="stats-loading">
						<div className="loader" aria-hidden="true"></div>
						<p>Loading GitHub stats…</p>
					</div>
				) : stats ? (
					<motion.dl
						className="stats-grid"
						variants={containerVariants}
						initial="hidden"
						animate="visible"
					>
						{statItems.map((item) => (
							<motion.div
								key={item.label}
								className="stat-item"
								variants={itemVariants}
							>
								<dt className="stat-label">
									{item.icon}
									{item.label}
								</dt>
								<dd className="stat-value">{item.value}</dd>
							</motion.div>
						))}
					</motion.dl>
				) : (
					<p className="stats-error">
						GitHub stats couldn’t be loaded right now. The full
						profile is one click away.
					</p>
				)}
			</div>

			<a
				href={`https://github.com/${username}`}
				target="_blank"
				rel="noopener noreferrer"
				className="btn btn-on-dark"
			>
				<FaGithub aria-hidden="true" /> View GitHub Profile
			</a>
		</motion.article>
	);
};

export default GitHubStats;
