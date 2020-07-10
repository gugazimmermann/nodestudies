const getEmptySeats = () => {
	return Math.round(3 * Math.random());
};

// setInterval(() => {
// 	let seats = getEmptySeats();
// 	if (seats === 1) {
// 		console.log(`There is currently ${seats} seat available`);
// 	} else if (seats === 0) {
// 		console.log(
// 			"Oh nooooo, no available seats, looks like we will miss the movie!"
// 		);
// 	} else if (seats >= 2) {
// 		console.log(`${seats} seats are available, book them, quickly!`);
// 		process.exit();
// 	}
// }, 1000);


// const timer = setInterval(() => {
// 	let seats = getEmptySeats();
// 	if (seats === 1) {
// 		console.log(`There is currently ${seats} seat available`);
// 	} else if (seats === 0) {
// 		console.log(
// 			"Oh nooooo, no available seats, looks like we will miss the movie!"
// 		);
// 	} else if (seats >= 2) {
// 		console.log(`${seats} seats are available, book them, quickly!`);
// 		clearInterval(timer);
// 	}
// }, 1000);

const timer = setInterval(() => {
	let seats = getEmptySeats();
	if (seats === 1) {
		console.log(`There is currently ${seats} seat available`);
	} else if (seats === 0) {
		console.log(
			"Oh nooooo, no available seats, looks like we will miss the movie!"
		);
	} else if (seats >= 2) {
		console.log(seats + " seats are available, book them, quickly!");
		timer.unref();
	}
}, 1000);
