/**
 * Created by Lenny on 2016-11-17.
 */

var User = require('../db/user');

exports.getProfile = function(basicClientId) {
    console.log('getProfile() called' + basicClientId);

    return User.find({'basicCredentials.clientId': basicClientId}, { firstName: 1,
                                            lastName: 1,
                                            email: 1,
                                            interests: 1,
                                            dateJoined: 1}).exec();
};

//For now, put contains all the appropriate value for updating
exports.putProfile = function(basicClientId, profileUpdateValues) {
    console.log('updateProfile(...) called');
    return User.findOneAndUpdate({'basicCredentials.clientId': basicClientId}, profileUpdateValues, {projection: {firstName: 1, lastName: 1, email: 1, interests: 1, dateJoined: 1}, new: true}).exec();
}


