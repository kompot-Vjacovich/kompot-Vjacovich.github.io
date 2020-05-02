let canvas = document.querySelector('#canv');
let canv = canvas.getContext('2d');

// Устанавливаем размер канваса такой же как размер окна
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Изменяяем размер канваса, если меняется размер окна
window.onresize = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let cardW = canvas.width/10;
	for (let i = 0; i < cards.length; i++) {
		cards[i].resize(i, cardW, canvas.height-cardW*1.5);
		NPC_cards[i].resize(i, cardW, 0);
	}
	Draw()
}

window.onkeydown = function(e) {
	if (e.keyCode == 27) {
		clearInterval(interval);
	}
}

canvas.onclick = function(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let cardW = canvas.width/10;
	for(let i = 0; i<cards.length; i++) {
		if (onRect(i, e.clientX, e.clientY)) {
			move[0] = new Card(cards[i].power)
			move[0].resize(3, cardW, (canvas.height-cardW*1.5)/2);
			let rand = Math.floor(Math.random()*cards.length);
			move[1] = new Card(NPC_cards[rand].power)
			move[1].resize(1, cardW, (canvas.height-cardW*1.5)/2)
			// Удаление элементов из массива
			cards.splice(i, 1);
			NPC_cards.splice(rand, 1)
			// Запрещаем нажимать на канвас
			$('#canv').css('pointer-events', 'none')
			// Добавляем очки
			setTimeout(function() {
				// Смотрим, кто выиграл
				NPC_score = +$('.npc').text()
				player_score = +$('.player').text()
				if (move[0].power != move[1].power) {
					move[0].power > move[1].power ? player_score++ : NPC_score++;
				}
				move = []
				$('#canv').css('pointer-events', 'auto')
				if (cards.length == 0) {
					$('.npc').text(NPC_score)
					$('.player').text(player_score)
					clearInterval(interval);
					canv.clearRect(0, 0, canvas.width, canvas.height);
					theEnd();
				}
			}, 2000)
			break
		}
	}
	// Смещение карт
	for (let i = 0; i < cards.length; i++) {
		cards[i].resize(i, cardW, canvas.height-cardW*1.5);
		NPC_cards[i].resize(i, cardW, 0);
	}
	Draw()
}

canvas.onmousemove = function(e) {
	let cardW = canvas.width/10;
	for(let i = 0; i<cards.length; i++) {
		if (onRect(i, e.clientX, e.clientY)) {
			cards[i].resize(i, cardW, canvas.height-cardW*1.875);
		}
		else {
			cards[i].resize(i, cardW, canvas.height-cardW*1.5);
			NPC_cards[i].resize(i, cardW, 0);
		}
	}
}

class Card {
	// Создание карты
	constructor(power) {
		// Задание силы
		this.power = power;
		// Проверка загрузки картинки
		this.image = new Image();
		// Текстура карты
		this.image.src = 'cards/'+power+'.png';
		// Координаты карты
		this.x = 0;
		this.y = 0;
		this.width = 0;
		this.height = 0;
		// Рубашка карты
		this.back = new Image();
		this.back.src = 'cards/666.png';
	}

	resize(i, cardW, y) {
		let cardH = cardW*1.5
		this.width = cardW;
		this.height = cardH;
		this.x = cardW*(i+2) + i*(cardW/4);
		this.y = y;
	}
}

// Колличество карт
let N = 16
let cards = []
// Создание колоды игрока
for (let i = 0; i < 5; i++) {
	let rand = Math.floor(Math.random()*N) + 1
	cards.push(new Card(rand))
	let cardW = canvas.width/10;
	cards[i].resize(i, cardW, canvas.height-cardW*1.5);
}

let NPC_cards = []

// Создание колоды NPC
for (let i = 0; i < 5; i++) {
	let rand = Math.floor(Math.random()*N) + 1
	NPC_cards.push(new Card(rand))
	let cardW = canvas.width/10;
	NPC_cards[i].resize(i, cardW, 0);
}

let NPC_score = +$('.npc').text()
let player_score = +$('.player').text()

let move = []

function onRect(i, x, y) {
	let right = x > cards[i].x;
	let left = x < cards[i].x + cards[i].width;
	let down = y > cards[i].y;
	let up = y < cards[i].y + cards[i].height;

	if (right && left && down && up) {
		return true
	}

	return false
}

function Draw() {
	canv.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < cards.length; i++) {
		// Отрисовка колоды игрока
		canv.drawImage(
			cards[i].image, // Ссылка на картинку
			0, 0, // Координаты верхнего левого угла (координаты картинки)
			cards[i].image.width, cards[i].image.height, // Размеры текстуры
			cards[i].x, cards[i].y, // Положение картинки
			cards[i].width, cards[i].height // Размеры картинки
		);
		// Отрисовка колоды NPC
		canv.drawImage(
			NPC_cards[i].back, // Ссылка на картинку
			0, 0, // Координаты верхнего левого угла (координаты картинки)
			NPC_cards[i].back.width, NPC_cards[i].back.height, // Размеры текстуры
			NPC_cards[i].x, NPC_cards[i].y, // Положение картинки
			NPC_cards[i].width, NPC_cards[i].height // Размеры картинки
		);
	}

	// Отрисовка карт во время хода
	for(let i = 0; i < move.length; i++) {
		canv.drawImage(
			move[i].image, // Ссылка на картинку
			0, 0, // Координаты верхнего левого угла (координаты картинки)
			move[i].image.width, move[i].image.height, // Размеры текстуры
			move[i].x, move[i].y, // Положение картинки
			move[i].width, move[i].height // Размеры картинки
		);
	}

	$('.npc').text(NPC_score)
	$('.player').text(player_score)
}

function theEnd() {
	$('.npc').toggleClass('anim')
	$('.player').toggleClass('anim')
	setTimeout(function() {
		$('.player').css('bottom', '')
		$('.player').css('top', '50%')
	}, 1000)
	
	setTimeout(function() {
		let win = $('.npc').text() - $('.player').text()
		let text = 'Ничья';
		$('.npc').remove()
		$('.player').remove()
		if (win < 0) text = 'Победа';
		else if (win > 0) text = 'Поражение';

		$('.wrapper').append('<div class="end">');
		$('.end').text(text)
	}, 2000)
}

let interval;
window.onload = function() {
	interval = setInterval(Draw, 1000/60);
}