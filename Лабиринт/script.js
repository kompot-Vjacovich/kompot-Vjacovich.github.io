function mapGen(w, h, steps, mazes) {
	// Функция управления персонажем
	function character(dx, dy) {
		// Получаем цвет пикселя из промежутка между
		// той ячейкой, в которой сейчас персонаж, и той, 
		// в сторону которой будем двигаться 
		let pixel = ctx.getImageData(13 * x + 7 + 6 * dx, 13 * y + 7 + 6 * dy, 1, 1);
		let r = pixel.data[0];
		let g = pixel.data[1];
		let right = pixel.data[2];
		let alpha = pixel.data[3];
		// Если цвет пикселя чёрный, то никуда не двигаемся
		if (r == 0 && g == 0 && right == 0 && alpha == 255) {
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
		// Переход на следующий уровень
		if (x > w) mapGen(w+5, h+5, 0, mazes+1);
		// НАЧАЛО ДЗ
		// Если человек прошёл 5 лабиринтов, то удаляем всё и выводим поздравления
		// КОНЕЦ ДЗ
	}

	// Выбираем область рисования
	let canv = document.querySelector('#canv');
	let ctx = canv.getContext('2d');
	// Выписываем количество пройденных шагов и лабиринтов
	$('#step').text(Math.floor(steps));
	$('#complete').text(Math.floor(mazes));
	// Задаём ширину и высоту лабиринта
	canv.width = 13*w + 3;
	canv.height = 13*h + 3;
	// Закрашиваем в чёрный цвет
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, 13*w + 3, 13*h + 3);
	// Генерация лабиринта

	// Объявим массивы для хранения значения множества текущей ячейки, для значения стенки справа и для значения стенки снизу
    column = Array(w); 
    right = Array(w);
    var bottom = Array(w)
    // Текущее множество
    var quan = 1;

    // Цикл по строкам
    for (let str = 0; str < h; str++) {
    	// Проверка принадлежности ячейки множеству
    	for (let i = 0; i < w; i++) {
    		if (str == 0) {
    			column[i] = 0
    		}
    		ctx.clearRect(13 * i + 3, 13 * str + 3, 10, 10);
    		bottom[i] = 0
    		if (right[i] == 1) {
    			right[i] = 0;
    			column[i] = 0;
    		}
    		if (column[i] == 0) {
    			column[i] = quan++;
    		}
    	}
    	// Добавляем рандомно стенки справа и снизу
    	for (let i = 0; i < w; i++) {
    		bottom[i] = Math.floor(2 * Math.random()), right[i] = Math.floor(2 * Math.random());

    		if ((0 == bottom[i] || str == h - 1) && i != w - 1 && column[i + 1] != column[i]) {
                let l = column[i + 1];
                for (let j = 0; j < w; j++) {
                	if (column[j] == l) {
                		(column[j] = column[i]);
                	}
                }
                ctx.clearRect(13 * i + 3, 13 * str + 3, 15, 10)
            }
            if (str != h - 1 && 0 == right[i]) {
            	ctx.clearRect(13 * i + 3, 13 * str + 3, 10, 15);
            }
    	}
    	// Проверка на замкнутые области.
        for (let stolb = 0; stolb < w; stolb++) {
            var p = l = 0;
            for (let j = 0; j < w; j++) {
            	if (column[stolb] == column[j] && 0 == right[j]) {
            		p++;
            	}
            	else {
            		l++;
            	}
            }
            if (0 == p) {
            	right[stolb] = 0;
            	ctx.clearRect(13 * stolb + 3, 13 * str + 3, 10, 15);
            }
        }
    }

    // Выход из лабиринта
    ctx.clearRect(13 * w, 3, 15, 10)
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

function level(lvl) {
	// убираем всё со страницы
	$('body').empty();
	// добавляем канвас и все подписи
	$('body').append('<div class="stat">Шагов: <span id="step">0</span> Пройдено лабиринтов: <span id="complete">0</span></div><canvas id="canv"></canvas>');

	mapGen(lvl*15, lvl*15, 0, 0)
}
