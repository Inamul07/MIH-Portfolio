import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import GitHubStats from "./components/GitHubStats";
import LeetCodeStats from "./components/LeetCodeStats";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

function App() {
	return (
		<div className="App">
			<Navbar />
			<Hero />
			<About />
			<Projects />
			<Experience />
			<GitHubStats />
			<LeetCodeStats />
			<Contact />
			<Footer />
		</div>
	);
}

export default App;
