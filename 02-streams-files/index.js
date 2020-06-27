const fs = require("fs");
const { Transform, pipeline } = require("stream");
const csv = require("csvtojson");
const { transformOnePlanet } = require("./utils/transform");

const inputStream = fs.createReadStream("./data/planets.csv");
const outputStream = fs.createWriteStream("./data/planets.ndjson");
const csvParser = csv();

const transformPlanetStream = new Transform({
	transform: function (planet, encoding, callback) {
		try {
			const planetObject = JSON.parse(planet);
			const transformedPlanetRecord = transformOnePlanet(planetObject);

			callback(null, JSON.stringify(transformedPlanetRecord, null, 2));
		} catch (err) {
			callback(err);
		}
	},
});

pipeline(inputStream, csvParser, transformPlanetStream, outputStream, (err) => {
	if (err) {
		console.log("Planet Pipeline encountered an error:", err);
	} else {
		console.log("File created: '/data/planets.ndjson'");
	}
});
