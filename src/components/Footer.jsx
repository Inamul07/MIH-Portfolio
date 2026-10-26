import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import portfolioData from "../data/portfolio";
import "./Footer.css";

const { personal } = portfolioData;

const quickLinks = [
	{ name: "Home", href: "#home" },
	{ name: "About", href: "#about" },
	{ name: "Projects", href: "#projects" },
	{ name: "Experience", href: "#experience" },
	{ name: "Stats", href: "#stats" },
	{ name: "Contact", href: "#contact" },
];

const connectLinks = [
	{
		name: "GitHub",
		href: `https://github.com/${personal.github}`,
		icon: FaGithub,
	},
	{ name: "LinkedIn", href: personal.linkedin, icon: FaLinkedin },
	{
		name: "LeetCode",
		href: `https://leetcode.com/${personal.leetcode}`,
		icon: SiLeetcode,
	},
	{ name: "Email", href: `mailto:${personal.email}`, icon: FaEnvelope },
];

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-content">
					<div className="footer-brand">
						<p className="footer-name">{personal.name}</p>
						<p className="footer-tagline">{personal.tagline}</p>
					</div>

					<nav className="footer-section" aria-label="Footer">
						<h2>Quick Links</h2>
						<ul className="footer-links">
							{quickLinks.map((link) => (
								<li key={link.href}>
									<a href={link.href}>{link.name}</a>
								</li>
							))}
						</ul>
					</nav>

					<div className="footer-section">
						<h2>Connect</h2>
						<ul className="footer-links">
							{connectLinks.map(({ name, href, icon: Icon }) => (
								<li key={name}>
									<a
										href={href}
										{...(href.startsWith("http") && {
											target: "_blank",
											rel: "noopener noreferrer",
										})}
									>
										<Icon aria-hidden="true" /> {name}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="footer-bottom">
					<p>
						© {currentYear} {personal.name}
					</p>
					<p>Made with React & Vite</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
