// get the things we need
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var users = jsonfile.readFileSync('./data/users.json');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.post('/api/users/auth', function(req, res) {
	users.forEach(function(user, index) {
		console.log(req.body)
		if (user.email == req.body.email) {
			if (user.password == req.body.password) {
				res.json({ success: true });
			}
		}
	});

	res.json({ success: false });
});

app.post('/api/users/create', function(req, res) {
	var user = req.body;
	users.push(user);
	jsonfile.writeFileSync('./data/users.json', users);

	res.json({ success: true });
});

// start the server on port 8080 (http://localhost:8080)
app.listen(8080);
console.log('Magic happens on port 8080.');
