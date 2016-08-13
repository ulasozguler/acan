class Grid {
	constructor(canvasID, horizontalCellCount, verticalCellCount, cellSize = 10) {
		this.xCellCount = horizontalCellCount;
		this.yCellCount = verticalCellCount;
		this.cellSize = cellSize;


		this.cells = {};

		var canvas = document.getElementById(canvasID);
		canvas.setAttribute('width', (this.xCellCount * this.cellSize) + 2 + '');
		canvas.setAttribute('height', (this.yCellCount * this.cellSize) + 2 + '');

		this.ctx = canvas.getContext('2d');

		this.colors = ['#000000', '#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c',
					   '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'];
	}

	line(x1, y1, x2, y2) {
		// 0.5 because canvas counts from middle of pixel
		this.ctx.moveTo(x1 + 0.5, y1 + 0.5);
		this.ctx.lineTo(x2 + 0.5, y2 + 0.5);
		this.ctx.stroke();
	}

	box(x, y) {
		// +-1 because borders
		this.ctx.fillRect((x * this.cellSize) + 1, (y * this.cellSize) + 1,
			this.cellSize - 1, this.cellSize - 1);
	}

	draw() {
		this.ctx.strokeStyle = 'grey';

		// draw grid
		var y_min = 0;
		var y_max = this.yCellCount * this.cellSize;
		for(let x = 0; x <= this.xCellCount; x++) {
			let x_coor = x * this.cellSize;
			this.line(x_coor, y_min, x_coor, y_max);
		}

		var x_min = 0;
		var x_max = this.xCellCount * this.cellSize;
		for(let y = 0; y <= this.yCellCount; y++) {
			let y_coor = y * this.cellSize;
			this.line(x_min, y_coor, x_max, y_coor);
		}

		// draw agents
		for(let x in this.cells) {
			if(!this.cells.hasOwnProperty(x)) continue;
			if(this.cells[x]) {
				for(let y in this.cells[x]) {
					if(!this.cells[x].hasOwnProperty(y)) continue;
					var color = this.cells[x][y];
					if(Number.isInteger(color)) {
						color = this.colors[this.cells[x][y]];
					}
					this.ctx.fillStyle = color;
					this.box(x, y);
				}
			}
		}
	}

	fill(x, y, color = 0) {
		if(!this.cells[x]) {
			this.cells[x] = {};
		}
		this.cells[x][y] = color;
	}
}


