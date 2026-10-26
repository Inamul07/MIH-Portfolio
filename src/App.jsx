import { MotionConfig } from "framer-motion";
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
		<MotionConfig reducedMotion="user">
			<div className="App">
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<Navbar />
				<main id="main">
					<Hero />
					<About />
					<Projects />
					<Experience />
					<section className="stats-band" id="stats">
						<div className="container">
							<div className="section-head">
								<h2 className="section-title">By the Numbers</h2>
								<p className="section-lead">
									Live from GitHub and LeetCode — open source
									work on one side, problem solving on the
									other.
								</p>
							</div>
							<div className="stats-panels">
								<GitHubStats />
								<LeetCodeStats />
							</div>
						</div>
					</section>
					<Contact />
				</main>
				<Footer />
			</div>
		</MotionConfig>
	);
}

export default App;
