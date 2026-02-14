import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import "./Footer.css";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer">
			<div className="footer-content">
				<div className="footer-section">
					<h3>John Doe</h3>
					<p>
						Software Developer passionate about building amazing web
						experiences.
					</p>
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
							href="https://github.com/Inamul07"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub"
						>
							<FaGithub />
						</a>
						<a
							href="https://linkedin.com"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LinkedIn"
						>
							<FaLinkedin />
						</a>
						<a
							href="https://leetcode.com/07_ajax"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="LeetCode"
						>
							<SiLeetcode />
						</a>
						<a href="mailto:contact@example.com" aria-label="Email">
							<FaEnvelope />
						</a>
					</div>
				</div>
			</div>

			<div className="footer-bottom">
				<p>
					&copy; {currentYear} John Doe. Made with{" "}
					<FaHeart className="heart-icon" /> using React & Vite
				</p>
			</div>
		</footer>
	);
};

export default Footer;
