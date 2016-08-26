class BZReaction extends Simulation { // Belousov–Zhabotinsky reaction
	// conditions
	// 0 = ok
	// ... = infection stages
	// n = ill

	static defaultCell() {
		return {health: 0}
	}

	static init(w) {
		// constants
		this.n = 9; // max degrees of infection (ill state)
		this.k1 = 1; // infected constant
		this.k2 = 1; // ill constant
		this.g = 2; // spread tendency

		// random generation
		var width = w.xCellCount;
		var height = w.yCellCount;
		for(var i = 0; i < (width * height / 2); i++) {
			w.setCell(
				randInt(0, width - 1), // x
				randInt(0, height - 1), // y
				{health: randInt(0, this.n - 1)} // state
			);
		}
	}

	static behaviour(w, newState, x, y) {
		var props = w.getCell(x, y);

		// If the cell is ill (n) then it miraculously becomes healthy (0).
		if(props.health == this.n) {
			return [{x: x, y: y, props: {health: 0}}];
		}

		var neighbours = w.getNeighbours(x, y);

		// a is the number of infected cells among neighbors
		// b is the number of ill cells among neighbors
		// s is sum of states
		var a = 0, b = 0, s = 0;
		for(var cell of neighbours) {
			if(cell.props.health == this.n) {
				b++;
			} else if(cell.props.health > 0) {
				a++;
			}
			s += cell.props.health;
		}

		// If the cell is healthy (0) then its new state is [a/k1] + [b/k2],
		// where a is the number of infected cells among its eight neighbors,
		// b is the number of ill cells among its neighbors, and k1 and k2 are constants.
		if(props.health == 0) {
			return [{x: x, y: y, props: {health: Math.floor(a / this.k1) + Math.floor(b / this.k2)}}];
		}


		// If the cell is infected (other than 0 and n) then its new state is [s/(a+b+1)] + g,
		// where a and b are as above, s is the sum of the states of the cell and of its neighbors
		// and g is a constant.
		if(props.health != 0 && props.health != this.n) {
			return [{x: x, y: y, props: {health: Math.floor(s / (a + b + 1)) + this.g}}];
		}
	}

	// remove this function for some trippy shit.
	static colorPicker(props) {
		var colors = ['#d67756','#d58253','#d48e51','#d2994e','#d1a44b',
					  '#d0b048','#cebb46','#cdc743','#ccd240','#cbde3e'];
		return colors[props.health];
	}

	static legend() {
		return {
			'#d67756': 'Healthy',
			'#cbde3e': 'Ill'
		}
	}
}

