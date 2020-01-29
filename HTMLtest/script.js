function getName() {
	let name = prompt("Введите своё имя...");

	if (name == "" || name == null) {
		name = "Ученик";
	}

	alert(name + ", нажми ОК чтобы начать тест.");
	
	// Удаляем всё что внутри тега body
	$('body').empty();
	return name
}

function test() {
	const name = getName();

	const questions = ["2+2=", "3+2="];
	const answers = ["четыре", "пять"];	

	let score = 0;
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