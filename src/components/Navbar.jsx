import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import portfolioData from "../data/portfolio";
import "./Navbar.css";

const navLinks = [
	{ name: "About", href: "#about" },
	{ name: "Projects", href: "#projects" },
	{ name: "Experience", href: "#experience" },
	{ name: "Stats", href: "#stats" },
	{ name: "Contact", href: "#contact" },
];

const getInitialTheme = () => {
	const saved = document.documentElement.dataset.theme;
	if (saved === "light" || saved === "dark") return saved;
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [theme, setTheme] = useState(getInitialTheme);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 8);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Lock page scroll and allow Escape while the mobile sheet is open
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e) => {
			if (e.key === "Escape") setIsOpen(false);
		};

		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);

	const toggleTheme = () => {
		const next = theme === "dark" ? "light" : "dark";
		document.documentElement.dataset.theme = next;
		try {
			localStorage.setItem("theme", next);
		} catch {
			/* storage unavailable: the choice lasts for this visit */
		}
		setTheme(next);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	const themeLabel =
		theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

	return (
		<nav
			className={`navbar ${scrolled ? "scrolled" : ""}`}
			aria-label="Primary"
		>
			<div className="nav-container container">
				<a
					href="#home"
					className="nav-logo"
					onClick={closeMenu}
					aria-label={`${portfolioData.personal.name}, back to top`}
				>
					{portfolioData.personal.shorthand}
					<span className="nav-logo-dot" aria-hidden="true">
						.
					</span>
				</a>

				<ul className="nav-links">
					{navLinks.map((link) => (
						<li key={link.href}>
							<a href={link.href}>{link.name}</a>
						</li>
					))}
				</ul>

				<div className="nav-actions">
					<button
						type="button"
						className="icon-btn"
						onClick={toggleTheme}
						aria-label={themeLabel}
						title={themeLabel}
					>
						{theme === "dark" ? (
							<FaSun aria-hidden="true" />
						) : (
							<FaMoon aria-hidden="true" />
						)}
					</button>
					<a
						href={portfolioData.personal.resume}
						target="_blank"
						rel="noopener noreferrer"
						className="btn btn-primary nav-resume"
					>
						Resume
					</a>
					<button
						type="button"
						className="icon-btn nav-menu-btn"
						onClick={() => setIsOpen(!isOpen)}
						aria-expanded={isOpen}
						aria-controls="mobile-menu"
						aria-label={isOpen ? "Close menu" : "Open menu"}
					>
						{isOpen ? (
							<FaTimes aria-hidden="true" />
						) : (
							<FaBars aria-hidden="true" />
						)}
					</button>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						id="mobile-menu"
						className="mobile-menu"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						// Avoids a one-frame flash; see ImageGallery
						onUpdate={() => {}}
					>
						<ul className="mobile-nav-links">
							{navLinks.map((link, index) => (
								<motion.li
									key={link.href}
									initial={{ opacity: 0, y: 16 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.05 + index * 0.05 }}
								>
									<a href={link.href} onClick={closeMenu}>
										{link.name}
									</a>
								</motion.li>
							))}
						</ul>
						<a
							href={portfolioData.personal.resume}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-primary mobile-resume"
							onClick={closeMenu}
						>
							View Resume
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
};

export default Navbar;
