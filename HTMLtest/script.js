function getName() {
	name = $('#name').val();

	if (name == "" || name == null) {
		name = "Ученик";
	}
	
	// Удаляем всё что внутри тега body
	$('body').empty();

	hi(name);
}


function hi(name) {
	$('body').prepend('<h2>'+name+', если ты готов начать тестирование, нажми СТАРТ</h2>');
	$('h2').after('<button onclick="test()">СТАРТ</button>');
}

let questions = ["2+2=", "3+2=", "да"];
let answers = ["четыре", "пять", "нет"];
let score = 0;
let name;
const len = questions.length;

function test() {
	$('body').empty();
	$('body').append('<h2></h2>');
	$('body').append('<input type="text">');
	$('body').append('<button onclick="check()">Ответить</button>');

	$('h2').text(questions[0])
}

function check() {
	let otvet = $('input').val().toLowerCase();

	if(otvet == answers[0]) {
		score++;
	}
	// Удалить первый элемент массива
	questions.shift();
	answers.shift();

	if (questions.length != 0) {
		$('h2').text(questions[0]);
		$('input').val('');
	}
	else {
		theEnd();
	}
}

function test1() {	

	for(let i = 0; i < questions.length; i++) {
		let q = questions[i];
		let a = answers[i];
		let otvet = prompt("Вопрос №" + (i+1) + ": " + q);

		if (otvet == a) {
			score++;
		}
	}

	alert(name + ", вы набрали " + score + "/" + questions.length + " баллов.");
}

function start() {
	// Удаляем элемент с id="start"
	$('#start').remove();
	// Создаём абзац с текстом
	$('body').append('<p>Введите своё имя...</p>');
	// Создаём поле для ввода
	$('body').append('<input type="text" id="name">');
	// Создаём кнопку для отправки
	$('body').append('<input type="submit" id="send">');
	// Задаём аттрибуту onclick значение "название функции"
	$('#send').attr('onclick', 'getName()');
}

function theEnd() {
	$('body').empty().append('<h1>' name + ', вы набрали ' + score + '/' + len + ' баллов.'</h1>')
}