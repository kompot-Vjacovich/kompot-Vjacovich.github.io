function distance(event, target) {
	let difX = event.clientX - target.x;
	let difY = event.clientY - target.y;
	return Math.sqrt((difX*difX)+(difY*difY))
}

window.onload = function() {
	let canvas = $('#canvas');
	let down = false

	// Создаём сетку поля
	let len = canvas.width()*canvas.height()/100;
	let inRow = Math.sqrt(len);
	let blockWidth = len/inRow;
	let posX = blockWidth/2;
	let posY = blockWidth/2;
	let map = [];
	for(let i = 0; i < len; i++, posX+=blockWidth) {
		map[i] = {
			x: posX,
			y: posY,
			color: 'transparent'
		}
		if(i%inRow == 0) {
			posY += blockWidth;
		}
	}

	// Функция рисования лабиринта
	setInterval(function(event) {
		// down = true;
		if(down) {
			map.forEach(function(item, i, arr) {
				if (distance(event, item) <= blockWidth/2) {
					item.color = 'black';
					canvas.drawRect({
						fillStyle: item.color,
						x: item.x, y: item.y,
						width: blockWidth,
						height: blockWidth
					});		
				}
			});
		}
	}, 100);

	canvas.mousedown(function(event) {
		down = true;
	});
	canvas.mouseup(function(event) {
		down = false;
	});
	canvas.mouseout(function(event) {
		down = false;
	});
}