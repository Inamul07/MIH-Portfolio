import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portfolioData from "../data/portfolio";
import {
	FaJava,
	FaPython,
	FaReact,
	FaGitAlt,
	FaDocker,
	FaDatabase,
} from "react-icons/fa";
import {
	SiC,
	SiPostgresql,
	SiSpringboot,
	SiJavascript,
	SiFirebase,
	SiFlask,
	SiFastapi,
	SiMongodb,
} from "react-icons/si";
import "./About.css";

const About = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const iconMap = {
		C: <SiC />,
		Java: <FaJava />,
		Python: <FaPython />,
		PostgreSQL: <SiPostgresql />,
		React: <FaReact />,
		"Spring Boot": <SiSpringboot />,
		JavaScript: <SiJavascript />,
		Firebase: <SiFirebase />,
		Flask: <SiFlask />,
		FastAPI: <SiFastapi />,
		MongoDB: <SiMongodb />,
		Git: <FaGitAlt />,
		Docker: <FaDocker />,
		SQL: <FaDatabase />,
	};

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

					<div className="skills-section">
						<h3>Skills & Technologies</h3>
						<div className="skills-tags">
							{portfolioData.skills.map((skill, index) => (
								<span key={index} className="skill-tag">
									<span className="skill-icon">
										{iconMap[skill.name] || "💻"}
									</span>
									{skill.name}
								</span>
							))}
						</div>
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default About;
