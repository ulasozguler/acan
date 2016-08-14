class Grid {
	constructor(canvasID, horizontalCellCount, verticalCellCount, cellSize = 10) {
		this.xCellCount = horizontalCellCount;
		this.yCellCount = verticalCellCount;
		this.cellSize = cellSize;

		this.canvasID = canvasID;
		this.createCanvas();

		this.cells = {};
		this.colors = ['#ffffff', '#000000', '#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99',
					   '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'];
		this.colorMap = new Map();
	}

	createCanvas() {
		var canvas = document.getElementById(this.canvasID);
		canvas.setAttribute('width', (this.xCellCount * this.cellSize) + 2 + '');
		canvas.setAttribute('height', (this.yCellCount * this.cellSize) + 2 + '');
		this.ctx = canvas.getContext('2d');
	}

	line(x1, y1, x2, y2) {
		// 0.5 because canvas counts from middle of pixel
		this.ctx.moveTo(x1 + 0.5, y1 + 0.5);
		this.ctx.lineTo(x2 + 0.5, y2 + 0.5);
		this.ctx.stroke();
	}

	box(x, y) {
		// +-1 because borders
		this.ctx.fillRect(
			(x * this.cellSize) + 1, (y * this.cellSize) + 1,
			this.cellSize - 1, this.cellSize - 1
		);
	}

	clear() {
		// recreating the whole thing gives better performance then clearRect.
		// alternative is calculating all state changes and redrawing accordingly.
		this.createCanvas();
		this.cells = {};
	}

	reset() {
		this.clear();
		this.colorPicker = this.defaultColorPicker;
		this.colorMap = new Map();
	}

	draw() {
		this.drawGrid();
		this.drawAgents();
	}

	drawGrid() {
		this.ctx.strokeStyle = 'grey';

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
	}

	drawAgents() {
		for(var x in this.cells) {
			if(!this.cells.hasOwnProperty(x)) continue;
			if(this.cells[x]) {
				for(var y in this.cells[x]) {
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

	setCellColor(x, y, color = 0) {
		if(!this.cells[x]) {
			this.cells[x] = {};
		}

		if(Number.isInteger(color)) {
			color = this.colors[color];
		}

		this.cells[x][y] = color;
	}

	static _hash(obj) {
		var props = [];
		for(var pname in obj) {
			if(!obj.hasOwnProperty(pname)) continue;
			props.push([pname, obj[pname]])
		}
		props = props.sort();
		return JSON.stringify(props);
	}

	defaultColorPicker(props) {
		/**
		 * default color picker.
		 * gets a hash of props and assings it one of the predefined colors.
		 * fails if you have more state than predefined color count.
		 * this is an expensive process, it may be a good idea to override it.
		 **/
		var key = Grid._hash(props);
		if(this.colorMap.has(key)) {
			return this.colorMap.get(key);
		}

		var nextColor = this.colors[this.colorMap.size];
		this.colorMap.set(key, nextColor);
		return nextColor;
	}

	colorPicker(props) {
		return this.defaultColorPicker(props);
	}

	updateData(cellDataArray) {
		var start = +new Date();

		this.clear();
		for(var el of cellDataArray) {
			this.setCellColor(el.x, el.y, this.colorPicker(el.props));
		}
		grid.draw();

		//console.log(+new Date() - start);  // track performance
	}

	getColorMapHTML() {
		// TODO: not belongs here.
		var html = '<table>';
		for(let entry of this.colorMap.entries()) {
			html += '<tr>';
			html += '<td><div style="width: 15px; height: 15px; margin: 0 5px -3px 0; border: 1px solid grey; background: ' + entry[1] + '"></div></td>';
			html += '<td>' + entry[0] + '</td>';
			html += '</tr>';
		}
		html += '</table>';
		return html;
	}
}


