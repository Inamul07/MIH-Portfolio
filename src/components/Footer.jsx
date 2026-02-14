import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import portfolioData from "../data/portfolio";
import "./Footer.css";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-section">
					<h3>{portfolioData.personal.name}</h3>
					<p>{portfolioData.personal.tagline}</p>
				</div>

				<div className="footer-section">
					<h4>Quick Links</h4>
					<ul className="footer-links">
						<li>
							<a href="#home">Home</a>
						</li>
						<li>
							<a href="#about">About</a>
						</li>
						<li>
							<a href="#projects">Projects</a>
						</li>
						<li>
							<a href="#contact">Contact</a>
						</li>
					</ul>
				</div>

				<div className="footer-section">
					<h4>Connect</h4>
					<div className="footer-social">
						<a
							href={`https://github.com/${portfolioData.personal.github}`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<FaGithub />
						</a>
						<a
							href={portfolioData.personal.linkedin}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
						>
							<FaLinkedin />
						</a>
						<a
							href={`https://leetcode.com/${portfolioData.personal.leetcode}`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LeetCode"
						>
							<SiLeetcode />
						</a>
						<a
							href={`mailto:${portfolioData.personal.email}`}
							aria-label="Email"
						>
							<FaEnvelope />
						</a>
					</div>
				</div>
			</div>

			<div className="footer-bottom">
				<p>
					&copy; {currentYear} {portfolioData.personal.name}. Made
					with <FaHeart className="heart-icon" /> using React & Vite
				</p>
			</div>
		</footer>
	);
};

export default Footer;
