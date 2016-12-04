/**
 * Created by Lenny on 2016-11-14.
 */

var User = require('../db/user');

exports.createNewStory = function(facebookId, title, subTitle, content, dateCreated, keywords, status) {
    console.log('createNewStory(...) called');

    var newStory={
        title: title,
        subTitle: subTitle,
        content: content,
        dateCreated: dateCreated,
        keywords: keywords,
        status: status
    };

    console.log(newStory);

    return User.findOneAndUpdate({'facebookCredentials.id': facebookId}, {$push: {stories: newStory}}).exec();
};

exports.updateStory = function(facebookId, title, subTitle, content, dateCreated, keywords, status, id) {
    console.log('createNewStory(...) called');

    var updatedStory={
        title: title,
        subTitle: subTitle,
        content: content,
        dateCreated: dateCreated,
        keywords: keywords,
        status: status,
        _id: id
    };

    return User.update({ 'facebookCredentials.id': facebookId, 'stories._id' : id}, {$set: {'stories.$': updatedStory}}).exec();
};


exports.updateProfile = function(facebookId, firstName, lastName, email, interests) {
    console.log('updateProfile(...) called');

    var updatedProfile = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        interests: interests
    };


    return User.findOneAndUpdate({'facebookCredentials.id': facebookId}, updatedProfile).exec();
}

exports.readProfile = function(facebookId) {
    console.log('readProfile() called. The value of facebookId is: ' + facebookId);

    var promise = User.findOne({ 'facebookCredentials.id': facebookId}).exec();
    return promise;
}

exports.readPublishedStories = function(facebookId) {
    console.log('readPublishedStories() called');

    // return User.find({ firstName: 'Lenny', 'stories.status': 'Published'}, {stories: {$elemMatch: {status: 'Published'}}}).exec();

    return User.aggregate(
        { $match: { 'facebookCredentials.id': facebookId, 'stories.status': 'Published'}},
        { $project: {
            stories: {$filter: {
                input: '$stories',
                as: 'story',
                cond: {$eq: ['$$story.status', 'Published']}
            }}
        }}
    );
};

exports.readSavedStories = function(facebookId) {
    console.log('readSavedStories() called');

    return User.aggregate(
        { $match: { 'facebookCredentials.id': facebookId, 'stories.status': 'Saved'}},
        { $project: {
            stories: {$filter: {
                input: '$stories',
                as: 'story',
                cond: {$eq: ['$$story.status', 'Saved']}
            }}
        }}
    ).exec();
};

//authenticated users can view all Published stories plus their own Saved stories
//non-authenticated users can view only Published stories
exports.readPublicStory = function(storyId) {
    console.log('readSingleStory(...) called');

    return User.findOne({  'stories._id': storyId}, {stories: {$elemMatch: {_id: storyId, status: 'Published'}}}).exec();
};

exports.readOwnStory = function(facebookId, storyId) {
    return User.findOne({ 'facebookCredentials.id': facebookId, 'stories._id': storyId}, {stories: {$elemMatch: {_id: storyId}}}).exec();
};

exports.deleteStory = function(facebookId, storyId) {
    console.log('Inside forms deleteStory the id is: ' + storyId);
    return User.update( {'facebookCredentials.id': facebookId},
        { $pull: {stories: {_id: storyId}}}).exec();
};


exports.readAllPublishedStories = function() {
    console.log('readAllPublishedStories() called');

    // return User.find({ firstName: 'Lenny', 'stories.status': 'Published'}, {stories: {$elemMatch: {status: 'Published'}}}).exec();

    return User.aggregate(
        { $match: { 'stories.status': 'Published'}},
        { $project: {
            stories: {$filter: {
                input: '$stories',
                as: 'story',
                cond: {$eq: ['$$story.status', 'Published']}
            }}
        }}
    ).exec();
};

exports.readAPICredentials = function(facebookId) {
    console.log('getAPICredentials called');

    return User.findOne({ 'facebookCredentials.id': facebookId}, 'basicCredentials').exec();


};
