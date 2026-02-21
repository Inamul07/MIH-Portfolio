// Import project images
import r2d2Image from "../assets/R2D2/r2d2.png";
import hammerSpaceChatImage from "../assets/HammerSpaceChat/hammerspace_chat_1.png";
import drugExImage from "../assets/DrugEx/drugex_1.jpg";
import todoApplicationImage from "../assets/ToDoApplication/todo_application_1.png";
import housingPricePredictionImage from "../assets/HousingPricePrediction/housing_price_prediction.png";
import iTunesImage from "../assets/ITunes/itunes_1.png";
import randomFinderImage from "../assets/RandomFinder/random_finder_1.png";
import expenserImage from "../assets/Expenser/expenser_1.jpg";

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
			title: "R2D2",
			description:
				"R2D2 is a Discord bot designed to help friends stay in touch by sending automatic notifications when someone joins a voice channel.",
			tech: ["Java", "Discord-Bot", "JDA"],
			github: "https://github.com/Inamul07/R2D2",
			image: r2d2Image,
		},
		{
			title: "HammerSpace Chat",
			description:
				"HammerSpace Chat is a modern, modular desktop chat application built with Electron, React, TypeScript, and SQLite.",
			tech: ["Typescript", "electronjs", "llm-api"],
			github: "https://github.com/Inamul07/hammerspace-chat",
			image: hammerSpaceChatImage,
		},
		{
			title: "DrugEx - The Drug Extinctor App",
			description:
				"A mobile-based crime reporting system designed to combat drug trafficking through community engagement.",
			tech: ["React-Native", "MongoDB", "FastAPI"],
			github: "https://github.com/Inamul07/DrugEx2.0",
			image: drugExImage,
		},
		{
			title: "Crach The CI",
			description:
				"A platform for sharing and discovering company interview experiences.",
			tech: ["React-Native", "MongoDB", "FastAPI"],
			github: "https://github.com/Inamul07/CrackTheCIv2.0",
			image: "https://via.placeholder.com/400x250/1a1a1a/3b82f6?text=Project+1",
			wip: true,
		},
		{
			title: "ToDo Application",
			description:
				"A full-stack Todo application built with Spring Boot and React that enables users to manage their tasks efficiently with features like task prioritization, status tracking, and due date management.",
			tech: ["Java", "Spring-Boot", "React", "Postgresql"],
			github: "https://github.com/Inamul07/Todo-Application",
			image: todoApplicationImage,
		},
		{
			title: "Housing Price Prediction",
			description:
				"A machine learning-powered web application that predicts housing prices in Chennai, India based on various property features.",
			tech: ["Python", "Flask", "Machine-Learning"],
			github: "https://github.com/Inamul07/Housing-Price-Prediction",
			image: housingPricePredictionImage,
		},
		{
			title: "Expenser",
			description:
				"An Android expense tracking application that helps users manage their finances by creating multiple ledgers and tracking credit and debit transactions.",
			tech: ["Java", "Android", "Gradle"],
			github: "https://github.com/Inamul07/Expenser",
			image: expenserImage,
		},
		{
			title: "ITunes",
			description:
				"A responsive web application that allows users to search for music albums using the iTunes Search API.",
			tech: ["HTML", "CSS", "Javascript"],
			github: "https://github.com/Inamul07/ITunes",
			image: iTunesImage,
			demo: "https://inamul07.github.io/ITunes/",
		},
		{
			title: "RandomFinder",
			description:
				"A simple, elegant web application for randomly selecting a winner from a list of participants.",
			tech: ["HTML", "CSS", "Javascript"],
			github: "https://github.com/Inamul07/RandomFinder",
			image: randomFinderImage,
			demo: "https://inamul07.github.io/RandomFinder/",
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
