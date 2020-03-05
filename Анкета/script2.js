const now = new Date();

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

function main() {
	// Возраст
	let date = $('#age').val();
	const age = calcAge(date);
	// Фамилия
	let f_name = $('#f_name').val();
	// Имя
	const name = $('#name').val();
	// Фамилия
	const f_name = $('#f_name').val();
	// Телефон
	const phone = $('#phone').val();
	// E-mail
	const email = $('#email').val();
}