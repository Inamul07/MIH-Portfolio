import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import portfolioData from "../data/portfolio";
import personImage from "../assets/Portfolio.png";
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

	const imageVariants = {
		hidden: { x: 50, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				stiffness: 80,
				delay: 0.5,
			},
		},
	};

	return (
		<section className="hero" id="home">
			<div className="hero-container">
				<motion.div
					className="hero-content"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.div className="hero-text" variants={itemVariants}>
						<h1>
							Hi, I'm{" "}
							<span className="gradient-text">
								{portfolioData.personal.name}
							</span>
						</h1>
						<h2 className="hero-subtitle">
							{portfolioData.personal.role}
						</h2>
						<p className="hero-description">
							Building digital universes and exploring the
							horizons of code, one line at a time.
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
							href={`https://github.com/${portfolioData.personal.github}`}
							target="_blank"
							rel="noopener noreferrer"
							className="social-link"
							aria-label="GitHub"
						>
							<FaGithub />
						</a>
						<a
							href={portfolioData.personal.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							className="social-link"
							aria-label="LinkedIn"
						>
							<FaLinkedin />
						</a>
						<a
							href={`mailto:${portfolioData.personal.email}`}
							className="social-link"
							aria-label="Email"
						>
							<FaEnvelope />
						</a>
					</motion.div>
				</motion.div>

				<motion.div
					className="hero-image"
					variants={imageVariants}
					initial="hidden"
					animate="visible"
				>
					<img src={personImage} alt={portfolioData.personal.name} />
				</motion.div>
			</div>

			<div className="hero-background">
				<div className="gradient-orb orb-1"></div>
				<div className="gradient-orb orb-2"></div>
				<div className="gradient-orb orb-3"></div>
			</div>
		</section>
	);
};

export default Hero;
