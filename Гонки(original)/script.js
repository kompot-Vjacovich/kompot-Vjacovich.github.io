let canvas = document.querySelector('#canv');
let canv = canvas.getContext('2d');

// Устанавливаем размер канваса такой же как размер окна
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Изменяяем размер канваса, если меняется размер окна
window.onresize = function() {
	let oldX = player.x*100/canvas.width;
	let oldY = player.y*100/canvas.height;

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	scale = canvas.width/15000;

	player.x = canvas.width*oldX/100;
	player.y = canvas.height*oldY/100;
	Draw()
}

class Road {
	// Функция, которая выполняется при создании новой дороги
	constructor(image, y) {
		// Координаты текущей дороги
		this.x = 0;
		this.y = y;
		// Проверка загрузки картинки
		this.loaded = false;
		this.image = new Image();
		let road_obj = this;
		this.image.onload = function() {
			road_obj.loaded = true;
		}
		// Текстура текущей дороги
		this.image.src = image;
	}

	Update(road) {
		// Двигаем дорога
		this.y += speed;

		// Когда дорога вышла за границу экрана
		if (this.y > window.innerHeight) {
			this.y = road.y - canvas.height + speed;
		}
	}
}

class Car {
	// Функция, которая выполняется при создании новой машины
    constructor(image, x, y, isPlayer) {
        this.x = x;
        this.y = y;
 
        this.image = new Image();
        this.image.src = image;

        this.isPlayer = isPlayer;
    }
 
    Update() {
        this.y += speed;
        if (this.isPlayer && this.y + this.image.height*scale > canvas.height) {
        	this.y = canvas.height - this.image.height*scale;
        }
    }
 
    Move(dx, dy) {
    	//Смещение по X
        this.x += speed*dx;
        //Если при смещении объект выходит за края холста, то изменения откатываются
        if(this.x + this.image.width*scale > canvas.width) {
            this.x = canvas.width - this.image.width*scale; 
        }
        if(this.x < 0) {
            this.x = 0;
        }

        //Смещение по Y
        this.y += speed*dy*boost;
        boost = 1;
        //Если при смещении объект выходит за края холста, то изменения откатываются
        if(this.y + this.image.height*scale > canvas.height) {
            this.y = canvas.height - this.image.height*scale;
        }
        if(this.y < 0) {
            this.y = 0;
        }        
    }
}

let speed  = 5;
let boost = 1;
let roads = [];
roads.push(new Road('img/road.jpg', 0));
roads.push(new Road('img/road.jpg', -canvas.height));

let scale = canvas.width/15000;
let player;
let cars = [];

function update() {
	roads[0].Update(roads[1]);
	roads[1].Update(roads[0]);

	player.Update()
	for (let i = 0; i < cars.length; i++) {
		cars[i].Update()
	}

	let dx = 0;
	let dy = 0;
	// Вправо
	if (keys.indexOf(39) != -1) {
		dx = 1
	}
	if (keys.indexOf(37) != -1) {
		// Влево
		dx = -1;
	}
	if (keys.indexOf(38) != -1) {
		// Вверх
		dy = -1;
		boost = 2;
	}
	if (keys.indexOf(40) != -1) {
		// Вниз
		dy = 1;
	}
	player.Move(dx, dy)

	Draw();
}

function Draw() {
	canv.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < 2; i++) {
		canv.drawImage(
			roads[i].image, // Ссылка на картинку
			0, 0, // Координаты верхнего левого угла (координаты картинки)
			roads[i].image.width, roads[i].image.height, // Размеры картинки
			roads[i].x, roads[i].y, // Положение картинки
			canvas.width, canvas.height // Масштабирование картинки под размер канваса
		);
	}

	for(let i = 0; i < cars.length; i++) {
	    canv.drawImage(
	        cars[i].image, //Изображение для отрисовки
	        0, //Начальное положение по оси X на изображении
	        0, //Начальное положение по оси Y на изображении
	        cars[i].image.width, //Ширина изображения
	        cars[i].image.height, //Высота изображения
	        cars[i].x, //Положение по оси X на холсте
	        cars[i].y, //Положение по оси Y на холсте
	        cars[i].image.width * scale, //Ширина изображения на холсте, умноженная на масштаб
	        cars[i].image.height * scale //Высота изображения на холсте, умноженная на масштаб
	    );
	}

	if (player) {
		canv.drawImage(
	        player.image, //Изображение для отрисовки
	        0, //Начальное положение по оси X на изображении
	        0, //Начальное положение по оси Y на изображении
	        player.image.width, //Ширина изображения
	        player.image.height, //Высота изображения
	        player.x, //Положение по оси X на холсте
	        player.y, //Положение по оси Y на холсте
	        player.image.width * scale, //Ширина изображения на холсте, умноженная на масштаб
	        player.image.height * scale //Высота изображения на холсте, умноженная на масштаб
	    );
	}
	
}

function control(e) {
	let code = e.which;
    if (keys.indexOf(code) < 0){
        keys.push(code);
    }
}

let interval;
let keys = [];
function Play() {
	$('#play').remove();
	// Добавляем машину персонажа
	player = new Car('img/car.png', 2*canvas.width/3, canvas.height/2, true)
	// Добавляем управление
	window.onkeydown = function(event) {control(event)}
	window.onkeyup = function(e){keys.splice(keys.indexOf(e.keyCode),1);}
	// Начинаем игру
	interval = setInterval(update, 1000/60);
}

window.onload = function() {
	Draw()
}