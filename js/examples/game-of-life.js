class GameOfLife extends Simulation {
	static defaultCell() {
		return {alive: 0}
	}

	static init(w) {
		// random generation
		var width = w.xCellCount;
		var height = w.yCellCount;
		for(var i = 0; i < (width * height / 2); i++) {
			w.setCell(randInt(0, width - 1), randInt(0, height - 1), {alive: 1});
		}
	}

	static behaviour(w, x, y) {
		var props = w.getCell(x, y);
		var neighbours = w.getNeighbours(x, y);

		var aliveNeighbours = 0;
		for(var cell of neighbours) {
			if(cell.props.alive) {
				aliveNeighbours += 1;
			}
		}

		if(props.alive) {
			// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
			if(aliveNeighbours < 2) {
				return [{x: x, y: y, props: {alive: 0}}];
			}

			// Any live cell with two or three live neighbours lives on to the next generation.

			// Any live cell with more than three live neighbours dies, as if by over-population.
			if(aliveNeighbours > 3) {
				return [{x: x, y: y, props: {alive: 0}}];
			}

		} else {
			// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
			if(aliveNeighbours == 3) {
				return [{x: x, y: y, props: {alive: 1}}];
			}
		}

		// nothing changed
		return [];
	}

	//static colorPicker(props) {
	//	return props.alive;
	//}
}

