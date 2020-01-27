function readFile(input) {
	let file = input.files[0];

	let reader = new FileReader();

	reader.readAsText(file, 'windows-1251');

	reader.onload = function(e) {
		let str = reader.result.split("\n");
		
		let arr = [];
		str.forEach(function(val, index){
			arr[index] = val.split(' '); 
		});
		
		for (var i = 0; i < arr.length; i++) {
			student[i] = {};
			student[i].name = arr[i][0];
			student[i].score = parseInt(arr[i][1]);
		}

		addSelect();
		update();
		$('#files').remove();
	};

	reader.onerror = function() {
		console.log(reader.error);
	};
}

function addSelect() {
	let str = '<select id="name"><option disabled selected>Выберите ученика</option>';
	for (let i = 0; i < student.length; i++) {
		str += '<option>' + student[i].name + '</option>'
	}
	str += '</select><input type="number" id="mark"><input type="submit" id="send" onclick="addPoint()"><input type="button" value="Сохранить" id="save" onclick="save()">';

	$("#files").after(str);
}

function update() {
	$('#names').empty();
    for (let i = 0; i < student.length; i++) {
        $('#names').append("<h1>" + student[i].name + ' ' + student[i].score + "</h1>"); 
        $('#names').append('<div class="foo"><span class="bar" id="b'+i+'"></span></div>');
        // doesn't work
        let len = student[i].score;
        let width = calcWidth(len);
        $('#b'+i).width(width);
    }
    
}

function calcWidth(len) {
	let parentWidth = $('.foo').offsetParent().width();
	let width = parentWidth*len/100;
}

function addPoint() {
    let Name = $('#name option:selected').text();
    let index = student.findIndex(s => s.name == Name);

    let point = $('#mark').val();
    student[index].score += parseInt(point);

    update();
    $('#mark').val('');
    $('select option:first').prop('selected', true);
}

function save() {
	let csv = '';
	for (var i = 0; i < student.length - 1; i++) {
		csv += student[i].score + ' ';
	}
	csv += student[student.length - 1].score;
    let csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
    
    window.open(csvData);
}

let student = [];
