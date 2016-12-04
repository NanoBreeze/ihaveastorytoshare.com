/**
 * Created by Lenny on 2016-11-15.
 */

var forms = require('../db/forms');

exports.show = function(req, res) {
    console.log("story.show()");
    var storyId = req.params.id; //eg, /story/58493f7gds

    console.log(req.session.facebookId);
    if (req.session.facebookId) {
        forms.readOwnStory(req.session.facebookId, storyId).then(function (storyArray){
            console.log('inside if');

            //this is user's own story
            if (storyArray)
            {
                console.log(storyArray);
                var story = storyArray.stories[0];
                console.log(story);
                res.setHeader('Cache-control', 'private, max-age=60');
                res.render('story', {layout: 'main_private', story: story, isOwner: true})
            }
            else {
                forms.readPublicStory(storyId).then(function(storyArray) {
                    console.log('inside else')
                    var story = storyArray.stories[0];
                    console.log(story);
                    res.setHeader('Cache-control', 'private, max-age=60');
                    res.render('story', {layout: 'main_private', story: story})
                });
            }

        });
    }
    else {
        forms.readPublicStory(storyId).then(function(storyArray) {
            console.log('inside else')
            var story = storyArray.stories[0];
            console.log(story);
            res.setHeader('Cache-control', 'public, max-age=60');
            res.render('story', {layout: 'main_public', story: story})
        });
    }
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
    });
};