const now = new Date();
window.onload = function() {
	let month = +now.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}
	let nowDate = now.getFullYear()+'-'+month+'-'+now.getDate();
	$('#age').attr('max', nowDate);
}

function calcAge(date) {
	let arr = date.split('-');
	let year = +arr[0];
	let month = +arr[1];
	let day = +arr[2];


	let age = now.getFullYear() - year;
	// Высчитываем возраст
	if (month > now.getMonth()+1) {
		age--;
	}
	if (month == now.getMonth()+1) {
		if (day > now.getDate()) {
			age--;
		}
	}

	if (age < 0) {
		age = "Вы ещё не родились!"
	}

	return age;
}

function getGames() {
	let games = [];
	$('input[type="checkbox"]:checked').each(function() {
		games.push($(this)[0].id);
	});

	return games;
}

function main() {
	// Возраст
	let date = $('#age').val();
	const age = calcAge(date)
	// Имя
	const name = $('#name').val();
	// Фамилия
	const f_name = $('#f_name').val();
	// Телефон
	const phone = $('#phone').val();
	// E-mail
	const email = $('#email').val();
	// Пол
	let gender = $('input[name="gender"]:checked')[0].id;
	if (gender == 'gender1') {
		gender = 'Мужской';
	}
	else if (gender == 'gender2') {
		gender = 'Женский';
	}
	else gender = 'Другой';
	// Город
	const city = $('#city>option:selected').text()
	// Расскажите о себе
	const about = $('#about').val()
	// Игры в которые играли
	let games = getGames()
	
	// Фото
	

	// Удаляем форму
	$('form').remove();
	
	// Создаём анкету

	//Создаём основной контейнер
	$('body').append('<main>');
	let main = $('main');
	// Добавляем заголовок
	main.append('<h1 id="heading">WANTED</h1>');
	// Добавляем картинку

	// Добавляем текст фамилию и имя
	main.append('<h2 class="contact">'+f_name+'</h2>');
	main.append('<h2 class="contact">'+name+'</h2>');

}