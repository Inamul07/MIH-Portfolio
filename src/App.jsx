import { Suspense, lazy, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import BlogIndex from "./pages/BlogIndex";
import NotFound from "./pages/NotFound";
import "./App.css";

// Markdown + syntax highlighting only load when a post is opened
const BlogPost = lazy(() => import("./pages/BlogPost"));

// On route change: jump to the #hash target if there is one, else the top
const ScrollManager = () => {
	const { pathname, hash } = useLocation();

	useEffect(() => {
		if (hash) {
			const target = document.getElementById(
				decodeURIComponent(hash.slice(1)),
			);
			if (target) {
				target.scrollIntoView();
				return;
			}
		}
		window.scrollTo({ top: 0, behavior: "instant" });
	}, [pathname, hash]);

	return null;
};

function App() {
	return (
		<MotionConfig reducedMotion="user">
			<div className="App">
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<ScrollManager />
				<Navbar />
				<main id="main">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/blog" element={<BlogIndex />} />
						<Route
							path="/blog/:slug"
							element={
								<Suspense
									fallback={<div className="blog-page" />}
								>
									<BlogPost />
								</Suspense>
							}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</MotionConfig>
	);
}

export default App;
