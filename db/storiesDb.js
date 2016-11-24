/**
 * Created by Lenny on 2016-11-19.
 */

var User = require('./user');

exports.getStoryWithId = function(storyId) {
    console.log('getStoryWithId(...) called');
    console.log(storyId);
    return User.findOne({ 'stories._id': storyId}, {stories: {$elemMatch: {_id: storyId}}}).exec();
};

exports.getStories = function() {
    console.log('getStories() called');

    return User.find({ firstName: 'Lenny'}, 'stories').exec();
}

exports.deleteStory = function(storyId) {
    console.log('the id is: ' + storyId);
    return User.update( {firstName: 'Lenny'},
        { $pull: {stories: {_id: storyId}}}).exec();
};



//no error handling yet or ensure values must be right. Also, partial updates aren't supported right now.
exports.putStory = function(storyId, updateStoryValue) {
    console.log('putStory(...) called');

    var updateValue = {};
    for (var prop in updateStoryValue) {
        var sProp = prop.toString();
        updateValue['stories.$.' + sProp] = updateStoryValue[prop];
    }

    //because the user isn't allowed to include _id into the body
    updateValue['stories.$._id'] = storyId;

    console.log(updateValue);

    return User.findOneAndUpdate({ 'stories._id' : storyId}, {$set: updateValue}, {select: { 'stories': { $elemMatch:{ '_id' : storyId }}}, new: true}).exec();
};


exports.postStory = function(storyToPost) {
    console.log('postStory(...) called');
    console.log(storyToPost);
    // return User.findOneAndUpdate({firstName:'Lenny'}, {$push: {stories: storyToPost}}).exec();
    // return User.findOneAndUpdate({ firstName : 'Lenny'}, {push: {stories: storyToPost}}).exec();
    return User.findOneAndUpdate({firstName:'Lenny'}, {$push: {stories: storyToPost}}, {select: {'stories' : {$slice: -1}} , new:true}).exec();
};