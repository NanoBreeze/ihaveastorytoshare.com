/**
 * Created by Lenny on 2016-11-14.
 */

var User = require('../db/user');

exports.createNewStory = function(title, subTitle, content, dateCreated, keywords) {
    console.log('createNewStory(...) called');

    var newStory={
        title: title,
        subTitle: subTitle,
        content: content,
        dateCreated: dateCreated,
        keywords: keywords
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

exports.readStories = function() {
    console.log('readStories() called');

    return User.find({ firstName: 'Lenny'}, 'stories').exec();
}

exports.readSingleStory = function(storyId) {
    console.log('readSingleStory(...) called');

    return User.findOne({ 'stories._id': storyId}, {stories: {$elemMatch: {_id: storyId}}}).exec();


}