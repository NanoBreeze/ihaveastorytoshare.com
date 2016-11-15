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

    User.findOneAndUpdate({firstName:'Lenny'}, {$push: {stories: newStory}}, {new: true}, function(err,user){
        if(err) { throw err; }
        console.log(user);
    });
};

exports.updateProfile = function(firstName, lastName, email, interests) {
    console.log('updateProfile(...) called');

    var updatedProfile = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        interests: interests
    };


    User.findOneAndUpdate({firstName:'Lenny'}, updatedProfile, {new: true}, function(err,user){
        if(err) { throw err; }
        console.log(user);
    });
}

exports.readProfile = function() {

    console.log('readProfile() called');
    var promise = User.find({ firstName: 'Lenny'}).exec();
    return promise;
    // var userProfile = null;
    //
    // User.find({ firstName: 'Lenny' }, function(err, user) {
    //     if (err) { throw err; }
    //
    //     // object of the user
    //     // console.log(user);
    //     console.log(user);
    //     userProfile = user;
    //
    // });
    //
    // return userProfile;
}