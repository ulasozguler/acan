class Grid {
	constructor(width, height) {
		this.xCellCount = width;
		this.yCellCount = height;
		this.cellSize = 10;
		this.cells = {};
	}

	line(ctx, x1, y1, x2, y2) {
		// 0.5 because canvas counts from middle of pixel
		ctx.moveTo(x1 + 0.5, y1 + 0.5);
		ctx.lineTo(x2 + 0.5, y2 + 0.5);
		ctx.stroke();
	}

	box(ctx, x, y) {
		// +-1 because borders
		ctx.fillRect((x * this.cellSize) + 1, (y * this.cellSize) + 1,
			         this.cellSize - 1, this.cellSize - 1);
	}

	draw(domElementID) {
		var canvas = document.getElementById(domElementID);
		var borderSize = 1;

		canvas.setAttribute('width', (this.xCellCount * this.cellSize) + 2 + '');
		canvas.setAttribute('height', (this.yCellCount * this.cellSize) + 2 + '');

		var ctx = canvas.getContext('2d');
		ctx.strokeStyle = 'grey';
		ctx.imageSmoothingEnabled = false;
		ctx.lineWidth = borderSize;
		ctx.imageSmoothingEnabled = false;

		// draw grid
		let y_min = 0;
		let y_max = this.yCellCount * this.cellSize;
		for(let x = 0; x <= this.xCellCount; x++) {
			let x_coor = x * this.cellSize;
			this.line(ctx, x_coor, y_min, x_coor, y_max);
		}

		let x_min = 0;
		let x_max = this.xCellCount * this.cellSize;
		for(let y = 0; y <= this.yCellCount; y++) {
			let y_coor = y * this.cellSize;
			this.line(ctx, x_min, y_coor, x_max, y_coor);
		}

		// draw agents
		ctx.fillStyle = '#000000';
		for(let x in this.cells) {
			if(!this.cells.hasOwnProperty(x)) continue;
			if(this.cells[x]) {
				for(let y in this.cells[x]) {
					if(!this.cells[x].hasOwnProperty(y)) continue;
					if(this.cells[x][y] == 1) {
						this.box(ctx, x, y);
					}
				}
			}
		}
	}

	fill(x, y) {
		if(!this.cells[x]) {
			this.cells[x] = {};
		}
		this.cells[x][y] = 1;
	}
}


