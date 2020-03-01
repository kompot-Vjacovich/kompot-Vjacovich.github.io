window.onload = function() {
	function getRandomNumber(size) {
		return Math.floor(Math.random()*size)
	}

	function getDistance(event, target) {
		let difX = event.offsetX - target.x;
		let difY = event.offsetY - target.y;
		return Math.sqrt((difX*difX)+(difY*difY))
	}

	let width = $('#map').width()
	let height = $('#map').height()
	let clicks = 0;

	// Создаём клад со случайными координатами
	let target = {
		x: getRandomNumber(width),
		y: getRandomNumber(height)
	};

	//Установили курсор 
	$('#map').css('cursor', 'pointer');
	// Добавляем картинке обработчик кликов
	$('#map').click(function(event) {
		// Увеличили счётчик кликов
		clicks++;
		// Получаем расстояние до места клика
		let distance = getDistance(event, target)
		let hint = getHint(distance);
	});
}