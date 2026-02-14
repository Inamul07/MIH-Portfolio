import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Hero.css";

const Hero = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 100,
			},
		},
	};

	return (
		<section className="hero" id="home">
			<motion.div
				className="hero-content"
				variants={containerVariants}
				initial="hidden"
				animate="visible"
			>
				<motion.div className="hero-text" variants={itemVariants}>
					<h1>
						Hi, I'm <span className="gradient-text">John Doe</span>
					</h1>
					<h2 className="hero-subtitle">Software Developer</h2>
					<p className="hero-description">
						Crafting elegant solutions to complex problems.
						Passionate about building scalable web applications and
						exploring new technologies.
					</p>
				</motion.div>

				<motion.div className="hero-cta" variants={itemVariants}>
					<a href="#contact" className="btn btn-primary">
						Get In Touch
					</a>
					<a href="#projects" className="btn btn-secondary">
						View My Work
					</a>
				</motion.div>

				<motion.div className="hero-social" variants={itemVariants}>
					<a
						href="https://github.com/Inamul07"
						target="_blank"
						rel="noopener noreferrer"
						className="social-link"
						aria-label="GitHub"
					>
						<FaGithub />
					</a>
					<a
						href="https://linkedin.com"
						target="_blank"
						rel="noopener noreferrer"
						className="social-link"
						aria-label="LinkedIn"
					>
						<FaLinkedin />
					</a>
					<a
						href="mailto:contact@example.com"
						className="social-link"
						aria-label="Email"
					>
						<FaEnvelope />
					</a>
				</motion.div>
			</motion.div>

			<div className="hero-background">
				<div className="gradient-orb orb-1"></div>
				<div className="gradient-orb orb-2"></div>
				<div className="gradient-orb orb-3"></div>
			</div>
		</section>
	);
};

export default Hero;
