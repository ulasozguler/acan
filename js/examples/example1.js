class Example1 extends Simulation {
	static defaultCell() {
		return {}
	}

	static init(w) {
		// random generation
		var width = w.xCellCount;
		var height = w.yCellCount;
		var raceCount = 5;
		var skipColor = 2; // just to look pretty

		for(var i = 0; i < width; i++) {
			for(var j = 0; j < height; j++) {
				w.setCell(i, j, {moved: 0, race: randInt(skipColor, raceCount + skipColor)});
			}
		}
	}

	static behaviour(w, newState, x, y) {
		var props = w.getCell(x, y);
		var neighbours = w.getNeighbours(x, y);

		// skip empty cells
		if(!props.race) {
			return [];
		}

		var neighbourRaces = {};
		var willMove = false;
		for(var cell of neighbours) {

			// skip empty cells
			if(!cell.props || !cell.props.race) {
				continue;
			}

			if(!neighbourRaces.hasOwnProperty(cell.props.race)) {
				neighbourRaces[cell.props.race] = 0;
			}
			neighbourRaces[cell.props.race]++;
			if(neighbourRaces[cell.props.race] > 1) {
				willMove = cell.props.race != props.race;
				break;
			}
		}

		if(willMove) {
			// moved too many times in total, needs to move again. die.
			if(props.moved > 100) {
				return [{x: x, y: y, props: {}}]
			}

			let randCell = {};
			let randX = 0;
			let randY = 0;

			// try to move x times. if nowhere to go, die.
			let found = false;
			for(let i = 0; i < 10; i++) {
				randX = randInt(0, w.xCellCount - 1);
				randY = randInt(0, w.yCellCount - 1);
				randCell = newState[w.getId(randX, randY)];

				if(!randCell || !randCell.hasOwnProperty('race')) {
					found = true;
					break;
				}
			}

			if(!found) {
				return [{x: x, y: y, props: {}}]
			}

			// move
			if(!props.moved) {
				props.moved = 0;
			}
			props.moved++;
			return [{x: x, y: y, props: {}}, {x: randX, y: randY, props: props}]
		}

		// nothing changed
		return [];
	}

	static colorPicker(props) {
		if(!props || !props.race)
			return 0; // empty cell - white
		return props.race + 1;
	}

	static setStat(name, val) {
		if(!Example1.stats) {
			Example1.stats = {}
		}
		Example1.stats[name] = val;
	}

	static incStat(name) {
		if(!Example1.stats) {
			Example1.stats = {}
		}
		if(!Example1.stats[name]) {
			Example1.stats[name] = 0;
		}
		Example1.stats[name]++;
	}

	static decStat(name) {
		if(!Example1.stats) {
			Example1.stats = {}
		}
		if(!Example1.stats[name]) {
			Example1.stats[name] = 0;
		}
		Example1.stats[name]--;
	}

	static getStats() {
		if(!Example1.stats) {
			Example1.stats = {}
		}
		return Example1.stats;
	}
}

