//setup Dependencies
var config = require('./config.js');
var express = require('express');
var RedisStore = require('connect-redis')(express);
var sessionStore = new RedisStore(config.redis);
var mongoose = require('mongoose');

var useragent = require('./lib/useragent.js');
var employee = require('./lib/employee.js');

var staticdir = '/static';	// common content
var webdir = '/web';
var mobiledir = '/mobile';

// Connect to data
mongoose.connect(config.mongodb);

// Init seed data - this may not be needed in your application
employee.seed();

// Setup server
var app = express.createServer();
app.listen(config.port);
var io = require('./lib/chat.js')(app);
//var assetMiddleware = require('./lib/asset.js');
app.configure(function() {
	app.set('views', __dirname+'/views');
	app.set('view options', { layout:false });
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.staticCache());
	//app.use(assetMiddleware);
	app.use(express.session({ 'store':sessionStore, secret:config.sessionSecret }));
	app.use(staticdir, 	express.static(__dirname+staticdir));
	app.use(webdir, 	express.static(__dirname+webdir));
	app.use(mobiledir,	express.static(__dirname+mobiledir));
	app.use(app.router);
});

// Make assets available to index.ejs
app.dynamicHelpers({
//	'assetsCache': function(req, res) {
//		return assetMiddleware.cacheHashes;
//	},
    'isProduction': function(req, res) {
        return 'production' === config.environment;
    },
    'useragent': function(req, res) {
        return req.useragent;
    }
});

//setup the errors
app.error(function(err, req, res, next) {
	if (err instanceof NotFound) {
		res.render('404.jade', { locals:{
			title:'404 - Not Found',
			description:'',
			author:'',
			analyticssiteid:'XXXXXXX'
		}, status:404 });
	} else {
		res.render('500.jade', { locals:{
			title:'The Server Encountered an Error',
			description:'',
			author:'',
			analyticssiteid:'XXXXXXX',
			error:err
		}, status:500 });
	}
});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////
// Index route - depends upon the useragent
app.get('/', function(req, res) {
	useragent(req, res);
    var index = req.useragent.mobile ? mobiledir+'/index.ejs' : webdir+'/index.ejs';
	console.log('index: ', index, config.environment);
	res.render(__dirname+index);
});

// API routes return JSON
app.get('/api/employees', employee.getEmployees);
app.get('/api/employees/:id', employee.getEmployee);
app.get('/api/employees/:id/reports', employee.getReports);
app.get('/api/employees/search/:query', employee.findByName);

//A Route for Creating a 500 Error (Useful to keep around)
app.get('/500', function(req, res) {
	throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('/*', function(req, res) {
	throw new NotFound();
});

function NotFound(msg) {
	this.name = 'NotFound';
	Error.call(this, msg);
	Error.captureStackTrace(this, arguments.callee);
}

console.log('Listening on http://0.0.0.0:' + config.port);
