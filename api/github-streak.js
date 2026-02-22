export default async function handler(req, res) {
	const { username } = req.query;

	if (!username) {
		return res.status(400).json({ error: "Username is required" });
	}

	try {
		const response = await fetch(
			`https://github-readme-streak-stats.herokuapp.com/?user=${username}&type=json`
		);

		if (!response.ok) {
			throw new Error(`API responded with status: ${response.status}`);
		}

		const data = await response.json();

		// Set CORS headers to allow your frontend to access this
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Allow-Methods", "GET");
		res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

		return res.status(200).json(data);
	} catch (error) {
		console.error("Error fetching streak stats:", error);
		return res.status(500).json({
			error: "Failed to fetch streak stats",
			message: error.message,
		});
	}
}
