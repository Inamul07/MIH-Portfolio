import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portfolioData from "../data/portfolio";
import "./About.css";

const About = () => {
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
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
			},
		},
	};

	return (
		<section className="about" id="about" ref={ref}>
			<motion.div
				className="container"
				variants={containerVariants}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={itemVariants}>
					About Me
				</motion.h2>

				<motion.div className="about-content" variants={itemVariants}>
					<div className="about-text">
						{portfolioData.about.description.map(
							(paragraph, index) => (
								<p key={index}>{paragraph}</p>
							),
						)}
					</div>

					<div className="highlights">
						{portfolioData.about.highlights.map(
							(highlight, index) => (
								<div key={index} className="highlight-card">
									<div className="highlight-icon">
										{highlight.icon}
									</div>
									<h3>{highlight.title}</h3>
									<p>{highlight.description}</p>
								</div>
							),
						)}
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default About;
