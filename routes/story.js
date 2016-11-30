/**
 * Created by Lenny on 2016-11-15.
 */

var forms = require('../db/forms');

exports.show = function(req, res) {
    var storyId = req.params.id; //eg, /story/58493f7gds
    var promise = forms.readPublicStory(storyId);
    promise.then(function(storyArray) {
        console.log('inside then' + storyArray.stories.length)
        if (storyArray.stories.length > 0) //not sure why storyArray.stories isn't enough
        {
            console.log('inside if')
            var story = storyArray.stories[0];
            res.setHeader('Cache-control', 'public, max-age=84600');
            res.render('story', {layout: 'main_private', story: story})
        }
        else {
            console.log('inside else');
            console.log(req.session.facebookId);
            forms.readOwnStory(req.session.facebookId, storyId).then(function(storyArray) {
                console.log(storyArray);
                var story = storyArray.stories[0];
                res.setHeader('Cache-control', 'public, max-age=84600');
                res.render('story', {layout: 'main_private', story: story, isOwner: true})
            });
        }
    })
};

exports.deleteStory = function(req, res) {
    var storyId = req.params.id; //eg, /story/58493f7gds
    var promise = forms.deleteStory(req.session.facebookId, storyId);

    promise.then(function() {
       res.redirect(303, '/self-stories')
    });
};



exports.determineLayout = function(req, res, next) {
    if (req.isAuthenticated()) { req.session.layout = 'main_private'; }
    else { req.session.layout = 'main_public'; }

    return next();
};

exports.showPublic = function(req, res) {
    var promise = forms.readAllPublishedStories();

    promise.then(function(storyArray){
        var publishedStories = [];

        //the individual stories are in an array that's in another array
        for (var i = 0; i < storyArray.length; i++){
            for (var j = 0; j < storyArray[i].stories.length; j++)
            {
                publishedStories.push(storyArray[i].stories[j]);
            }
        }

        console.log(publishedStories);
        res.render('publicStories', {layout: req.session.layout, storyPreviews: publishedStories});

        // console.log(storyArray[0].stories);
        // var publishedStoryPreviews = storyArray[0].stories;
        // var savedStoryPreviews = storyArray[1][0].stories;

        // res.render('self-stories', {layout: 'main_private', publishedStoryPreviews: publishedStoryPreviews,
        //     savedStoryPreviews: savedStoryPreviews});
    });
};