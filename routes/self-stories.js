var forms = require('../db/forms');

module.exports = function(req, res) {
	var publishedPromise = forms.readPublishedStories();
	var savedPromise = forms.readSavedStories();

	// p2.then(function(a){
	// 	console.log(a);
	// 	console.log('=========================');
	// 	console.log(a[0].stories);
	// });

	Promise.all([publishedPromise, savedPromise]).then(function(storyArray){
		var publishedStoryPreviews = storyArray[0][0].stories;
		var savedStoryPreviews = storyArray[1][0].stories;
		console.log(publishedStoryPreviews);
		console.log('===========================');
		console.log(savedStoryPreviews);
		// console.log('inside Promise.all');
		// console.log(storyArray);
		// console.log('===========================');
		// console.log(storyArray[0][0].stories);
		// var stories = storyArray[0].stories;
		// console.log(stories);

		res.render('self-stories', {layout: 'main_private', publishedStoryPreviews: publishedStoryPreviews,
															savedStoryPreviews: savedStoryPreviews});
	});
	// promise.then(function(storyArray){
	// 	var stories = storyArray[0].stories;
	// 	console.log(stories);
    //
	// 	res.render('self-stories', {layout: 'main_private', storyPreviews: stories});
	// });
}