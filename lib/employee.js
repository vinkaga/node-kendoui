var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

exports.Employee = mongoose.model('Employee', new mongoose.Schema(
	{
		firstName:String,
		lastName:String,
		managerId:ObjectId,
		title:String,
		department:String,
		officePhone:String,
		cellPhone:String,
		email:String,
		city:String,
		picture:String,
		twitterId:String,
		blogURL:String
	}));

// Seed data
var employees = [
	{_id:'000000000000000000000012',firstName:'Steven',lastName:'Wells',managerId:'000000000000000000000004',title:'Software Architect',department:'Engineering',officePhone:'617-000-0012',cellPhone:'781-000-0012',email:'swells@fakemail.com',city:'Boston MA',picture:'steven_wells.jpg',twitterId:'@fakeswells',blogURL:'http://coenraets.org',reportCount:0},
	{_id:'000000000000000000000011',firstName:'Amy',lastName:'Jones',managerId:'000000000000000000000005',title:'Sales Representative',department:'Sales',officePhone:'617-000-0011',cellPhone:'781-000-0011',email:'ajones@fakemail.com',city:'Boston MA',picture:'amy_jones.jpg',twitterId:'@fakeajones',blogURL:'http://coenraets.org',reportCount:0},
	{_id:'000000000000000000000010',firstName:'Kathleen',lastName:'Byrne',managerId:'000000000000000000000005',title:'Sales Representative',department:'Sales',officePhone:'617-000-0010',cellPhone:'781-000-0010',email:'kbyrne@fakemail.com',city:'Boston MA',picture:'kathleen_byrne.jpg',twitterId:'@fakekbyrne',blogURL:'http://coenraets.org',reportCount:0},
	{_id:'000000000000000000000009',firstName:'Gary',lastName:'Donovan',managerId:'000000000000000000000002',title:'Marketing',department:'Marketing',officePhone:'617-000-0009',cellPhone:'781-000-0009',email:'gdonovan@fakemail.com',city:'Boston MA',picture:'gary_donovan.jpg',twitterId:'@fakegdonovan',blogURL:'http://coenraets.org',reportCount:0},
	{_id:'000000000000000000000008',firstName:'Lisa',lastName:'Wong',managerId:'000000000000000000000002',title:'Marketing Manager',department:'Marketing',officePhone:'617-000-0008',cellPhone:'781-000-0008',email:'lwong@fakemail.com',city:'Boston MA',picture:'lisa_wong.jpg',twitterId:'@fakelwong',blogURL:'http://coenraets.org',reportCount:0},
	{_id:'000000000000000000000007',firstName:'Paula',lastName:'Gates',managerId:'000000000000000000000004',title:'Software Architect',department:'Engineering',officePhone:'617-000-0007',cellPhone:'781-000-0007',email:'pgates@fakemail.com',city:'Boston MA',picture:'paula_gates.jpg',twitterId:'@fakepgates',blogURL:'http://coenraets.org',reportCount:0},
	{_id:'000000000000000000000006',firstName:'Paul',lastName:'Jones',managerId:'000000000000000000000004',title:'QA Manager',department:'Engineering',officePhone:'617-000-0006',cellPhone:'781-000-0006',email:'pjones@fakemail.com',city:'Boston MA',picture:'paul_jones.jpg',twitterId:'@fakepjones',blogURL:'http://coenraets.org',reportCount:0},
	{_id:'000000000000000000000005',firstName:'Ray',lastName:'Moore',managerId:'000000000000000000000001',title:'VP of Sales',department:'Sales',officePhone:'617-000-0005',cellPhone:'781-000-0005',email:'rmoore@fakemail.com',city:'Boston MA',picture:'ray_moore.jpg',twitterId:'@fakermoore',blogURL:'http://coenraets.org',reportCount:2},
	{_id:'000000000000000000000004',firstName:'John',lastName:'Williams',managerId:'000000000000000000000001',title:'VP of Engineering',department:'Engineering',officePhone:'617-000-0004',cellPhone:'781-000-0004',email:'jwilliams@fakemail.com',city:'Boston MA',picture:'john_williams.jpg',twitterId:'@fakejwilliams',blogURL:'http://coenraets.org',reportCount:3},
	{_id:'000000000000000000000003',firstName:'Eugene',lastName:'Lee',managerId:'000000000000000000000001',title:'CFO',department:'Accounting',officePhone:'617-000-0003',cellPhone:'781-000-0003',email:'elee@fakemail.com',city:'Boston MA',picture:'eugene_lee.jpg',twitterId:'@fakeelee',blogURL:'http://coenraets.org',reportCount:0},
	{_id:'000000000000000000000002',firstName:'Julie',lastName:'Taylor',managerId:'000000000000000000000001',title:'VP of Marketing',department:'Marketing',officePhone:'617-000-0002',cellPhone:'781-000-0002',email:'jtaylor@fakemail.com',city:'Boston MA',picture:'julie_taylor.jpg',twitterId:'@fakejtaylor',blogURL:'http://coenraets.org',reportCount:2},
	{_id:'000000000000000000000001',firstName:'James',lastName:'King',managerId:'000000000000000000000001',title:'President and CEO',department:'Corporate',officePhone:'617-000-0001',cellPhone:'781-000-0001',email:'jking@fakemail.com',city:'Boston MA',picture:'james_king.jpg',twitterId:'@fakejking',blogURL:'http://coenraets.org',reportCount:5}];

exports.seed = function() {
	mongoose.connection.db.executeDbCommand({dropDatabase:1});
	for (var i = 0; i < employees.length; i++) {
		var employee = new exports.Employee(employees[i]);
		employee.save();
	}
}

exports.getEmployees = function(req, res) {
	exports.Employee.find({}, function(err, objs){
		res.json(objs);
	});
};

exports.getEmployee = function(req, res) {
	var id = req.params.id;
	exports.Employee.findById(id, function(err, obj){
		res.json(obj);
	});
};

exports.getReports = function(req, res) {
	var id = req.params.id;
	exports.Employee.find({ managerId:id}, function(err, objs){
		res.json(objs);
	});
};

exports.findByName = function(req, res) {
	var query = req.params.query;
	var re = new RegExp(query, 'i');
	exports.Employee.find({ $or: [ {lastName:re}, {firstName:re} ]}, function(err, obj){
		res.json(obj);
	});
}
