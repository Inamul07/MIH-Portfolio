const portfolioData = {
	personal: {
		name: "Mohammed Inamul Hassan M",
		shorthand: "MIH",
		role: "Software Developer",
		tagline:
			"Software Developer passionate about building amazing web experiences",
		email: "contact@example.com",
		location: "Your City, Country",
		github: "Inamul07",
		linkedin: "https://linkedin.com",
		leetcode: "07_ajax",
	},

	about: {
		description: [
			"I'm a passionate Software Developer with a love for creating elegant solutions to complex problems. My journey in tech began with curiosity and has evolved into a commitment to building impactful applications.",
			"I specialize in full-stack development, with expertise in modern web technologies. I'm always eager to learn new skills and stay up-to-date with the latest industry trends.",
			"When I'm not coding, you can find me solving problems on LeetCode, contributing to open-source projects, or exploring new technologies and frameworks.",
		],
	},

	skills: [
		{ name: "JavaScript" },
		{ name: "TypeScript" },
		{ name: "React" },
		{ name: "Node.js" },
		{ name: "Python" },
		{ name: "Express" },
		{ name: "MongoDB" },
		{ name: "PostgreSQL" },
		{ name: "HTML5" },
		{ name: "CSS3" },
		{ name: "Tailwind" },
		{ name: "Git" },
		{ name: "Docker" },
		{ name: "SQL" },
	],

	projects: [
		{
			title: "E-Commerce Platform",
			description:
				"A full-stack e-commerce platform with user authentication, product management, and payment integration.",
			tech: ["React", "Node.js", "MongoDB", "Stripe"],
			github: "https://github.com",
			demo: "https://example.com",
			image: "https://via.placeholder.com/400x250/1a1a1a/3b82f6?text=Project+1",
		},
		{
			title: "Task Management App",
			description:
				"A collaborative task management application with real-time updates and team collaboration features.",
			tech: ["React", "Firebase", "Tailwind CSS"],
			github: "https://github.com",
			demo: "https://example.com",
			image: "https://via.placeholder.com/400x250/1a1a1a/60a5fa?text=Project+2",
		},
		{
			title: "Weather Dashboard",
			description:
				"A weather forecasting dashboard with interactive maps and detailed weather information.",
			tech: ["Vue.js", "API Integration", "Chart.js"],
			github: "https://github.com",
			demo: "https://example.com",
			image: "https://via.placeholder.com/400x250/1a1a1a/3b82f6?text=Project+3",
		},
		{
			title: "Social Media Analytics",
			description:
				"Analytics dashboard for tracking social media metrics and engagement across multiple platforms.",
			tech: ["Python", "Django", "PostgreSQL", "D3.js"],
			github: "https://github.com",
			demo: "https://example.com",
			image: "https://via.placeholder.com/400x250/1a1a1a/60a5fa?text=Project+4",
		},
	],

	experience: [
		{
			type: "work",
			title: "Senior Software Developer",
			company: "Tech Company Inc.",
			period: "2022 - Present",
			description:
				"Leading development of scalable web applications using modern technologies. Mentoring junior developers and conducting code reviews.",
			achievements: [
				"Improved application performance by 40%",
				"Led team of 5 developers",
				"Implemented CI/CD pipeline",
			],
		},
		{
			type: "work",
			title: "Full Stack Developer",
			company: "Startup XYZ",
			period: "2020 - 2022",
			description:
				"Developed and maintained multiple client projects using React and Node.js. Collaborated with designers and product managers.",
			achievements: [
				"Built 10+ successful web applications",
				"Reduced deployment time by 60%",
				"Introduced automated testing",
			],
		},
		{
			type: "education",
			title: "Bachelor of Computer Science",
			company: "University Name",
			period: "2016 - 2020",
			description:
				"Graduated with honors. Focused on software engineering, algorithms, and data structures.",
			achievements: [
				"GPA: 3.8/4.0",
				"Dean's List all semesters",
				"Lead of coding club",
			],
		},
		{
			type: "work",
			title: "Software Developer Intern",
			company: "Tech Solutions Ltd.",
			period: "2019 - 2020",
			description:
				"Assisted in developing internal tools and dashboards. Gained experience in professional software development.",
			achievements: [
				"Developed admin dashboard",
				"Automated testing scripts",
				"Participated in agile ceremonies",
			],
		},
	],
};

export default portfolioData;
