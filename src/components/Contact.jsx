import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

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
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
			},
		},
	};

	return (
		<section className="contact" id="contact" ref={ref}>
			<div className="container">
				<motion.h2
					className="section-title"
					initial={{ opacity: 0, y: 30 }}
					animate={
						isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
					}
					transition={{ duration: 0.6 }}
				>
					Get In Touch
				</motion.h2>

				<motion.div
					className="contact-content"
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
				>
					<motion.div
						className="contact-info-centered"
						variants={itemVariants}
					>
						<h3>Let's Connect!</h3>
						<p>
							I'm always open to discussing new projects, creative
							ideas, or opportunities to be part of your vision.
							Feel free to reach out!
						</p>
						<div className="contact-details">
							<div className="contact-detail">
								<FaEnvelope className="contact-icon" />
								<div>
									<h4>Email</h4>
									<a href="mailto:contact@example.com">
										contact@example.com
									</a>
								</div>
							</div>
							<div className="contact-detail">
								<FaMapMarkerAlt className="contact-icon" />
								<div>
									<h4>Location</h4>
									<p>Your City, Country</p>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Contact;
