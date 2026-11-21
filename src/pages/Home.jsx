import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import LatestPosts from "../components/LatestPosts";
import GitHubStats from "../components/GitHubStats";
import LeetCodeStats from "../components/LeetCodeStats";
import Contact from "../components/Contact";

const Home = () => (
	<>
		<Hero />
		<About />
		<Projects />
		<Experience />
		<LatestPosts />
		<section className="stats-band" id="stats">
			<div className="container">
				<div className="section-head">
					<h2 className="section-title">By the Numbers</h2>
					<p className="section-lead">
						Live from GitHub and LeetCode — open source work on one
						side, problem solving on the other.
					</p>
				</div>
				<div className="stats-panels">
					<GitHubStats />
					<LeetCodeStats />
				</div>
			</div>
		</section>
		<Contact />
	</>
);

export default Home;
