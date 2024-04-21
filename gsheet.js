
	// EXPRESS SERVER constants
const express = require('express');
const app = express();
const PORT = 5500;

	// API setup
app.listen(PORT, () => {
	console.log("Server started.");
});

app.get("/test", async (req, res) => {
	res.status(200).json({
		'response': "Valid",
		'id': "0000"
	});
});