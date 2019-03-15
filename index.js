var express = require('express');
var app = express();
var port = 4040;
var fs = require('fs');

app.use(express.static('public'));

app.get('/users', function (req, res) {
	var name = req.query.name;
	var age = req.query.age;

	var person = {
		name,
		age,
	};

	saveUsers(person, res, function (err) {
		if (err) {
			errorMsg('Erro inesperado, tente novamente mais tarde.')
		}

		res.send(res, 'Usuário salvo com sucesso');
	});
});
	
function errorMsg(res, msg) {
	res.status(404).send(msg);
	return;
}

function saveUsers(person, res, callback) {
	fs.readFile('person.json', 'utf8', function readFileCallback(err, data){
		var save = true;
		var obj = {
			table: []
		};

		obj = JSON.parse(data);

		obj.table.map(function(personTable){
			if(personTable.name === person.name && personTable.age === person.age){
				return save = false;
			}
		})

		if(save){
			personSave = {
				id: obj.table.length + 1,
				name: person.name,
				age: person.age,
			}

			obj.table.push(personSave);

			json = JSON.stringify(obj);
			fs.writeFile('person.json', json, 'utf8', callback); // write it back 
		}else{
			errorMsg(res, 'Erro ao salvar usuário');
		}
	});
}

app.listen(port, function () {
	console.log('server up and running at port: %s', port);
});