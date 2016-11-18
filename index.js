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






// Create document with name Lenny
//
// var User = require('./db/user');
//
// var lenny = new User({
// 	firstName: 'Lenny',
// 	lastName: 'Something',
// 	email: 'something@something.com',
// 	interests: 'Node.js, web development',
// 	dateJoined: Date.now(),
// 	stories: [{
// 		title: "this is the title1",
// 		subTitle: "this is the subtitle1",
// 		content: "this is the content1",
// 		status: 'Published',
// 		dateCreated: Date.now()
// 	}]
// });
//
// lenny.save(function(err) {
// 	if (err) throw err;
//
// 	console.log('User saved successfully!');
// });
//











var home = require('./routes/home');
var dashboard = require('./routes/dashboard');
var selfStories = require('./routes/self-stories');
var write = require('./routes/write');
var story = require('./routes/story');

app.get('/', home);
app.get('/dashboard', dashboard.show);
app.get('/self-stories', selfStories);
app.get('/write', write.show);
app.get('/write/:id', write.edit)
app.get('/story/:id', story.show);
app.get('/deleteStory/:id', story.deleteStory);



app.post('/updateProfile', dashboard.updateProfile);

app.post('/publishStory', write.publishStory);
app.post('/saveStory', write.saveStory);

////////////////////////API

var profileController = require('./routes/controllers/profileController');

app.get('/api/profile', profileController.getProfile);
app.put('/api/profile', profileController.putProfile);

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port'));
});

