function mapGen(width, height, steps, mazes) {
	// Функция управления персонажем
	function character(dx, dy) {
		// Получаем цвет пикселя из промежутка между
		// той ячейкой, в которой сейчас персонаж, и той, 
		// в сторону которой будем двигаться 
		let pixel = ctx.getImageData(13*x+7+6*dx, 13*y+7+6*dy, 1, 1)
		let r = pixel.data[0];
		let g = pixel.data[1];
		let b = pixel.data[2];
		// Если цвет пикселя чёрный, то никуда не двигаемся
		if (r == 0 && g == 0 && b == 0) {
			dx = 0;
			dy = 0;
		}
		else {
			$('#step').text(Math.floor(+$('#step').text()+1))
		}

		// Закрашиваем персонажа
		ctx.clearRect(13*x + 3, 13*y + 3, 10, 10)
		// Меняем его координаты
		x += dx;
		y += dy;
		// Отрисовываем персонажа
		ctx.fillRect(13*x + 3, 13*y + 3, 10, 10)
	}

	// Выбираем область рисования
	let canv = document.querySelector('#canv');
	let ctx = canv.getContext('2d');
	// Выписываем количество пройденных шагов и лабиринтов
	$('#step').text(Math.floor(steps));
	$('#complete').text(Math.floor(mazes));
	// Задаём ширину и высоту лабиринта
	canv.width = 13*width + 3;
	canv.height = 13*height + 3;
	// Закрашиваем в чёрный цвет
	ctx.fillStyle = 'blue';
	ctx.fillRect(0, 0, 13*width + 3, 13*height + 3);
	// Генерация лабиринта

	// Обнуляем текущие координаты персонажа
	let x = 0, y = 0;
	// Задаём цвет персонажа
	ctx.fillStyle = 'red';
	// Ставим персонажа в начало
	character(-1, -1);
	// Ожидание нажатия стрелок
	window.onkeydown = function(e) {
		if (e.keyCode == 37) {
			character(-1, 0)
		}
		if (e.keyCode == 38) {
			character(0, -1)
		}
		if (e.keyCode == 39) {
			character(1, 0)
		}
		if (e.keyCode == 40) {
			character(0, 1)
		}
	}
}

window.onload = function() {
	mapGen(20, 20, 0, 0)
}