window.onload = function() {
	const now = new Date();
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
}

function main() {
	let date = $('#age').val();
	
	const age = calcAge(date)
}