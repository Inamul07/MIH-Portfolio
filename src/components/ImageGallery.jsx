import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ImageGallery.css";

const ImageGallery = ({ images, initialIndex = 0, onClose }) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);
	const closeRef = useRef(null);

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "ArrowLeft") {
				setCurrentIndex((prev) =>
					prev === 0 ? images.length - 1 : prev - 1,
				);
			} else if (e.key === "ArrowRight") {
				setCurrentIndex((prev) =>
					prev === images.length - 1 ? 0 : prev + 1,
				);
			} else if (e.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [images.length, onClose]);

	// Prevent body scroll while open, and return focus to the trigger on close
	useEffect(() => {
		const trigger = document.activeElement;
		document.body.style.overflow = "hidden";
		closeRef.current?.focus();
		return () => {
			document.body.style.overflow = "";
			trigger?.focus?.();
		};
	}, []);

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<motion.div
			className="gallery-overlay"
			role="dialog"
			aria-modal="true"
			aria-label="Project screenshots"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.2, ease: "easeOut" }}
			// An onUpdate handler keeps framer-motion off WAAPI, whose opacity
			// animations flash their start value for one frame when they finish
			onUpdate={() => {}}
			onClick={handleBackdropClick}
		>
			<button
				ref={closeRef}
				type="button"
				className="gallery-btn gallery-close"
				onClick={onClose}
				aria-label="Close gallery"
			>
				<FaTimes aria-hidden="true" />
			</button>

			<div className="gallery-content" onClick={handleBackdropClick}>
				{images.length > 1 && (
					<button
						type="button"
						className="gallery-btn gallery-nav prev"
						onClick={handlePrev}
						aria-label="Previous image"
					>
						<FaChevronLeft aria-hidden="true" />
					</button>
				)}

				{/* initial={false}: the first image fades in with the backdrop */}
				<AnimatePresence mode="wait" initial={false}>
					<motion.img
						key={currentIndex}
						src={images[currentIndex]}
						alt={`Screenshot ${currentIndex + 1} of ${images.length}`}
						className="gallery-image"
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.98 }}
						transition={{ duration: 0.2 }}
						onUpdate={() => {}}
					/>
				</AnimatePresence>

				{images.length > 1 && (
					<button
						type="button"
						className="gallery-btn gallery-nav next"
						onClick={handleNext}
						aria-label="Next image"
					>
						<FaChevronRight aria-hidden="true" />
					</button>
				)}
			</div>

			{images.length > 1 && (
				<>
					<div className="gallery-counter" aria-live="polite">
						{currentIndex + 1} / {images.length}
					</div>
					<div className="gallery-thumbnails">
						{images.map((image, index) => (
							<button
								key={image}
								type="button"
								className={`thumbnail ${
									index === currentIndex ? "active" : ""
								}`}
								onClick={() => setCurrentIndex(index)}
								aria-label={`Show image ${index + 1}`}
								aria-current={index === currentIndex}
							>
								<img src={image} alt="" />
							</button>
						))}
					</div>
				</>
			)}
		</motion.div>
	);
};

export default ImageGallery;
