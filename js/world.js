class Agent {
	constructor(props) {
		this.props = props;
	}
}

class World {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.cells = {};
	}

	setAgent(x, y, props) {
		if(!this.cells[x]) {
			this.cells[x] = {}
		}
		this.cells[x][y] = new Agent(props)
	}

	getData() {
		var result = [];
		for (var x in this.cells) {
			if(!this.cells.hasOwnProperty(x)) continue;
			if (this.cells[x]) {
				for (var y in this.cells[x]) {
					if(!this.cells[x].hasOwnProperty(y)) continue;
					result.push({x: x, y: y});
				}
			}
		}
		return result;
	}
}
