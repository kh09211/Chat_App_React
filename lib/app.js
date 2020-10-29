// set up the express app
var express = require('express');
var app = express();
var port = 3000;

// set up the database driver
var mysql = require('mysql');

// import config module
var config = require('./config');

// connection function to be used for database queries
var dbObj = {
	host: config.db.host,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database
};

// middleware for parsing application/json in the req.body
app.use(express.json());

// import json web tokens for api keys
var jwt = require('jsonwebtoken');

app.listen(port, function () {
	console.log('app started');
});

// serve static assets (the react app)
app.use(express.static('public'));

app.get('/getComments', function (req, res) {
	//connect to the database and grab the comments

	var connection = mysql.createConnection(dbObj);

	connection.connect();
	// use a subquery to select only the last 30 rows
	connection.query('SELECT * FROM (SELECT * FROM `comments` ORDER BY id DESC LIMIT 30) sub ORDER BY id ASC', function (err, results, fields) {
		if (err) throw err;
		res.send(results);
	});

	connection.end();
});

app.post('/submitComment', function (req, res) {
	//connect to the database and submit the comment

	var connection = mysql.createConnection(dbObj);
	var payload = req.body;

	connection.connect();

	connection.query('INSERT INTO comments (username, color, comment) VALUES ("' + payload.username + '", "' + payload.color + '", "' + payload.comment + '")', function (err, results, fields) {
		if (err) throw err;
	});

	// Delete the first row so that the datase waste no data saving old comments
	connection.query('DELETE FROM comments ORDER BY id LIMIT 1', function (err, results, fields) {
		if (err) throw err;
	});

	connection.end();

	res.send('success');
});

app.get('/getToken', function (req, res) {
	// This route does 3 things 1) gets a fresh json token if none exists 2) if current token is expiring, generate a new one and delete the old 3) queries the tokens table and maps the rows to determine which are current and which are expired 4) deletes the rows where tokens are expired. 5 return ALWAYS a json token either current or new along with a row count of the tokens table after all deletions done

	var jwtKey = config.jwt.privateKey;
	var token = jwt.sign({
		data: 'test'
	}, jwtKey, { expiresIn: 5 * 60 });

	console.log(token);

	var connection = mysql.createConnection(dbObj);

	connection.connect();

	/*  put in current server time
 connection.query(`INSERT INTO tokens (date_time) VALUES (now())`, 
 	function(err, results, fields) {
 		if (err) throw err
 	}
 );
 */

	// Delete the first row so that the datase waste no data saving old comments
	/*
 connection.query('DELETE FROM comments ORDER BY id LIMIT 1', 
 	function(err, results, fields) {
 		if (err) throw err
 	}
 );
 */
	connection.end();

	res.send('success');
});