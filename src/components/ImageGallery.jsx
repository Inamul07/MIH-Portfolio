import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ImageGallery.css";

const ImageGallery = ({ images, initialIndex = 0, onClose }) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "ArrowLeft") {
				handlePrev();
			} else if (e.key === "ArrowRight") {
				handleNext();
			} else if (e.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [currentIndex, images.length]);

	// Prevent body scroll when modal is open
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);

	const handlePrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<motion.div
			className="gallery-overlay"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={handleBackdropClick}
		>
			<button className="gallery-close" onClick={onClose}>
				<FaTimes />
			</button>

			<div className="gallery-content">
				{images.length > 1 && (
					<button className="gallery-nav prev" onClick={handlePrev}>
						<FaChevronLeft />
					</button>
				)}

				<AnimatePresence mode="wait">
					<motion.img
						key={currentIndex}
						src={images[currentIndex]}
						alt={`Gallery image ${currentIndex + 1}`}
						className="gallery-image"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.3 }}
					/>
				</AnimatePresence>

				{images.length > 1 && (
					<button className="gallery-nav next" onClick={handleNext}>
						<FaChevronRight />
					</button>
				)}
			</div>

			{images.length > 1 && (
				<div className="gallery-counter">
					{currentIndex + 1} / {images.length}
				</div>
			)}

			{images.length > 1 && (
				<div className="gallery-thumbnails">
					{images.map((image, index) => (
						<div
							key={index}
							className={`thumbnail ${
								index === currentIndex ? "active" : ""
							}`}
							onClick={() => setCurrentIndex(index)}
						>
							<img src={image} alt={`Thumbnail ${index + 1}`} />
						</div>
					))}
				</div>
			)}
		</motion.div>
	);
};

export default ImageGallery;
