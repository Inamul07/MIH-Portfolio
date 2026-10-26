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
	FaCode,
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

const iconMap = {
	C: SiC,
	Java: FaJava,
	Python: FaPython,
	PostgreSQL: SiPostgresql,
	React: FaReact,
	"Spring Boot": SiSpringboot,
	JavaScript: SiJavascript,
	Firebase: SiFirebase,
	Flask: SiFlask,
	FastAPI: SiFastapi,
	MongoDB: SiMongodb,
	Git: FaGitAlt,
	Docker: FaDocker,
	SQL: FaDatabase,
};

const About = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [lead, ...paragraphs] = portfolioData.about.description;

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08,
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
		<section className="about section" id="about" ref={ref}>
			<motion.div
				className="container about-grid"
				variants={containerVariants}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
			>
				<div className="about-text">
					<motion.h2 className="section-title" variants={itemVariants}>
						About Me
					</motion.h2>
					<motion.p className="about-lead" variants={itemVariants}>
						{lead}
					</motion.p>
					{paragraphs.map((paragraph) => (
						<motion.p key={paragraph} variants={itemVariants}>
							{paragraph}
						</motion.p>
					))}
				</div>

				<motion.div className="skills-card" variants={itemVariants}>
					<h3>Skills & Technologies</h3>
					<ul className="skills-tags">
						{portfolioData.skills.map((skill) => {
							const Icon = iconMap[skill.name] || FaCode;
							return (
								<li key={skill.name} className="badge-pill">
									<Icon aria-hidden="true" />
									{skill.name}
								</li>
							);
						})}
					</ul>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default About;
