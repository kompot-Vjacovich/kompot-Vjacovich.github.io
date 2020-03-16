const now = new Date();
let imgSrc = "https://yt3.ggpht.com/a/AGF-l7_-kOzw8dun8tBATs5sTFK203H1DZUD9hNsLA=s900-c-k-c0xffffffff-no-rj-mo";

window.onload = function() {
	let month = +now.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}
	let day = now.getDate();
	if (day < 10) {
		day = '0' + day;
	}
	let nowDate = now.getFullYear()+'-'+month+'-'+day;
	$('#age').attr('max', nowDate);
}

function calcAge(date) {
	let arr = date.split('-');
	let year = +arr[0];
	let month = +arr[1];
	let day = +arr[2];

	let nowMonth = +now.getMonth() + 1;
	let nowDate = +now.getDate();

	let age = now.getFullYear() - year;
	if (month > nowMonth) {
		age--;
	}
	else if(month == nowMonth) {
		if (day > nowDate) {
			age--;
		}
	}

	return age;
}

function getGames() {
	let gamesID = [];
	let checkboxes = $('input[type="checkbox"]:checked');
	for (let i = 0; i < checkboxes.length; i++) {
		let gameID = checkboxes[i].id;
		gamesID[i] = gameID;
	}

	return gamesID;
}

function gameLogo(selected) {
	let games = [
		{id:"CS", logo:"https://24tv.ua/resources/photos/news/201808/1024388.jpg?1537446463000"},
		{id:"MC", logo:"https://avatars.mds.yandex.net/get-pdb/2352951/87fcdaae-3e02-4223-b58c-4e4d6affbc66/s1200"},
		{id:"OW", logo:"https://b1.gmbox.ru/c/169858.jpg"},
		{id:"WF", logo:"https://i.ytimg.com/vi/uJq785-ThyU/maxresdefault.jpg"},
		{id:"COD", logo:"https://million-wallpapers.com/wallpapers/0/75/555610960724576/call-of-duty-modern-warfare-poster.jpg"},
		{id:"BF", logo:"https://www.digiseller.ru/preview/560594/p1_2074861_41eedce2.jpg"},
		{id:"WOT", logo:"https://i.ytimg.com/vi/Ihq5crK1Fi4/maxresdefault.jpg"},
		{id:"HL", logo:"https://avatars.mds.yandex.net/get-pdb/2492397/e773f1c0-4898-4948-bd67-d513cf9a1147/s1200"},
		{id:"PL", logo:"https://avatars.mds.yandex.net/get-pdb/1073485/0e00836d-5915-4e78-ae5a-8be2d6aaf9aa/s1200"},
		{id:"GTA", logo:"https://avatars.mds.yandex.net/get-zen_doc/759807/pub_5ad56963ad0f2293fa3b777b_5ad5dfdd7ddde8bb4e0d05f6/scale_1200"},
	];

	let images = '';
	for (var i = 0; i < selected.length; i++) {
		let imgLink = games.find(item => item.id == selected[i]).logo;
		images += '<img class="img" src="'+imgLink+'">'
	}

	return images;
}

function readURL(input) {
	if (input.files && input.files[0]) {
		let reader = new FileReader();

		reader.onload = function(e) {
			imgSrc = e.target.result;
		}

		reader.readAsDataURL(input.files[0])
	}
}

function main() {
	// Возраст
	let date = $('#age').val();
	const age = calcAge(date);
	// Фамилия
	let f_name = $('#f_name').val();
	// Имя
	const name = $('#name').val();
	// Телефон
	const phone = $('#phone').val();
	// E-mail
	const email = $('#email').val();
	// Пол
	let gender = 'Другой';
	let genderID = $('input[name="gender"]:checked')[0].id;
	if (genderID == 'gender1') gender = 'Мужской';
	else if (genderID == 'gender2') gender = 'Женский';
	// Город
	let city = $('#city>option:selected').text();
	// О себе
	let about = $('#about').val();
	// Игры
	let games = getGames();
	let images = '';
	if (games.length > 0) {
		images = gameLogo(games);
	}
	// Цвет
	let color = $('#color').val()

	$('form').css('display', 'none');
}