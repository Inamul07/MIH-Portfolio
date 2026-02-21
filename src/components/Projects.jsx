import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
	FaGithub,
	FaExternalLinkAlt,
	FaImages,
	FaChevronDown,
	FaChevronUp,
} from "react-icons/fa";
import portfolioData from "../data/portfolio";
import ImageGallery from "./ImageGallery";
import "./Projects.css";

const Projects = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });
	const [galleryData, setGalleryData] = useState(null);
	const [showAll, setShowAll] = useState(false);

	const INITIAL_DISPLAY_COUNT = 6;
	const totalProjects = portfolioData.projects.length;
	const displayedProjects = showAll
		? portfolioData.projects
		: portfolioData.projects.slice(0, INITIAL_DISPLAY_COUNT);

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

				<div className="projects-grid">
					<AnimatePresence mode="sync">
						{displayedProjects.map((project, index) => {
							// Support both single image and multiple images
							const projectImages = Array.isArray(project.images)
								? project.images
								: [project.image];
							const hasMultipleImages = projectImages.length > 1;
							const isInitialProject =
								index < INITIAL_DISPLAY_COUNT;

							return (
								<motion.div
									key={project.title}
									className="project-card"
									initial={
										isInitialProject
											? { y: 50, opacity: 0 }
											: false
									}
									animate={
										isInitialProject && isInView
											? { y: 0, opacity: 1 }
											: { y: 0, opacity: 1 }
									}
									exit={{ y: 20, opacity: 0, scale: 0.95 }}
									transition={
										isInitialProject
											? {
													duration: 0.6,
													delay: index * 0.15,
												}
											: { duration: 0.3 }
									}
								>
									<div className="project-image">
										{project.wip && (
											<div className="wip-badge">
												Work in Progress
											</div>
										)}
										{hasMultipleImages && (
											<div className="image-count-badge">
												<FaImages />{" "}
												{projectImages.length}
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
													openGallery(
														projectImages,
														0,
													)
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
													<FaExternalLinkAlt /> Live
													Demo
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
					</AnimatePresence>
				</div>

				{totalProjects > INITIAL_DISPLAY_COUNT && (
					<motion.div
						className="show-more-container"
						initial={{ opacity: 0, y: 20 }}
						animate={
							isInView
								? { opacity: 1, y: 0 }
								: { opacity: 0, y: 20 }
						}
						transition={{ duration: 0.6, delay: 1.0 }}
					>
						<button
							className="btn btn-secondary show-more-btn"
							onClick={() => setShowAll(!showAll)}
						>
							{showAll ? (
								<>
									<FaChevronUp /> Show Less
								</>
							) : (
								<>
									<FaChevronDown /> Show More (
									{totalProjects - INITIAL_DISPLAY_COUNT}{" "}
									more)
								</>
							)}
						</button>
					</motion.div>
				)}
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
