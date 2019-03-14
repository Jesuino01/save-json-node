var express = require('express');
var app = express();
var port = 4040;
var fs = require('fs');


app.use(express.static('public'));

app.get('/users', function (req, res) {
	var name = req.query.name;
	var age = req.query.age;
	var team = req.query.team;

	var person = {
		team,
		name,
		age,
	};

	saveUsers(person, function (err) {
		if (err) {
			res.status(404).send('User not saved');
			return;
		}

		res.send('User saved');
	});
});

function saveUsers(person, callback) {
	fs.readFile('./person.json', 'utf8', function readFileCallback(err, data){
		var EJCTeams = {
			team: []
		};

		console.log(data)

		var json = JSON.stringify(EJCTeams);

		if (err){
			console.log(err);
    } else {

			EJCTeams = JSON.parse(data);
			

			var person = {
				id: 2,
				square:3
			}

			EJCTeams.team.push(person);

			json = JSON.stringify(EJCTeams);
			
			fs.writeFile('./person.json', json, 'utf8', callback);
		
	}});
}

app.listen(port, function () {
	console.log('server up and running at port: %s', port);
});