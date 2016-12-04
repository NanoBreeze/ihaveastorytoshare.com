/**
 * Created by Lenny on 2016-12-03.
 */

var User = require('../db/user');


exports.findUser = function(clientId, clientSecret) {
    console.log('getProfile() called');

    return User.find({
            'basicCredentials.clientId': clientId,
            'basicCredentials.clientSecret': clientSecret
    }, '_id').exec();
};
