var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var port = process.env.port || 3000;

var app = express();

var server = require('http').createServer(app);
server.listen(port, function(){
	console.log('Server listening on port ' + port);
});

var http = require('http').Server(app);

var io = require('socket.io')(server)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);



var currentUsersArray = [];

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


io.on('connect', function(socket){ 
	socket.on('login', function(message){
		checkForDuplicates(message)
		io.emit('loggedIn', currentUsersArray)
		console.log(currentUsersArray)
	})

	socket.on('update', function(message){
		for(var i = 0; i<currentUsersArray.length;i++){
			if(currentUsersArray[i].username === message.username){
				currentUsersArray[i].latitude = message.latitude
				currentUsersArray[i].longitude = message.longitude
			}
		}

		console.log(message.latitude+ " "+ message.longitude+" for " + message.username)
	})
})

function checkForDuplicates(message){
	duplicate = true
	while(duplicate){ // sometimes work
		duplicate = false
		for(var i = 0; i<currentUsersArray.length;i++){
			if(currentUsersArray[i].username === message.username){
				message.username = message.username+"1";
				duplicate = true
			}
		}
	}
	currentUsersArray.push(message)

}



// WRITE HERE >:D



app.post('/userlogin',function(request,response){
	var query1=request.body.input_username;
	console.log(query1)


	// SEND MAP
	response.send("ok")
});


module.exports = app;