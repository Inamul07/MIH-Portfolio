import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portfolioData from "../data/portfolio";
import "./Experience.css";

const Experience = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

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
		hidden: { y: 24, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
		},
	};

	return (
		<section className="experience section" id="experience" ref={ref}>
			<motion.div
				className="container"
				variants={containerVariants}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
			>
				<motion.div className="section-head" variants={itemVariants}>
					<h2 className="section-title">Experience</h2>
					<p className="section-lead">
						From building APIs as an intern to working inside
						PostgreSQL at Zoho.
					</p>
				</motion.div>

				<ol className="timeline">
					{portfolioData.experience.map((item) => {
						const isCurrent = /present/i.test(item.period);
						return (
							<motion.li
								key={`${item.title}-${item.period}`}
								className="timeline-item"
								variants={itemVariants}
							>
								<div className="timeline-meta">
									<span className="timeline-period">
										{item.period}
									</span>
									<span className="timeline-company">
										{item.company}
									</span>
									{isCurrent && (
										<span className="badge-coral">Current</span>
									)}
								</div>
								<div className="timeline-content">
									<h3>{item.title}</h3>
									<p className="timeline-description">
										{item.description}
									</p>
									{item.achievements?.length > 0 && (
										<ul className="timeline-achievements">
											{item.achievements.map(
												(achievement) => (
													<li key={achievement}>
														{achievement}
													</li>
												),
											)}
										</ul>
									)}
								</div>
							</motion.li>
						);
					})}
				</ol>
			</motion.div>
		</section>
	);
};

export default Experience;
