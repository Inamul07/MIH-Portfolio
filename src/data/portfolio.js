const portfolioData = {
	personal: {
		name: "Mohammed Inamul Hassan M",
		shorthand: "MIH",
		roles: [
			"Software Developer",
			"Database Developer",
			"Problem Solver",
			"Tech Enthusiast",
			"Philomath",
		],
		tagline:
			"Building digital universes and exploring the horizons of code, one line at a time.",
		email: "mohammedinamul87@gmail.com",
		location: "Chennai, India",
		github: "Inamul07",
		linkedin: "https://www.linkedin.com/in/mih07/",
		leetcode: "07_ajax",
	},

	about: {
		description: [
			"Hey! Thank you for your interest in learning more about me. My name is Mohammed Inamul Hassan, and I'm a Software Engineer working at Zoho Corporations.",
			"I enjoy picking up new skills and technology. I strive to improve as a programmer and a problem solver.",
			"Currently I'm learning my way through machine learning concepts and also into Database Systems (mostly PostgreSQL).",
			"Apart from my professional life, I enjoy football and cricket, as well as playing games.",
		],
	},

	skills: [
		{ name: "C" },
		{ name: "Java" },
		{ name: "Python" },
		{ name: "PostgreSQL" },
		{ name: "React" },
		{ name: "Spring Boot" },
		{ name: "JavaScript" },
		{ name: "Firebase" },
		{ name: "Flask" },
		{ name: "FastAPI" },
		{ name: "MongoDB" },
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
			title: "Member Technical Staff",
			company: "Zoho Corporations",
			period: "June 2024 - Present",
			description:
				"Understanding of postgres internals and testing tools",
			achievements: [
				"Worked on creating custom postgresql background workers",
				"Manage highly available database deployments",
				"Development and optimization of docker images to enhance efficiency and scalability",
			],
		},
		{
			type: "work",
			title: "Project Trainee",
			company: "Zoho Corporations",
			period: "Feb 2024 - June 2024",
			description:
				"In depth understanding of Research papers and Introduction to postgres extensions",
			achievements: [
				"Research and Implementation of Adaptive Replacement Cache",
				"Worked on creating postgres extensions",
			],
		},
		{
			type: "work",
			title: "Application Development Intern",
			company: "Blunav Technologies Pvt Ltd",
			period: "Jan 2023 - Apr 2023",
			description:
				"Gained experience on creating React applications with FastAPI and MongoDB",
			achievements: [
				"Contributed to the development of DigiField: An Inventory Management System to manage assets",
				"Developed and maintained APIs using FastAPI and used MongoDB as backend database",
				"Collaborated with the frontend team to create a Web Application using ReactJS.",
			],
		},
	],
};

export default portfolioData;
