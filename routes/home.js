
/* GET home page. */


module.exports = function(req, res) {
	res.setHeader('Cache-control', 'public, max-age=31557600');
	res.render('home', { layout: 'main_public'});
};