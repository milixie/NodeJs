var student = require('./student');

function add(teacher, students) {
	console.log('Teacher is ' + teacher);
	var students = students.forEach(function(item, index) {
		student.add(item);
	});
}

exports.add = add;