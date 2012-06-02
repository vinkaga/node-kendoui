var config = require('../config.js');
var assetManager = require('connect-assetmanager');
var assetHandler = require('connect-assetmanager-handlers');

// Setup groups for CSS / JS assets
// Make sure they match with index for each type of device
var assetSettings = {
	// for /mobile
	'mobilejs': {
		'route': /\/mobile\/js\/cache\/[a-z0-9]+\/.*\.js/
		, 'path': '.'
		, 'dataType': 'javascript'
		, 'files': [
            'http://code.jquery.com/jquery-1.7.1.min.js'
            , 'http://cdn.kendostatic.com/2012.1.322/js/kendo.all.min.js'
        ]
		, 'stale': true
		, 'postManipulate': {
			'^': [
				assetHandler.uglifyJsOptimize
				, function insertSocketIoPort(file, path, index, isLast, callback) {
					callback(file.replace(/.#socketIoPort#./, config.port));
				}
			]
		}
	}
	, 'mobilecss': {
		'route': /\/mobile\/css\/cache\/[a-z0-9]+\/.*\.css/
		, 'path': '.'
		, 'dataType': 'css'
		, 'files': [
            'http://cdn.kendostatic.com/2012.1.322/styles/kendo.common.min.css'
            , 'http://cdn.kendostatic.com/2012.1.322/styles/kendo.default.min.css'
            , 'http://cdn.kendostatic.com/2012.1.322/styles/kendo.mobile.all.min.css'
        ]
		, 'stale': true
		, 'postManipulate': {
			'^': [
				assetHandler.fixVendorPrefixes
				, assetHandler.fixGradients
				, assetHandler.yuiCssOptimize
			]
		}
	}

	// for /web
	, 'webjs': {
		'route': /\/web\/js\/cache\/[a-z0-9]+\/.*\.js/
		, 'path': '.'
		, 'dataType': 'javascript'
		, 'files': [
            'http://code.jquery.com/jquery-1.7.1.min.js'
            , 'http://cdn.kendostatic.com/2012.1.322/js/kendo.web.min.js'
        ]
		, 'stale': true
		, 'postManipulate': {
			'^': [
				assetHandler.uglifyJsOptimize
				, function insertSocketIoPort(file, path, index, isLast, callback) {
					callback(file.replace(/.#socketIoPort#./, config.port));
				}
			]
		}
	}
	, 'webcss': {
		'route': /\/web\/css\/cache\/[a-z0-9]+\/.*\.css/
		, 'path': '.'
		, 'dataType': 'css'
		, 'files': [
            'http://cdn.kendostatic.com/2012.1.322/styles/kendo.common.min.css'
            , 'http://cdn.kendostatic.com/2012.1.322/styles/kendo.default.min.css'
        ]
		, 'stale': true
		, 'postManipulate': {
			'^': [
				assetHandler.fixVendorPrefixes
				, assetHandler.fixGradients
				, assetHandler.yuiCssOptimize
			]
		}
	}
};

module.exports = assetManager(assetSettings);