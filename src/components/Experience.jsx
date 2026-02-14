import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
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
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { x: -50, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
			},
		},
	};

	return (
		<section className="experience" id="experience" ref={ref}>
			<div className="container">
				<motion.h2
					className="section-title"
					initial={{ opacity: 0, y: 30 }}
					animate={
						isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
					}
					transition={{ duration: 0.6 }}
				>
					Experience & Education
				</motion.h2>

				<motion.div
					className="timeline"
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					{portfolioData.experience.map((item, index) => (
						<motion.div
							key={index}
							className="timeline-item"
							variants={itemVariants}
						>
							<div className="timeline-icon">
								{item.type === "work" ? (
									<FaBriefcase />
								) : (
									<FaGraduationCap />
								)}
							</div>
							<div className="timeline-content">
								<span className="timeline-date">
									{item.period}
								</span>
								<h3>{item.title}</h3>
								<h4>{item.company}</h4>
								<p>{item.description}</p>
								{item.achievements && (
									<ul className="achievements">
										{item.achievements.map(
											(achievement, idx) => (
												<li key={idx}>{achievement}</li>
											),
										)}
									</ul>
								)}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Experience;
