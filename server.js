// get the things we need
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jsonfile = require('jsonfile')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var users = jsonfile.readFileSync('./data/users.json');
var locations = jsonfile.readFileSync('./data/locations.json');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.get('/api/locations/:theme', function(req, res) {
	var theme = req.params.theme;
	var requestedLocation;
	locations.forEach(function(location, index) {
		if (theme == location.theme) requestedLocation = location
	})
	res.json(requestedLocation);
});

app.put('/api/locations/:theme/:name', function(req, res) {
	var theme = req.params.theme;
	var name = req.params.name;
	var requestedTheme;
	var requestedLocation;

	locations.forEach(function(theme, index) {
		if (theme == location.theme) requestedTheme = theme;
	});

	theme.shift();

	theme.forEach(function(location, index) {
			if (location.NAME == name) requestedLocation = location;
	});

	res.json(location);
});

app.post('/api/locations/like', function(req, res) {
	var themeName = req.body.theme;
	var locationName = req.body.location;
	var email = req.body.email;

	locations.forEach(function(theme, index) {
		if (themeName == theme.theme) {
			theme.SrchResults.forEach(function(location, index) {
				if (location.NAME == locationName) {
					if (!!location.likes) {
						location.likes++;
					} else {
						location.likes = 1;
					}
				}
			});
		}
	});

	jsonfile.writeFileSync('./data/locations.json', locations);
	res.json({ success: true });
});

app.post('/api/users/auth', function(req, res) {
	var match = false;
	var name;
	users.forEach(function(user, index) {
		if (user.email == req.body.email) {
			if (user.password == req.body.password) {
				match = true;
				name = user.name;
			}
		}
	});

	if (match) {
		res.json({ success: match,  name: name});
	} else {
		res.json({ success: match });
	}

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
