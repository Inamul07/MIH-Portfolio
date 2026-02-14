import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = () => {
		setIsOpen(false);
	};

	const navLinks = [
		{ name: "Home", href: "#home" },
		{ name: "About", href: "#about" },
		{ name: "Projects", href: "#projects" },
		{ name: "Experience", href: "#experience" },
		{ name: "Contact", href: "#contact" },
	];

	return (
		<motion.nav
			className={`navbar ${scrolled ? "scrolled" : ""}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className="nav-container">
				<a href="#home" className="nav-logo" onClick={closeMenu}>
					<span className="logo-text">JD</span>
				</a>

				<div className="nav-menu-icon" onClick={toggleMenu}>
					{isOpen ? <FaTimes /> : <FaBars />}
				</div>

				<ul className={`nav-links ${isOpen ? "active" : ""}`}>
					{navLinks.map((link, index) => (
						<motion.li
							key={index}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}
						>
							<a href={link.href} onClick={closeMenu}>
								{link.name}
							</a>
						</motion.li>
					))}
				</ul>

				<AnimatePresence>
					{isOpen && (
						<motion.div
							className="mobile-menu"
							initial={{ opacity: 0, x: "100%" }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: "100%" }}
							transition={{ type: "tween" }}
						>
							<ul className="mobile-nav-links">
								{navLinks.map((link, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0, x: 50 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
									>
										<a href={link.href} onClick={closeMenu}>
											{link.name}
										</a>
									</motion.li>
								))}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.nav>
	);
};

export default Navbar;
