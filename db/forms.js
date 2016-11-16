/**
 * Created by Lenny on 2016-11-14.
 */

var User = require('../db/user');

exports.createNewStory = function(title, subTitle, content, dateCreated, keywords, status) {
    console.log('createNewStory(...) called');

    var newStory={
        title: title,
        subTitle: subTitle,
        content: content,
        dateCreated: dateCreated,
        keywords: keywords,
        status: status
    };

    return User.findOneAndUpdate({firstName:'Lenny'}, {$push: {stories: newStory}}).exec();
};

exports.updateProfile = function(firstName, lastName, email, interests) {
    console.log('updateProfile(...) called');

    var updatedProfile = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        interests: interests
    };


    return User.findOneAndUpdate({firstName:'Lenny'}, updatedProfile).exec();
}

exports.readProfile = function() {
    console.log('readProfile() called');

    var promise = User.findOne({ firstName: 'Lenny'}).exec();
    return promise;
}

exports.readPublishedStories = function() {
    console.log('readPublishedStories() called');

    // return User.find({ firstName: 'Lenny', 'stories.status': 'Published'}, {stories: {$elemMatch: {status: 'Published'}}}).exec();

    return User.aggregate(
        { $match: { firstName: 'Lenny', 'stories.status': 'Published'}},
        { $project: {
            stories: {$filter: {
                input: '$stories',
                as: 'story',
                cond: {$eq: ['$$story.status', 'Published']}
            }}
        }}
    );
}

exports.readSavedStories = function() {
    console.log('readSavedStories() called');

    return User.aggregate(
        { $match: { firstName: 'Lenny', 'stories.status': 'Saved'}},
        { $project: {
            stories: {$filter: {
                input: '$stories',
                as: 'story',
                cond: {$eq: ['$$story.status', 'Saved']}
            }}
        }}
    );
}

exports.readSingleStory = function(storyId) {
    console.log('readSingleStory(...) called');

    return User.findOne({ 'stories._id': storyId}, {stories: {$elemMatch: {_id: storyId}}}).exec();


}