module.exports = {
	sessionSecret: 'your secret',
	port: 8080,
	uri: 'http://localhost:8080', // Without trailing /
    redis: {
        host: 'localhost',
        port: 6379
    },
    mongodb: 'mongodb://localhost/my_database',
    socketio: {
        level: 2
    },
	environment: (process.env.NODE_ENV !== 'production') ? 'development' : 'production',
	selenium : {
		testtimeout : 60000
	}
};

if (module.exports.environment == 'production') {
	module.exports.port = process.env.PORT || 80; // Joyent SmartMachine uses process.env.PORT
    module.exports.uri = 'http://localhost:'+module.exports.port;
}
