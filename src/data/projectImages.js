// Automatically import all images from assets folders using Vite's glob import
const imageModules = import.meta.glob("../assets/**/*.{png,jpg,jpeg,gif,svg}", {
	eager: true,
});

// Transform the glob result into a more usable format
const images = {};

Object.keys(imageModules).forEach((path) => {
	// Extract folder name and filename from path
	// Example: "../assets/R2D2/r2d2.png" -> folder: "R2D2", file: "r2d2.png"
	const match = path.match(/\.\.\/assets\/([^/]+)\/(.+)/);
	if (match) {
		const [, folder, filename] = match;
		if (!images[folder]) {
			images[folder] = [];
		}
		images[folder].push(imageModules[path].default);
	}
});

// Helper function to get images for a project
export const getProjectImages = (projectFolder) => {
	return images[projectFolder] || [];
};

// Helper function to get single image
export const getProjectImage = (projectFolder, index = 0) => {
	const projectImages = images[projectFolder];
	return projectImages ? projectImages[index] : null;
};

// Export all images organized by folder
export default images;
