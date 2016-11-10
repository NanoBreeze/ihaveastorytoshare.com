var express = require('express');
var app = express();

//set up handlebars view engine
var handlebars = require('express-handlebars').create(
	{
		layoutsDir: __dirname + '/views/layouts',
		// defaultLayout: __dirname + '/views/layouts/default',
		partialDir: __dirname + 'views/partials',
		extname: '.hbs',
		helpers: {
			section: function(name, options){
				if(!this._sections) this._sections = {};
				this._sections[name] = options.fn(this);
				return null;
			}
	}
});

app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use(require('body-parser')());

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
	if (4>5)
		console.log('hi')
	res.render('hello', {layout: 'main_private'});
	// var specialText = "sodifjosdijfsodijf";

	//var specialText2 = "specialText2";
	//res.render('home', {specialText: specialText, specialText2: fortune.getFortune() });
});



app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

