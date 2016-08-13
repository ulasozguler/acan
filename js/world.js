class World {

	constructor(horizontalCellCount, verticalCellCount, defaultProps = null) {
		this.xCellCount = horizontalCellCount;
		this.yCellCount = verticalCellCount;
		this.defaultProps = defaultProps;
		this.cells = {};

		this._idSeperator = '-';
	}

	getId(x, y) {
		return x.toString() + this._idSeperator + y.toString();
	}

	setCell(x, y, props) {
		this.cells[this.getId(x, y)] = props
	}

	getCell(x, y) {
		if(this.cells.hasOwnProperty(this.getId(x, y))) {
			return this.cells[this.getId(x, y)];
		}
		return this.defaultProps;
	}

	clear() {
		this.cells = {};
	}

	getNeighbours(x, y, d = 1) {
		var result = [];
		x = Number(x);
		y = Number(y);

		for(var i = Math.max(x - d, 0); i <= Math.min(x + d, this.xCellCount); i++) {
			for(var j = Math.max(y - d, 0); j <= Math.min(y + d, this.yCellCount); j++) {
				if(i == x && j == y) {
					// itself
					continue;
				}
				result.push({x: i, y: j, props: this.getCell(i, j)})
			}
		}

		return result;
	}

	*iterateCells() {
		for(var x = 0; x < this.xCellCount; x++) {
			for(var y = 0; y < this.yCellCount; y++) {
				yield {x: x, y: y, props: this.getCell(x, y)}
			}
		}
	}

	getData() {
		var result = [];
		for(var x of this.iterateCells()) {
			result.push(x)
		}
		return result;
	}

	setBehaviour(behaviourFunction) {
		this.behaviour = behaviourFunction
	}

	step() {
		// clone state
		var newState = JSON.parse(JSON.stringify(this.cells));

		for(var cell of this.iterateCells()) {
			var modifiedCells = this.behaviour(this.cells, cell.x, cell.y);
			for(var modifiedCell of modifiedCells) {
				newState[this.getId(modifiedCell.x, modifiedCell.y)] = modifiedCell.props;
			}
		}

		this.cells = newState;
	}
}
