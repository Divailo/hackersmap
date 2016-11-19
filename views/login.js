
var io = require('socket.io')
// var socket = io()

function t(){
	io.emit('connect', 'barbie')
	alert("lube it up")
}