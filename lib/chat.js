var config = require('../config.js');
var sio = require('socket.io');

module.exports = function(app) {
	var io = sio.listen(app);
	io.set('log level', config.socketio.level);
	if (config.environment === 'production') {
		io.enable('browser client minification');  // send minified client
	}
	io.sockets.on('connection', function(socket) {
		console.log('Client Connected');
		socket.on('message', function(data) {
			socket.broadcast.emit('server_message', data);
			socket.emit('server_message', data);
		});
		socket.on('disconnect', function() {
			console.log('Client Disconnected.');
		});
	});
	return io;
};