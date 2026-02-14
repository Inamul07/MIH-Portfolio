import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import portfolioData from "../data/portfolio";
import {
	FaReact,
	FaNodeJs,
	FaPython,
	FaJava,
	FaGitAlt,
	FaDocker,
	FaAws,
} from "react-icons/fa";
import {
	SiJavascript,
	SiTypescript,
	SiMongodb,
	SiPostgresql,
	SiExpress,
	SiRedis,
	SiKubernetes,
} from "react-icons/si";
import "./Skills.css";

const Skills = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const iconMap = {
		React: <FaReact className="skill-icon-color" />,
		"Node.js": <FaNodeJs className="skill-icon-color" />,
		JavaScript: <SiJavascript className="skill-icon-color" />,
		TypeScript: <SiTypescript className="skill-icon-color" />,
		Python: <FaPython className="skill-icon-color" />,
		Java: <FaJava className="skill-icon-color" />,
		MongoDB: <SiMongodb className="skill-icon-color" />,
		PostgreSQL: <SiPostgresql className="skill-icon-color" />,
		Express: <SiExpress className="skill-icon-color" />,
		Redis: <SiRedis className="skill-icon-color" />,
		Git: <FaGitAlt className="skill-icon-color" />,
		Docker: <FaDocker className="skill-icon-color" />,
		Kubernetes: <SiKubernetes className="skill-icon-color" />,
		AWS: <FaAws className="skill-icon-color" />,
	};

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
		<section className="skills" id="skills" ref={ref}>
			<div className="container">
				<motion.h2
					className="section-title"
					initial={{ opacity: 0, y: 30 }}
					animate={
						isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
					}
					transition={{ duration: 0.6 }}
				>
					Skills & Technologies
				</motion.h2>

				<motion.div
					className="skills-grid"
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					{portfolioData.skills.map((skill, index) => (
						<motion.div
							key={index}
							className="skill-card"
							variants={itemVariants}
						>
							<div className="skill-icon">
								{iconMap[skill.name] || "💻"}
							</div>
							<h3 className="skill-name">{skill.name}</h3>
							<div className="skill-bar">
								<motion.div
									className="skill-progress"
									initial={{ width: 0 }}
									animate={
										isInView
											? { width: `${skill.level}%` }
											: { width: 0 }
									}
									transition={{
										duration: 1,
										delay: index * 0.1,
									}}
								/>
							</div>
							<span className="skill-level">{skill.level}%</span>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Skills;
