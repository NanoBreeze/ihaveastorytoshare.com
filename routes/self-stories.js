var forms = require('../db/forms');

module.exports = function(req, res) {
	var promise = forms.readStories();
	promise.then(function(storyArray){
		var stories = storyArray[0].stories;
		console.log(stories);
		res.render('self-stories', {layout: 'main_private', storyPreviews: stories});

	});
};