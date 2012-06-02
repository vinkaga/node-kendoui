var request = require('request');
var should = require('should');
var config = require('../config.js');

describe('API', function(){
		
	describe('Employees', function(){
				
		it('should get all employees', function(done) {
			request(config.uri + '/api/employees', function (err, res, body) {
				should.not.exist(err);
				var objs = JSON.parse(body);
				should.exist(objs);
				objs.should.have.lengthOf(12);
				done();
			});
		});
				
		it('should get an employee', function(done) {
			request(config.uri + '/api/employees/000000000000000000000002', function (err, res, body) {
				should.not.exist(err);
				var obj = JSON.parse(body);
				should.exist(obj);
				obj.firstName.should.equal('Julie');
				obj.lastName.should.equal('Taylor');
				done();
			});
		});

		it('should get direct reports', function(done) {
			request(config.uri + '/api/employees/000000000000000000000002/reports', function (err, res, body) {
				should.not.exist(err);
				var objs = JSON.parse(body);
				should.exist(objs);
				objs.should.have.lengthOf(2);
				objs[0].firstName.should.equal('Gary');
				objs[0].lastName.should.equal('Donovan');
				objs[1].firstName.should.equal('Lisa');
				objs[1].lastName.should.equal('Wong');
				done();
			});
		});
				
		it('should search', function(done) {
			request(config.uri + '/api/employees/search/jo', function (err, res, body) {
				should.not.exist(err);
				var objs = JSON.parse(body);
				should.exist(objs);
				objs.should.have.lengthOf(3);
				objs[0].lastName.should.equal('Jones');
				objs[1].lastName.should.equal('Jones');
				objs[2].firstName.should.equal('John');
				done();
			});
		});
	});
		
});
