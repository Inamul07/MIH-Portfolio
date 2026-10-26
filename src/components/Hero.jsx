import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
	FaGithub,
	FaLinkedin,
	FaEnvelope,
	FaArrowDown,
	FaMapMarkerAlt,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import portfolioData from "../data/portfolio";
import "./Hero.css";

const { personal, experience, skills } = portfolioData;
const current = experience[0];

// Minimal SQL highlighter: keywords, strings and punctuation
const SQL_KEYWORDS = new Set([
	"SELECT",
	"FROM",
	"WHERE",
	"ORDER",
	"BY",
	"DESC",
	"AS",
	"array_agg",
]);
const highlightSql = (sql) =>
	sql.split(/('[^']*'|\b[A-Za-z_]+\b)/g).map((part, i) => {
		if (!part) return null;
		if (part.startsWith("'"))
			return (
				<span key={i} className="tok-string">
					{part}
				</span>
			);
		if (SQL_KEYWORDS.has(part))
			return (
				<span key={i} className="tok-keyword">
					{part}
				</span>
			);
		return part;
	});

const tabs = [
	{
		id: "whoami",
		file: "whoami.sql",
		query: `SELECT name, role, company, location, roles\nFROM   engineers\nWHERE  handle = '${personal.github}';`,
		rowCount: 1,
		render: () => (
			<dl className="psql-record">
				<div className="psql-record-head">-[ RECORD 1 ]</div>
				{[
					["name", personal.name],
					["role", current.title],
					["company", current.company],
					["location", personal.location],
					["roles", `{${personal.roles.join(", ")}}`],
				].map(([key, value]) => (
					<div className="psql-row" key={key}>
						<dt>{key}</dt>
						<dd>{value}</dd>
					</div>
				))}
			</dl>
		),
	},
	{
		id: "experience",
		file: "experience.sql",
		query: "SELECT title, company, period\nFROM   experience\nORDER  BY started DESC;",
		rowCount: experience.length,
		render: () => (
			<div className="psql-table-wrap">
				<table className="psql-table">
					<thead>
						<tr>
							<th scope="col">title</th>
							<th scope="col">company</th>
							<th scope="col">period</th>
						</tr>
					</thead>
					<tbody>
						{experience.map((item) => (
							<tr key={item.title}>
								<td>{item.title}</td>
								<td>{item.company}</td>
								<td>{item.period}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		),
	},
	{
		id: "stack",
		file: "stack.sql",
		query: "SELECT array_agg(name) AS stack\nFROM   skills;",
		rowCount: 1,
		render: () => (
			<div className="psql-array">
				<span className="psql-array-head">stack</span>
				<p>
					{"{"}
					{skills.map((skill, i) => (
						<span key={skill.name}>
							<span className="tok-string">{skill.name}</span>
							{i < skills.length - 1 ? ", " : ""}
						</span>
					))}
					{"}"}
				</p>
			</div>
		),
	},
];

const CodeWindow = () => {
	const [active, setActive] = useState(0);
	const tabRefs = useRef([]);
	const tab = tabs[active];

	// Arrow keys move between tabs (WAI-ARIA tabs pattern)
	const handleKeyDown = (e) => {
		const last = tabs.length - 1;
		let next = null;
		if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
		if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
		if (e.key === "Home") next = 0;
		if (e.key === "End") next = last;
		if (next === null) return;
		e.preventDefault();
		setActive(next);
		tabRefs.current[next]?.focus();
	};

	return (
		<div className="code-window" data-ui>
			<div className="code-window-bar">
				<span className="window-dots" aria-hidden="true">
					<span />
					<span />
					<span />
				</span>
				<div
					className="code-tabs"
					role="tablist"
					aria-label="Query files"
					onKeyDown={handleKeyDown}
				>
					{tabs.map((t, i) => (
						<button
							key={t.id}
							ref={(el) => (tabRefs.current[i] = el)}
							type="button"
							role="tab"
							id={`tab-${t.id}`}
							aria-selected={i === active}
							aria-controls={`panel-${t.id}`}
							tabIndex={i === active ? 0 : -1}
							className={`code-tab ${i === active ? "active" : ""}`}
							onClick={() => setActive(i)}
						>
							{t.file}
						</button>
					))}
				</div>
			</div>

			<div
				className="code-window-body"
				role="tabpanel"
				id={`panel-${tab.id}`}
				aria-labelledby={`tab-${tab.id}`}
			>
				<pre className="code-query">
					<code>
						<span className="tok-prompt" aria-hidden="true">
							inamul=#{" "}
						</span>
						{highlightSql(tab.query)}
					</code>
				</pre>
				<motion.div
					key={tab.id}
					className="code-result"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.25 }}
				>
					{tab.render()}
				</motion.div>
			</div>

			<div className="code-window-status">
				<span className="status-dot" aria-hidden="true" />
				<span>postgres · connected</span>
				<span className="status-rows">
					({tab.rowCount} {tab.rowCount === 1 ? "row" : "rows"})
				</span>
			</div>
		</div>
	);
};

const Hero = () => {
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.08,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 24, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
		},
	};

	const socials = [
		{
			label: "GitHub",
			href: `https://github.com/${personal.github}`,
			icon: <FaGithub aria-hidden="true" />,
		},
		{
			label: "LinkedIn",
			href: personal.linkedin,
			icon: <FaLinkedin aria-hidden="true" />,
		},
		{
			label: "LeetCode",
			href: `https://leetcode.com/${personal.leetcode}`,
			icon: <SiLeetcode aria-hidden="true" />,
		},
		{
			label: "Email",
			href: `mailto:${personal.email}`,
			icon: <FaEnvelope aria-hidden="true" />,
		},
	];

	return (
		<section className="hero" id="home">
			<div className="hero-container container">
				<motion.div
					className="hero-content"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<motion.h1 variants={itemVariants}>{personal.name}</motion.h1>
					<motion.div className="hero-role" variants={itemVariants}>
						<p className="hero-subtitle">
							{current.title} @ {current.company.split(" ")[0]}
						</p>
						<span className="badge-pill hero-location">
							<FaMapMarkerAlt aria-hidden="true" />
							{personal.location}
						</span>
					</motion.div>
					<motion.p
						className="hero-description"
						variants={itemVariants}
					>
						{personal.tagline}
					</motion.p>

					<motion.div className="hero-cta" variants={itemVariants}>
						<a href="#contact" className="btn btn-primary">
							Get In Touch
						</a>
						<a href="#projects" className="btn btn-secondary">
							View Projects <FaArrowDown aria-hidden="true" />
						</a>
					</motion.div>

					<motion.ul className="hero-social" variants={itemVariants}>
						{socials.map((social) => (
							<li key={social.label}>
								<a
									href={social.href}
									{...(social.href.startsWith("http") && {
										target: "_blank",
										rel: "noopener noreferrer",
									})}
									className="icon-btn"
									aria-label={social.label}
									title={social.label}
								>
									{social.icon}
								</a>
							</li>
						))}
					</motion.ul>
				</motion.div>

				<motion.div
					className="hero-visual"
					initial={{ opacity: 0, y: 32 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.7,
						delay: 0.35,
						ease: [0.22, 1, 0.36, 1],
					}}
				>
					<CodeWindow />
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
