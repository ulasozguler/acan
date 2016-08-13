class LangtonsAnt extends Simulation {
	static defaultCell() {
		return {isAnt: false, color: 0}
	}

	static init(w) {
		// put the ant to random location
		var width = w.xCellCount;
		var height = w.yCellCount;
		var props = {
			isAnt: true,
			direction: 2,  // 0,1,2,3 for every direction
			color: 0
		};
		w.setCell(randInt(0, width - 1), randInt(0, height - 1), props);
	}

	static behaviour(w, x, y) {
		var props = w.getCell(x, y);
		if(!props.isAnt) {
			return [];
		}

		var ant = {isAnt: true};
		var leftCell = {isAnt: false};

		if(props.color == 0) {
			ant.direction = (props.direction + 1) % 4;  // turn right
		} else {
			// turn left
			ant.direction = props.direction - 1;
			if(ant.direction == -1) {
				ant.direction = 3;
			}
		}

		leftCell.color = Math.abs(props.color - 1);  // flip color
		var nextCoords = LangtonsAnt._nextCell(x, y, ant.direction);

		// ant will have next cells color
		var nextCellProps = w.getCell(nextCoords.x, nextCoords.y);
		ant.color = nextCellProps.color;

		return [
			{x: nextCoords.x, y: nextCoords.y, props: ant},
			{x: x, y: y, props: leftCell}
		];
	}

	static _nextCell(x, y, direction) {
		switch(direction) {
			case 0: // up
				return {x: x, y: y - 1};
				break;

			case 1: // right
				return {x: x + 1, y: y};
				break;

			case 2: // down
				return {x: x, y: y + 1};
				break;

			case 3: // left
				return {x: x - 1, y: y};
				break;

			default:
				throw "Unknown direction: " + direction.toString();
		}
	}

	static colorPicker(props) {
		if(props.isAnt)
			return 2;
		return props.color;
	}
}

