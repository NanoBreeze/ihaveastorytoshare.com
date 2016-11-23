/**
 * Created by Lenny on 2016-11-16.
 */

const profileDb = require('../../db/profileDb');
const errorMessageFactory = require('../../lib/errorMessageFactory');
const errorHandler = require('../../lib/errorHandler');
const errorChecker = require('../../lib/errorChecker');

// GET v1/profile
// returns the an object containing the same fields as on the Profile section in Dashboard

exports.getProfile = function getProfile(req, res) {
    console.log('inside getProfile');

    var promise = profileDb.getProfile();
    promise.then(function(userProfile) {

            if (userProfile === null) {
                errorHandler.handleNullResult(res, id);
                return;
            }

            console.log(userProfile[0]);
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(userProfile[0]));
        })
        .catch(function(err){
            errorHandler.handleInternalError(res);
        });
};


exports.putProfile = function putProfile(req, res) {

    var newProfile = req.body;
    var validBodyKeys = ['firstName', 'lastName', 'email', 'interests'];

    //check that the body only contains valid keys
    var unsupportedQueryParams = errorChecker.checkForUnsupportedQueryParameter(validBodyKeys, newProfile);

    if (unsupportedQueryParams.length > 0) {
        var errorMessage = errorMessageFactory.createUnsupportedQueryParameterMessage(unsupportedQueryParams);

        res.status(400);
        res.end(JSON.stringify(errorMessage));
        return;
    }

    var promise = profileDb.putProfile(newProfile);
    promise.then(function(updatedProfile) {
        console.log(newProfile);
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(updatedProfile));
    })
        .catch(function(err){
            errorHandler.handleProfileNotFoundError(err, res);
        });
};

