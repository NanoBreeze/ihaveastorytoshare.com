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






//Create document with name Lenny
//
// var User = require('./db/user');
//
// var lenny = new User({
// 	firstName: 'Lenny',
// 	lastName: 'Something',
// 	email: 'something@something.com',
// 	interests: 'Node.js, web development',
// 	stories: [{
// 		title: "this is the title1",
// 		subTitle: "this is the subtitle1",
// 		content: "this is the content1",
// 		dateCreated: Date.now()
// 	}]
// });
//
// lenny.save(function(err) {
// 	if (err) throw err;
//
// 	console.log('User saved successfully!');
// });












var home = require('./routes/home');
var dashboard = require('./routes/dashboard');
var selfStories = require('./routes/self-stories');
var write = require('./routes/write');

app.get('/', home);
app.get('/dashboard', dashboard.show);
app.get('/self-stories', selfStories);
app.get('/write', write.show);

app.post('/updateProfile', dashboard.updateProfile);
app.post('/publishStory', write.publishStory);
//
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/27017');
// var Schema = mongoose.Schema;
//
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
//
// var User=mongoose.model('User2', userSchema);
//
// // userSchema.methods.dudify = function() {
// //   // add some stuff to the users name
// //   this.name = this.name + '-dude';
//
// //   return this.name;
// // };
//
// // create a new user called chris
// var chris = new User({
//   name: 'Lenny2',
//   username: 'lenny2',
//   password: 'password'
// });
//
// // // call the custom method. this will just add -dude to his name
// // // user will now be Chris-dude
// // chris.dudify(function(err, name) {
// //   if (err) throw err;
//
// //   console.log('Your new name is ' + name);
// // });
//
// // call the built-in save method to save to the database
// chris.save(function(err) {
//   if (err) throw err;
//
//   console.log('User saved successfully!');
// });
//


app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port'));
});

