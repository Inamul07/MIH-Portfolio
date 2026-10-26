import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaImages } from "react-icons/fa";
import portfolioData from "../data/portfolio";
import ImageGallery from "./ImageGallery";
import "./Projects.css";

// Support both single image and multiple images; drop missing ones
const getImages = (project) =>
	(Array.isArray(project.images) ? project.images : [project.image]).filter(
		Boolean,
	);

const ProjectMedia = ({ project, images, onOpen, eager }) => {
	if (images.length === 0) {
		return (
			<div className="project-media project-media-empty">
				<span className="project-media-title" aria-hidden="true">
					{project.title}
				</span>
				{project.wip && (
					<span className="badge-coral project-badge">In Progress</span>
				)}
			</div>
		);
	}

	const label =
		images.length > 1
			? `View all ${images.length} screenshots of ${project.title}`
			: `View screenshot of ${project.title}`;

	return (
		<button
			type="button"
			className="project-media"
			onClick={() => onOpen(images)}
			aria-label={label}
		>
			<img
				src={images[0]}
				alt=""
				width="800"
				height="500"
				loading={eager ? "eager" : "lazy"}
				decoding="async"
			/>
			{project.wip && (
				<span className="badge-coral project-badge">In Progress</span>
			)}
			{images.length > 1 && (
				<span className="badge-pill image-count">
					<FaImages aria-hidden="true" /> {images.length}
				</span>
			)}
		</button>
	);
};

const ProjectLinks = ({ project }) => (
	<div className="project-links">
		{project.github && (
			<a
				href={project.github}
				target="_blank"
				rel="noopener noreferrer"
				className="text-link"
			>
				<FaGithub aria-hidden="true" /> View Code
			</a>
		)}
		{project.demo && (
			<a
				href={project.demo}
				target="_blank"
				rel="noopener noreferrer"
				className="text-link"
			>
				<FaExternalLinkAlt aria-hidden="true" /> Live Demo
			</a>
		)}
	</div>
);

const ProjectTech = ({ tech }) => (
	<ul className="project-tech" aria-label="Technologies">
		{tech.map((item) => (
			<li key={item} className="badge-pill">
				{item}
			</li>
		))}
	</ul>
);

const Projects = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [galleryData, setGalleryData] = useState(null);

	const featured = portfolioData.projects.filter((p) => p.featured);
	const rest = portfolioData.projects.filter((p) => !p.featured);

	// Widen cards so a 3-column grid never ends on a lone card:
	// remainder 1 → first two and last two wide (7 = 2 + 3 + 2),
	// remainder 2 → last two wide (8 = 3 + 3 + 2)
	const remainder = rest.length % 3;
	const isWide = (index) =>
		(remainder === 1 && (index < 2 || index >= rest.length - 2)) ||
		(remainder === 2 && index >= rest.length - 2);

	const openGallery = (images, startIndex = 0) => {
		setGalleryData({ images, startIndex });
	};

	const closeGallery = () => {
		setGalleryData(null);
	};

	const reveal = (delay = 0) => ({
		initial: { y: 32, opacity: 0 },
		animate: isInView ? { y: 0, opacity: 1 } : { y: 32, opacity: 0 },
		transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
	});

	return (
		<section className="projects section" id="projects" ref={ref}>
			<div className="container">
				<motion.div className="section-head" {...reveal()}>
					<h2 className="section-title">Featured Projects</h2>
					<p className="section-lead">
						{portfolioData.projects.length} projects — from a
						cross-platform habit tracker and a Hacker News reader to
						Android, web and machine learning apps.
					</p>
				</motion.div>

				{featured.map((project, index) => (
					<motion.article
						key={project.title}
						className={`project-featured ${index % 2 ? "reverse" : ""}`}
						{...reveal(0.08 + index * 0.08)}
					>
						<ProjectMedia
							project={project}
							images={getImages(project)}
							onOpen={openGallery}
							eager={index === 0}
						/>
						<div className="project-featured-content">
							<span className="badge-coral">Featured</span>
							<h3>{project.title}</h3>
							<p>{project.description}</p>
							<ProjectTech tech={project.tech} />
							<ProjectLinks project={project} />
						</div>
					</motion.article>
				))}

				<ul className="projects-grid">
					{rest.map((project, index) => (
						<motion.li
							key={project.title}
							className={`project-card ${isWide(index) ? "wide" : ""}`}
							{...reveal(0.12 + (index % 3) * 0.08)}
						>
							<ProjectMedia
								project={project}
								images={getImages(project)}
								onOpen={openGallery}
							/>
							<div className="project-content">
								<h3>{project.title}</h3>
								<p>{project.description}</p>
								<ProjectTech tech={project.tech} />
								<ProjectLinks project={project} />
							</div>
						</motion.li>
					))}
				</ul>
			</div>

			<AnimatePresence>
				{galleryData && (
					<ImageGallery
						images={galleryData.images}
						initialIndex={galleryData.startIndex}
						onClose={closeGallery}
					/>
				)}
			</AnimatePresence>
		</section>
	);
};

export default Projects;
