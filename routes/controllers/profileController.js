/**
 * Created by Lenny on 2016-11-16.
 */

var profileDb = require('../../db/profileDb');

// GET v1/profile
// returns the an object containing the same fields as on the Profile section in Dashboard

exports.getProfile = function getProfile(req, res) {
    console.log('inside getProfile');
    var promise = profileDb.getProfile();
    promise.then(function(userProfile) {
        console.log(userProfile[0]);
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(userProfile[0]));
    });
}

exports.putProfile = function putProfile(req, res) {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var interests = req.body.interests;

    var promise = profileDb.putProfile(firstName, lastName, email, interests);
    promise.then(function(newProfile) {
        console.log(newProfile);
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(newProfile));
    });
}