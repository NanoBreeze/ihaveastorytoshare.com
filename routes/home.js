
/* GET home page. */
// router.get('/hey', function(req, res, next) {
// 	console.log('/hey is called!');
//   res.render('home', { title: 'Express' });
// });

// module.exports = router;

module.exports = function(req, res) {
	res.render('home', { layout: 'main_public'});
};