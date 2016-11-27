var forms = require('../db/forms');

module.exports = function(req, res) {
	var publishedPromise = forms.readPublishedStories(req.session.facebookId);
	var savedPromise = forms.readSavedStories(req.session.facebookId);

	Promise.all([publishedPromise, savedPromise]).then(function(storyArray){
		var publishedStoryPreviews = storyArray[0][0].stories;
		var savedStoryPreviews = storyArray[1][0].stories;

		res.render('self-stories', {layout: 'main_private', publishedStoryPreviews: publishedStoryPreviews,
															savedStoryPreviews: savedStoryPreviews});
	});
};