var libStoryPreview = require('../lib/storyPreview');

module.exports = function(req, res) {
	res.render('self-stories', {layout: 'main_private', storyPreviews: libStoryPreview.getStories()});
};