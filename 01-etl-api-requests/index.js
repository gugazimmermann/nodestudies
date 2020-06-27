const rp = require("request-promise");
const { promisify } = require("util");
const fs = require("fs");
const writeFilePromised = promisify(fs.writeFile);

const EXO_API_URL =
  "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI";

const getAllPlanets = () =>
	rp({
		uri: EXO_API_URL,
		method: "GET",
		qs: {
			table: "exoplanets",
			format: "json"
		},
		json: true
	});
    
function computeErrorThreshold(err1, err2) {
	if (err1 === null || err2 === null) {
		return null;
	} else if (Math.abs(err1) === Math.abs(err2)) {
		return `±${Math.abs(err1)}`;
	} else {
		const max = Math.max(err1, err2);
		const min = Math.min(err1, err2);
		return `+${max}/${min}`;
	}
}

function transformOnePlanet(planet) {
	return {
		name: planet.pl_name,
		discoveryMethod: planet.pl_discmethod,
		facility: planet.pl_facility,
		neighbors: planet.pl_pnum,
		orbitsInDays: planet.pl_orbper,
		orbitsInDaysError: computeErrorThreshold(
			planet.pl_orbpererr1,
			planet.pl_orbpererr2
		),
		lastUpdate: planet.rowupdate,
		hostStar: planet.pl_hostname
	};
}

function bulkLoadPlanetsToFile(planets, outputFilePath) {
	if (!outputFilePath) {
		throw new Error("Filepath required as second argument");
	}
	return writeFilePromised(outputFilePath, JSON.stringify(planets, null, 2));
}
    
const startEtlPipeline = async () => {
	const outputFile = `${__dirname}/out.json`;
	try {
		console.log("loading...");
        
		const planets = await getAllPlanets();
		console.log(`Extracted ${planets.length} planets from the API`);
        
		const planetsTransformed = planets.map(p => transformOnePlanet(p));
        
		await bulkLoadPlanetsToFile(planetsTransformed, outputFile);
		console.log(`File saved at ${outputFile}`);
        
		return planetsTransformed;
	} catch (err) {
		console.error(err);
	}
};

startEtlPipeline().then(() => {
	console.log("Done!");
});

// with more than one sources 
// const startEtlPipeline = async () => {
//     try {
//       const allExtractPromises = Promise.all([
//         extractFromSourceA(),
//         extractFromSourceB(),
//         extractFromSourceC()
//       ]);
//       const [dataA, dataB, dataC] = await allExtractPromises;
//       console.log(`Extracted data from sources A, B, and C`);
//     } catch (err) {
//       console.error(err);
//     }
//   };