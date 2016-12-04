var forms = require('../db/forms');

module.exports = function(req, res) {
	var publishedPromise = forms.readPublishedStories(req.session.facebookId);
	var savedPromise = forms.readSavedStories(req.session.facebookId);

	console.log('about to call promise');
	Promise.all([publishedPromise, savedPromise]).then(function(storyArray){
		console.log('inside promise');
		console.log(storyArray);

		var publishedStoryPreviews = null;
		if (storyArray[0][0]) {
			publishedStoryPreviews = storyArray[0][0].stories;
		}

		var savedStoryPreviews = null;
		if (storyArray[1][0]) {
			savedStoryPreviews = storyArray[1][0].stories;
		}

		res.render('self-stories', {layout: 'main_private', publishedStoryPreviews: publishedStoryPreviews,
															savedStoryPreviews: savedStoryPreviews});
	});
};