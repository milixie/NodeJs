var teacher = require('./teacher');

function add(klasses, teachers, students) {
	console.log('班级是 ' + klasses);
	var teachers = teachers.forEach(function(item, index){
		teacher.add(item, students[index]);
	});
}

exports.add = add;

