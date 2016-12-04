const express = require('express');
const app = express();

//set up handlebars view engine
const handlebars = require('express-handlebars').create(
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

const passport = require('passport');
const session = require('express-session');
require('./authentication/passport')(passport);
const basicAuth = require('./authentication/basic');















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


// initialize passposrt and and session for persistent login sessions
app.use(session({
	secret: "tHiSiSasEcRetStr",
	resave: true,
	saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());






var login = require('./routes/login');

var home = require('./routes/home');
app.get('/login', login);

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		successRedirect : '/dashboard',
		failureRedirect : '/',
	}));




var dashboard = require('./routes/dashboard');

app.get('/', home.determineLayout, home.show);


// route for logging out
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});




var selfStories = require('./routes/self-stories');
var write = require('./routes/write');
var story = require('./routes/story');
var apiKey = require('./routes/apiKey');

//apidoc automatically placed in public directory
app.get('/publicStories', story.determineLayout, story.showPublic);

app.get('/apiKey', apiKey.isLoggedIn, apiKey.show);
app.get('/write', write.isLoggedIn, write.show);

app.get('/dashboard', dashboard.show);
app.get('/self-stories', selfStories);
app.get('/write/:id', write.edit)
app.get('/story/:id', story.show);
app.get('/deleteStory/:id', story.deleteStory);


app.post('/updateProfile', dashboard.updateProfile);

app.post('/publishStory',  write.publishStory);
app.post('/saveStory', write.saveStory);


////////////////////////API

var profileController = require('./routes/controllers/profileController');
var storiesController = require('./routes/controllers/storiesController');

app.get('/api/profile', basicAuth.isAuthenticated, profileController.getProfile);
app.put('/api/profile', basicAuth.isAuthenticated, profileController.putProfile);
app.use('/api/profile', profileController.methodNotAllowed);


app.put('/api/stories/:id', basicAuth.isAuthenticated, storiesController.putStory);
app.get('/api/stories/:id', basicAuth.isAuthenticated, storiesController.getStoryWithId);
app.get('/api/stories', basicAuth.isAuthenticated, storiesController.getStories);
app.delete('/api/stories/:id', basicAuth.isAuthenticated, storiesController.deleteStory);
app.post('/api/stories', basicAuth.isAuthenticated, storiesController.postStory);

app.use('/api/stories', basicAuth.isAuthenticated, storiesController.methodNotAllowed);
app.use('/api/stories/:id', basicAuth.isAuthenticated, storiesController.methodNotAllowed);

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port'));
});

