var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var ejs = require('ejs');




var path = require('path');
var fixedUserName = "Somnath"
var fixedPassword = "Pass@0733";

var app = express();
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get("/", function (req, res) {
			req.session.loggedin =false;
    if (req.session.wrongAuth) {
		req.session.destroy();
		res.render("login", {msg:'Incorrect Username and/or Password ! Please enter correct credentials'});
	}
	else
	{
req.session.destroy();
	 res.render("login", {msg:'Please Enter Your Credentials'});
	}
});

app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		if(username==fixedUserName &&  password ==fixedPassword)
		{
			request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
		}
		 else {
			   
			   request.session.loggedin = false;
				request.session.wrongAuth = true;
				response.redirect('/');
			}			
			response.end();

	}
	 else {
		
  response.render("login", {msg:'Please Enter Username and Password!'});

	}
});

app.get('/home', function(request, response) {
	request.session.wrongAuth = false;
	if (request.session.loggedin) {
		
		 response.render("home", {msg:'Welcome back, ' + request.session.username + '! You have sucessfully Logged In'});
	} else {
		req.session.destroy();
		request.session.loggedin =false;
				response.redirect('/');
	}
	response.end();
});



app.listen(3000)