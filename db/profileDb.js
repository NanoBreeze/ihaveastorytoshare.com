/**
 * Created by Lenny on 2016-11-17.
 */

var User = require('../db/user');

exports.getProfile = function() {
    console.log('getProfile() called');

    return User.find({firstName:'Lenny'}, {firstName: 1,
                                            lastName: 1,
                                            email: 1,
                                            interests: 1,
                                            dateJoined: 1}).exec();
};

//For now, put contains all the appropriate value for updating
exports.putProfile = function(firstName, lastName, email, interests) {
    console.log('updateProfile(...) called');

    var updatedProfile = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        interests: interests
    };

    return User.findOneAndUpdate({firstName:'Lenny'}, updatedProfile, {projection: {firstName: 1, lastName: 1, email: 1, interests: 1}, new: true}).exec();
}
