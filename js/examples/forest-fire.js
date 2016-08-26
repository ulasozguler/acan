class ForestFire extends Simulation {
	// conditions
	// 0 = empty
	// 1 = tree
	// 2 = burning

	static defaultCell() {
		return {condition: 0}
	}

	static init(w) {
		// random generation
		var width = w.xCellCount;
		var height = w.yCellCount;
		for(var i = 0; i < (width * height / 2); i++) {
			w.setCell(
				randInt(0, width - 1), // x
				randInt(0, height - 1), // y
				{condition: randInt(0, 1)} // state
			);
		}
		w.setStat('Initial', i);
		w.setStat('Current', i);

		this.f = 0.001;
		this.p = 0.01;
	}

	static behaviour(w, newState, x, y) {
		var props = w.getCell(x, y);
		var neighbours = w.getNeighbours(x, y);

		// A burning cell turns into an empty cell
		if(props.condition == 2) {
			w.incStat('Burned');
			w.decStat('Current');
			return [{x: x, y: y, props: {condition: 0}}];
		}

		if(props.condition == 1) {
			// A tree will burn if at least one neighbor is burning
			for(var cell of neighbours) {
				if(cell.props.condition == 2) {
					return [{x: x, y: y, props: {condition: 2}}];
				}
			}

			// A tree ignites with probability f even if no neighbor is burning
			if(this.f > Math.random()) {
				return [{x: x, y: y, props: {condition: 2}}];
			}
		}

		// An empty space fills with a tree with probability p
		if(props.condition == 0) {
			if(this.p > Math.random()) {
				w.incStat('Grew');
				w.incStat('Current');
				return [{x: x, y: y, props: {condition: 1}}];
			}
		}

		// nothing changed
		return [];
	}

	static colorPicker(props) {
		switch(props.condition) {
			case 0:
				return 0;  // white
			case 1:
				return 5;  // green
			case 2:
				return '#ff0000'; // red
		}
	}

	static legend() {
		return {
			0: 'Empty',
			5: 'Tree',
			'#ff0000': 'Burning'
		};
	}
}

