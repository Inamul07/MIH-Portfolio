import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaImages } from "react-icons/fa";
import portfolioData from "../data/portfolio";
import ImageGallery from "./ImageGallery";
import "./Projects.css";

const Projects = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [galleryData, setGalleryData] = useState(null);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 50, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
			},
		},
	};

	const openGallery = (images, startIndex = 0) => {
		setGalleryData({ images, startIndex });
	};

	const closeGallery = () => {
		setGalleryData(null);
	};

	return (
		<section className="projects" id="projects" ref={ref}>
			<div className="container">
				<motion.h2
					className="section-title"
					initial={{ opacity: 0, y: 30 }}
					animate={
						isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
					}
					transition={{ duration: 0.6 }}
				>
					Featured Projects
				</motion.h2>

				<motion.div
					className="projects-grid"
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					{portfolioData.projects.map((project, index) => {
						// Support both single image and multiple images
						const projectImages = Array.isArray(project.images)
							? project.images
							: [project.image];
						const hasMultipleImages = projectImages.length > 1;

						return (
							<motion.div
								key={index}
								className="project-card"
								variants={itemVariants}
							>
								<div className="project-image">
									{project.wip && (
										<div className="wip-badge">
											Work in Progress
										</div>
									)}
									{hasMultipleImages && (
										<div className="image-count-badge">
											<FaImages /> {projectImages.length}
										</div>
									)}
									<img
										src={projectImages[0]}
										alt={project.title}
										onClick={() =>
											openGallery(projectImages, 0)
										}
										style={{ cursor: "pointer" }}
									/>
									<div className="project-overlay">
										<button
											className="project-icon view-images-btn"
											onClick={() =>
												openGallery(projectImages, 0)
											}
										>
											<FaImages />{" "}
											{hasMultipleImages
												? `View All ${projectImages.length} Images`
												: "View Image"}
										</button>
										{project.github && (
											<a
												href={project.github}
												target="_blank"
												rel="noopener noreferrer"
												className="project-icon"
											>
												<FaGithub /> View Code
											</a>
										)}
										{project.demo && (
											<a
												href={project.demo}
												target="_blank"
												rel="noopener noreferrer"
												className="project-icon"
											>
												<FaExternalLinkAlt /> Live Demo
											</a>
										)}
									</div>
								</div>
								<div className="project-content">
									<h3>{project.title}</h3>
									<p>{project.description}</p>
									<div className="project-tech">
										{project.tech.map((tech, idx) => (
											<span
												key={idx}
												className="tech-tag"
											>
												{tech}
											</span>
										))}
									</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
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
