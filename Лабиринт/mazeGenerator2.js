function mapGen(canvas, w, h, steps, mazes) {
    // Функция управления персонажем
    function character(dx, dy) {
        // Получаем цвет пикселя из промежутка между текущей ячейкой и той, в сторону которой персонаж должен передвинуться
        var pixel = ctx.getImageData(13 * x + 7 + 6 * dx, 13 * y + 7 + 6 * dy, 1, 1);
        // Если цвет пикселя черный, то не перемещаем персонажа (обнуляем dx (dx) и dy (dy)), иначе увеличиваем количество шагов
        if(0 == pixel.data[0] && 0 == pixel.data[1] && 0 == pixel.data[2] && 255 == pixel.data[3]){
            dx = 0;
            dy = 0;
        }
        else {
            document.querySelector("#step").innerHTML = Math.floor(document.querySelector("#step").innerHTML) + 1;
        }
        // Закрашиваем персонажа
        ctx.clearRect(13 * x + 3, 13 * y + 3, 10, 10); 
        // Меняем его текущие координаты
        x += dx; 
        y += dy; 
        // Вновь отрисовываем его
        ctx.fillRect(3 + 13 * x, 3 + 13 * y, 10, 10);
        // Если персонаж вышел за пределы лабиринта, то генерируем новый лабиринт и начинаем игру сначала
        if(x >= w) mapGen("#canvas", w, h, 0, mazes + 1)
    }

    // Выбираем область рисования
    canvas = document.querySelector(canvas);
    var ctx = canvas.getContext("2d");
    // И вписываем количество шагов и пройденных лабиринтов
    document.querySelector("#step").innerHTML = Math.floor(steps);
    document.querySelector("#complete").innerHTML = Math.floor(mazes);
    // Зададим ширину и высоту области лабиринта
    canvas.width = 13 * w + 3;
    canvas.height = 13 * h + 3;
    // И закрасим в черный цвет
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 13 * w + 3, 13 * h + 3);
    
    // Объявим массивы для хранения значения множества текущей ячейки, для значения стенки справа и для значения стенки снизу
    a = Array(w); 
    b = Array(w);
    var k = Array(w)
    // Текущее множество
    var q = 1;

    // Цикл по строкам
    for (let cr_l = 0; cr_l < h; cr_l++) {
        // Проверка принадлежности ячейки в строке к какому-либо множеству        
        for (let i = 0; i < w; i++) 
            0 == cr_l && (a[i] = 0), ctx.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 10), k[i] = 0, 1 == b[i] && (b[i] = a[i] = 0), 0 == a[i] && (a[i] = q++);

        // Создание случайным образом стенок справа и снизу
        for (let i = 0; i < w; i++) {
            k[i] = Math.floor(2 * Math.random()), b[i] = Math.floor(2 * Math.random());
            
            if ((0 == k[i] || cr_l == h - 1) && i != w - 1 && a[i + 1] != a[i]) {
                let l = a[i + 1];
                for (let j = 0; j < w; j++) a[j] == l && (a[j] = a[i]);
                ctx.clearRect(13 * i + 3, 13 * cr_l + 3, 15, 10)
            }
            cr_l != h - 1 && 0 == b[i] && ctx.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15)
        }

        // Проверка на замкнутые области.
        for (let i = 0; i < w; i++) {
            var p = l = 0;
            for (let j = 0; j < w; j++) a[i] == a[j] && 0 == b[j] ? p++ : l++;
            0 == p && (b[i] = 0, ctx.clearRect(13 * i + 3, 13 * cr_l + 3, 10, 15))
        }
    }

    // Рисуем выход из лабиринта
    ctx.clearRect(13 * w, 3, 15, 10);
    // Обнуляем текущие координаты персонажа
    var x = 0,
        y = 0;
    // Задаем крассный цвет
    ctx.fillStyle = "red";
    // И ставим персонажа в начало лабиринта
    character(-1, -1);
    // Ожидаем нажатия стрелок
    document.body.onkeydown = function (a) {
        36 < a.keyCode && 41 > a.keyCode && character((a.keyCode - 38) % 2, (a.keyCode - 39) % 2)
    }
}
window.onload = function() {
    mapGen("#canvas", 50, 40, 0, 0);
}