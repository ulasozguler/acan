class Grid {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.cells = {};
	}

	draw(domElementID) {
		var canvas = document.getElementById(domElementID);
		var cellSize = 10;
		canvas.setAttribute("width", (this.width * cellSize) + 2 + '');
		canvas.setAttribute("height", (this.height * cellSize) + 2 + '');

		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#000000";
		ctx.imageSmoothingEnabled = false;

		for(x = 0; x <= this.width; x++) {
			ctx.moveTo(1 + x * cellSize, 1);
			ctx.lineTo(1 + x * cellSize, 1 + this.height * cellSize);
			ctx.stroke();
		}

		for(y = 0; y <= this.height; y++) {
			ctx.moveTo(1, 1 + y * cellSize);
			ctx.lineTo(1 + this.height * cellSize, 1 + y * cellSize);
			ctx.stroke();
		}

		for(var x in this.cells) {
			if(!this.cells.hasOwnProperty(x)) continue;
			if(this.cells[x]) {
				for(var y in this.cells[x]) {
					if(!this.cells[x].hasOwnProperty(y)) continue;
					if(this.cells[x][y] == 1) {
						ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
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


