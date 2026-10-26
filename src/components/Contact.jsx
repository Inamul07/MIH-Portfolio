import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
	FaEnvelope,
	FaMapMarkerAlt,
	FaLinkedin,
	FaFileAlt,
} from "react-icons/fa";
import portfolioData from "../data/portfolio";
import "./Contact.css";

const { personal } = portfolioData;

const Contact = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const containerVariants = {
		hidden: { opacity: 0, y: 24 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.6,
				ease: [0.22, 1, 0.36, 1],
				staggerChildren: 0.08,
				delayChildren: 0.15,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 16, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
		},
	};

	return (
		<section className="contact section" id="contact" ref={ref}>
			<div className="container">
				<motion.div
					className="contact-band"
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					<div className="contact-main">
						<motion.h2 variants={itemVariants}>Let’s Connect</motion.h2>
						<motion.p variants={itemVariants}>
							I’m always open to discussing new projects, creative
							ideas, or opportunities to be part of your vision.
							Feel free to reach out!
						</motion.p>
						<motion.div
							className="contact-actions"
							variants={itemVariants}
						>
							<a
								href={`mailto:${personal.email}`}
								className="btn btn-cream"
							>
								<FaEnvelope aria-hidden="true" /> Send an Email
							</a>
							<a
								href={personal.resume}
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-outline-on-coral"
							>
								<FaFileAlt aria-hidden="true" /> View Resume
							</a>
						</motion.div>
					</div>

					<motion.dl className="contact-details" variants={itemVariants}>
						<div className="contact-detail">
							<dt>
								<FaEnvelope aria-hidden="true" /> Email
							</dt>
							<dd>
								<a href={`mailto:${personal.email}`}>
									{personal.email}
								</a>
							</dd>
						</div>
						<div className="contact-detail">
							<dt>
								<FaLinkedin aria-hidden="true" /> LinkedIn
							</dt>
							<dd>
								<a
									href={personal.linkedin}
									target="_blank"
									rel="noopener noreferrer"
								>
									{personal.linkedin
										.replace(/^https?:\/\/(www\.)?/, "")
										.replace(/\/$/, "")}
								</a>
							</dd>
						</div>
						<div className="contact-detail">
							<dt>
								<FaMapMarkerAlt aria-hidden="true" /> Location
							</dt>
							<dd>{personal.location}</dd>
						</div>
					</motion.dl>
				</motion.div>
			</div>
		</section>
	);
};

export default Contact;
