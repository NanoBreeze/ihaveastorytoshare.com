/**
 * Created by Lenny on 2016-11-15.
 */

var forms = require('../db/forms');

module.exports = function(req, res) {
    var storyId = req.params.id; //eg, /story/58493f7gds
    var promise = forms.readSingleStory(storyId);
    promise.then(function(storyArray) {
        var story = storyArray.stories[0];
        res.render('story', {layout: 'main_private', story: story});

    })
};