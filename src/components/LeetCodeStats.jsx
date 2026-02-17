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
			// Check cache first (valid for 1 hour)
			const cacheKey = `leetcode_stats_${username}`;
			const cachedData = localStorage.getItem(cacheKey);
			const cacheTime = localStorage.getItem(`${cacheKey}_time`);

			if (cachedData && cacheTime) {
				const age = Date.now() - parseInt(cacheTime);
				// Use cache if less than 1 hour old
				if (age < 3600000) {
					setStats(JSON.parse(cachedData));
					setLoading(false);
					return;
				}
			}

			// Try multiple API endpoints (faster one first)
			const apiEndpoints = [
				`https://leetcode-api-faisalshohag.vercel.app/${username}`,
				`https://leetcode-stats-api.herokuapp.com/${username}`,
			];

			for (const endpoint of apiEndpoints) {
				try {
					const response = await axios.get(endpoint, {
						timeout: 5000,
						headers: {
							Accept: "application/json",
						},
					});

					const data = response.data;
					console.log("LeetCode API Response from", endpoint, ":", data); // Debug log

					// Parse the response based on API structure
					let easySolved = 0;
					let mediumSolved = 0;
					let hardSolved = 0;
					let acceptanceRate = 0;

					// Get easy/medium/hard breakdown
					if (data.easySolved !== undefined) {
						easySolved = data.easySolved || 0;
						mediumSolved = data.mediumSolved || 0;
						hardSolved = data.hardSolved || 0;
					} else if (data.matchedUserStats?.acSubmissionNum) {
						// Parse from acSubmissionNum array
						const acStats = data.matchedUserStats.acSubmissionNum;
						easySolved =
							acStats.find((s) => s.difficulty === "Easy")
								?.count || 0;
						mediumSolved =
							acStats.find((s) => s.difficulty === "Medium")
								?.count || 0;
						hardSolved =
							acStats.find((s) => s.difficulty === "Hard")
								?.count || 0;
					} else if (data.submitStats?.acSubmissionNum) {
						// Fallback for other API format
						const acStats = data.submitStats.acSubmissionNum;
						easySolved =
							acStats.find((s) => s.difficulty === "Easy")
								?.count || 0;
						mediumSolved =
							acStats.find((s) => s.difficulty === "Medium")
								?.count || 0;
						hardSolved =
							acStats.find((s) => s.difficulty === "Hard")
								?.count || 0;
					}

					// Get acceptance rate
					if (data.acceptanceRate !== undefined && data.acceptanceRate !== null) {
						// Direct acceptance rate from API
						const rate = parseFloat(data.acceptanceRate);
						acceptanceRate = isNaN(rate) ? 0 : rate.toFixed(1);
					} else if (data.matchedUserStats?.acSubmissionNum && data.matchedUserStats?.totalSubmissionNum) {
						// Calculate from matchedUserStats (accepted submissions / total submissions)
						const totalAccepted =
							data.matchedUserStats.acSubmissionNum.find(
								(s) => s.difficulty === "All",
							)?.submissions || 0;
						const totalSubmissions =
							data.matchedUserStats.totalSubmissionNum.find(
								(s) => s.difficulty === "All",
							)?.submissions || 0;
						acceptanceRate = totalSubmissions > 0 ? ((totalAccepted / totalSubmissions) * 100).toFixed(1) : 0;
					} else if (data.submitStats?.acSubmissionNum && data.submitStats?.totalSubmissionNum) {
						// Fallback for other API format
						const totalAc =
							data.submitStats.acSubmissionNum.find(
								(s) => s.difficulty === "All",
							)?.count || 0;
						const totalSub =
							data.submitStats.totalSubmissionNum.find(
								(s) => s.difficulty === "All",
							)?.count || 0;
						acceptanceRate = totalSub > 0 ? ((totalAc / totalSub) * 100).toFixed(1) : 0;
					}

					const leetcodeStats = {
						totalSolved:
							data.totalSolved || data.solvedProblem || 0,
						easySolved: easySolved,
						mediumSolved: mediumSolved,
						hardSolved: hardSolved,
						ranking: data.ranking || 0,
						acceptanceRate: acceptanceRate,
					};

					console.log("Parsed LeetCode Stats:", leetcodeStats); // Debug log

					setStats(leetcodeStats);
					// Cache the successful response
					localStorage.setItem(
						cacheKey,
						JSON.stringify(leetcodeStats),
					);
					localStorage.setItem(
						`${cacheKey}_time`,
						Date.now().toString(),
					);
					setLoading(false);
					return; // Success, exit the loop
				} catch (error) {
					console.warn(
						`Failed to fetch from ${endpoint}:`,
						error.message,
					);
					continue; // Try next endpoint
				}
			}

			// All APIs failed
			console.error("All LeetCode API endpoints failed");

			// If we have old cached data, use it even if expired
			if (cachedData) {
				setStats(JSON.parse(cachedData));
			} else {
				// Fallback to placeholder data
				setStats({
					totalSolved: 0,
					easySolved: 0,
					mediumSolved: 0,
					hardSolved: 0,
					ranking: 0,
					acceptanceRate: 0,
				});
			}
			setLoading(false);
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
							<div className="stat-value">
								{stats.totalSolved}
							</div>
							<div className="stat-label">Total Solved</div>
						</motion.div>
						<motion.div
							className="stat-card easy"
							variants={itemVariants}
						>
							<div className="stat-value">{stats.easySolved}</div>
							<div className="stat-label">Easy Problems</div>
							<div className="difficulty-badge easy-badge">
								Easy
							</div>
						</motion.div>
						<motion.div
							className="stat-card medium"
							variants={itemVariants}
						>
							<div className="stat-value">
								{stats.mediumSolved}
							</div>
							<div className="stat-label">Medium Problems</div>
							<div className="difficulty-badge medium-badge">
								Medium
							</div>
						</motion.div>
						<motion.div
							className="stat-card hard"
							variants={itemVariants}
						>
							<div className="stat-value">{stats.hardSolved}</div>
							<div className="stat-label">Hard Problems</div>
							<div className="difficulty-badge hard-badge">
								Hard
							</div>
						</motion.div>
						<motion.div
							className="stat-card ranking"
							variants={itemVariants}
						>
							<div className="stat-value">
								{stats.ranking > 0
									? stats.ranking.toLocaleString()
									: "N/A"}
							</div>
							<div className="stat-label">Global Ranking</div>
						</motion.div>
						<motion.div
							className="stat-card acceptance"
							variants={itemVariants}
						>
							<div className="stat-value">
								{stats.acceptanceRate}%
							</div>
							<div className="stat-label">Acceptance Rate</div>
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
