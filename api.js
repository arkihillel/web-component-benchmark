const restify 		= require('restify');

var api = restify.createServer({
	name: 			'Web Component Benchmark'
});

api.listen(9000, function() {
	console.log('%s listening at %s', api.name, api.url);
});

api.use(restify.bodyParser());
api.use(restify.queryParser({mapParams: false}));

api.pre(function(req, res, next) {
	req.headers.accept = 'application/json';
	return next();
});

api.post('/stats', (req, res, next) => {
	console.log(req.params);
	res.send();
});