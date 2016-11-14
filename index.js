var express = require('express');
var app = express();

//set up handlebars view engine
var handlebars = require('express-handlebars').create(
{
	layoutsDir: __dirname + '/views/layouts',
		// defaultLayout: __dirname + '/views/layouts/default',
		partialDir: __dirname + '/views/partials',
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

//Routes
var home = require('./routes/home');

app.use('/', home);


// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/27017');
// var Schema = mongoose.Schema;

// // create a schema
// var userSchema = new Schema({
//   name: String,
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   admin: Boolean,
//   location: String,
//   meta: {
//     age: Number,
//     website: String
//   },
//   created_at: Date,
//   updated_at: Date
// });

// var User=mongoose.model('User', userSchema);

// userSchema.methods.dudify = function() {
//   // add some stuff to the users name
//   this.name = this.name + '-dude'; 

//   return this.name;
// };

// create a new user called chris
// var chris = new User({
//   name: 'Chris',
//   username: 'sevilayha',
//   password: 'password' 
// });

// // call the custom method. this will just add -dude to his name
// // user will now be Chris-dude
// chris.dudify(function(err, name) {
//   if (err) throw err;

//   console.log('Your new name is ' + name);
// });

// call the built-in save method to save to the database
chris.save(function(err) {
  if (err) throw err;

  console.log('User saved successfully!');
});


var libStoryPreview = require('./lib/storyPreview');



// app.use(function(req, res, nest) {
// 	if (!res.locals.partials) { res.locals.partials = {}; }
// 	res.locals.partials.storyPreviews = libStoryPreview.getStories();
// 	next();
// });

// app.get('/', function(req, res) {
// 	res.render('home', { layout: 'main_public'});
// 	// var specialText = "sodifjosdijfsodijf";

// 	//var specialText2 = "specialText2";
// 	//res.render('home', {specialText: specialText, specialText2: fortune.getFortune() });
// });


app.get('/self-stories', function(req, res) {
	res.render('self-stories', {layout: 'main_private', storyPreviews: libStoryPreview.getStories()});
	// var specialText = "sodifjosdijfsodijf";

	//var specialText2 = "specialText2";
	//res.render('home', {specialText: specialText, specialText2: fortune.getFortune() });
});

app.get('/write', function(req, res) {

	res.render('write', {layout: 'main_private'});
});

app.get('/dashboard', function(req, res) {

	res.render('dashboard', {layout: 'main_private'});
});


app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

