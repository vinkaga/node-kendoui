var soda = require('soda');
var config = require('../config.js');

function getBrowser(url, browser) {
	return soda.createClient({ url:config.uri, browser: browser })
		.chain
		.session()
		.open(url)
	;
}

describe('Web - Firefox', function() {
	describe('Home', function() {
		it('Should not be empty', function(done) {
			this.timeout(config.selenium.testtimeout);
			var browser = getBrowser('/', '*firefox');
			browser
				.waitForElementPresent('//a[text()="Node Backbone"]')
				.assertElementPresent('//a[text()="Node Backbone"]')
				.end(function(err) {
					browser.testComplete(function() {
						if (err) {
							throw err;
						}
						done();
					});
				});
		});
	});
	describe('Search', function() {
		it('Should give results', function(done) {
			this.timeout(config.selenium.testtimeout);
			var browser = getBrowser('/', '*firefox');
			browser
				.waitForElementPresent('//input')
				.assertElementPresent('//input')
				.keyUp('//input', 'a')
				.waitForElementPresent('//input/..//ul//li')
				.assertElementPresent('//input/..//ul//li')
				.end(function(err) {
					browser.testComplete(function() {
						if (err) {
							throw err;
						}
						done();
					});
				});
		});
	});
	describe('Search result', function() {
		it('Should take to detail page', function(done) {
			this.timeout(config.selenium.testtimeout);
			var browser = getBrowser('/', '*firefox');
			browser
				.waitForElementPresent('//input')
				.assertElementPresent('//input')
				.keyUp('//input', 'a')
				.waitForElementPresent('//input/..//ul//li')
				.assertElementPresent('//input/..//ul//li')
				.click('//input/..//ul//li')
				.waitForTextPresent('Amy Jones')
				.assertTextPresent('Amy Jones')
				.end(function(err) {
					 browser.testComplete(function() {
						 if (err) {
							 throw err;
						 }
						 done();
					 });
				 });
		});
	});
	describe('Detail page', function() {
		it('Should link to manager', function(done) {
			this.timeout(config.selenium.testtimeout);
			var browser = getBrowser('/#employees/000000000000000000000011', '*firefox');
			browser
				.waitForElementPresent('//a[text()="Manager"]')
				.assertElementPresent('//a[text()="Manager"]')
				.click('//a[text()="Manager"]')
				.waitForTextPresent('Ray Moore')
				.assertTextPresent('Ray Moore')
				.waitForElementPresent('//h3[text()="Direct Reports"]/..//li')
				.assertElementPresent('//h3[text()="Direct Reports"]/..//li')
				.end(function(err) {
					browser.testComplete(function() {
						if (err) {
							throw err;
						}
						done();
					});
				});
		});
	});
});

describe('Web - Chrome', function() {
	describe('Home', function() {
		it('Should not be empty', function(done) {
			this.timeout(config.selenium.testtimeout);
			var browser = getBrowser('/', '*googlechrome');
			browser
				.waitForElementPresent('//a[text()="Node Backbone"]')
				.assertElementPresent('//a[text()="Node Backbone"]')
				.end(function(err) {
					browser.testComplete(function() {
						if (err) {
							throw err;
						}
						done();
					});
				});
		});
	});
	describe('Search', function() {
		it('Should give results', function(done) {
			this.timeout(config.selenium.testtimeout);
			var browser = getBrowser('/', '*googlechrome');
			browser
				.waitForElementPresent('//input')
				.assertElementPresent('//input')
				.keyUp('//input', 'a')
				.waitForElementPresent('//input/..//ul//li')
				.assertElementPresent('//input/..//ul//li')
				.end(function(err) {
					browser.testComplete(function() {
						if (err) {
							throw err;
						}
						done();
					});
				});
		});
	});
	describe('Search result', function() {
		it('Should take to detail page', function(done) {
			this.timeout(config.selenium.testtimeout);
			var browser = getBrowser('/', '*googlechrome');
			browser
				.waitForElementPresent('//input')
				.assertElementPresent('//input')
				.keyUp('//input', 'a')
				.waitForElementPresent('//input/..//ul//li')
				.assertElementPresent('//input/..//ul//li')
				.click('//input/..//ul//li')
				.waitForTextPresent('Amy Jones')
				.assertTextPresent('Amy Jones')
				.end(function(err) {
					browser.testComplete(function() {
						if (err) {
							throw err;
						}
						done();
					});
				});
		});
	});
	describe('Detail page', function() {
		it('Should link to manager', function(done) {
			this.timeout(config.selenium.testtimeout);
			var browser = getBrowser('/#employees/000000000000000000000011', '*googlechrome');
			browser
				.waitForElementPresent('//a[text()="Manager"]')
				.assertElementPresent('//a[text()="Manager"]')
				.click('//a[text()="Manager"]')
				.waitForTextPresent('Ray Moore')
				.assertTextPresent('Ray Moore')
				.waitForElementPresent('//h3[text()="Direct Reports"]/..//li')
				.assertElementPresent('//h3[text()="Direct Reports"]/..//li')
				.end(function(err) {
					browser.testComplete(function() {
						if (err) {
							throw err;
						}
						done();
					});
				});
		});
	});
});
