var UserAgent = function() {

	return function(req, res, next) {
        var agent = {};
        agent.source = req.headers['user-agent'];
        var source = agent.source.toLowerCase();

        agent.mobile = (/iphone|ipod|android|blackberry|opera mini|opera mobi|windows phone|iemobile/i.test(source));
        agent.tablet = (/ipad|tablet|kindle|silk/i.test(source)) || (/android/i.test(source)) && !(/mobile/i.test(source));
        agent.ios = (/iphone|ipod|ipad/i.test(source));

        agent.mobile = agent.mobile || agent.tablet;

		req.useragent = agent;
		res.locals('useragent', agent);
	};
};

exports = module.exports = new UserAgent();
