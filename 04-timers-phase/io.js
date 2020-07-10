const fs = require("fs");

const file = "./../files/the-adventures-of-sherlock-holmes.txt";

console.log("I am about to read the file");

// Reading the file synch
// const start = Date.now();
// const text = fs.readFileSync(file, "utf-8");
// const end = Date.now();
// console.log(`Reading the file blocked for ${end - start} milliseconds`);

// Reading the file asynchronously.
fs.readFile(file, (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Success");
	}
});
  

console.log("All done!"); 