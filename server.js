var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//LOAD ENVIRONMENT VARIABLES
require('dotenv').load()

//Connect to mongoose
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/inclusion_app")


var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();



//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


//uncomment after placing favicon in /public
//app.use(favicon(path.join(__dirname, 'public', favicon.ico ')))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/uploads', express.static(__dirname + "/uploads"));


app.use('/', routes);
app.use('/users', users);





module.exports = app;
