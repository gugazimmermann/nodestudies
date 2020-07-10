//PORT="8080" node index.js

const express = require("express");
const fs = require("fs");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT03 || 3000;
app.listen(PORT, () => console.log(`Server: localhost:${PORT}/download`));

app.get("/download", (req, res, next) => {
	const fileStream = fs.createReadStream(`${__dirname}/../files/planets.csv`);
	fileStream.on("open", () => {
		res.attachment(process.env.FILENAME03);
		fileStream.pipe(res);
	});
	fileStream.on("error", err => {
		next(err);
	});
});