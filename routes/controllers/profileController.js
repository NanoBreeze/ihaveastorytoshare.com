/**
 * Created by Lenny on 2016-11-16.
 */

const profileDb = require('../../db/profileDb');
const errorMessageFactory = require('../../lib/errorMessageFactory');
const errorHandler = require('../../lib/errorHandler');
const errorChecker = require('../../lib/errorChecker');

// GET v1/profile
// returns the an object containing the same fields as on the Profile section in Dashboard

/**
 * @api {get} /profile Request User information
 * @apiName GetProfile
 * @apiGroup Profile
 * @apiDescription Returns the user's profile
 *
 * @apiSuccess {String} _id User's id
 * @apiSuccess {String} firstName User's first name. Defaults to the first word in Facebook name
 * @apiSuccess {String} lastName User's first name. Defaults to the last word in Facebook name
 * @apiSuccess {String} email User's email address.
 * @apiSuccess {String} interests User's interests.
 * @apiSuccess {String} dateJoined Date the user joined site.
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 * "_id": "582bc9d3a6c967299077f497",
  *"firstName": "Lenny",
 * "lastName": "Cheng",
*  "email": "lenny@hotmail.com.com",
*  "interests": "Software, games, Halo",
 * "dateJoined": "2016-11-16T02:52:03.760Z"
 *    }

*/


exports.getProfile = function getProfile(req, res) {
    console.log('inside getProfile');

    var promise = profileDb.getProfile(res.locals.basicClientId);
    promise.then(function(userProfile) {

            if (userProfile === null) {
                errorHandler.handleProfileNotFoundError(res);
                return;
            }

            console.log(userProfile[0]);
            res.setHeader('content-type', 'application/json');
            res.setHeader('Cache-Control', 'private, max-age=3600');
            res.end(JSON.stringify(userProfile[0]));
        })
        .catch(function(err){
            errorHandler.handleInternalError(res);
        });
};

/**
 * @api {put} /profile Update User information
 * @apiName PutProfile
 * @apiGroup Profile
 * @apiDescription Update the user's profile
 *
 * @apiSuccess {String} firstName User's first name. Defaults to the first word in Facebook name
 * @apiSuccess {String} lastName User's first name. Defaults to the last word in Facebook name
 * @apiSuccess {String} email User's email address.
 * @apiSuccess {String} interests User's interests.
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 * "_id": "582bc9d3a6c967299077f497",
  *"firstName": "Lenny",
 * "lastName": "Cheng",
*  "email": "lenny@hotmail.com.com",
*  "interests": "Software, games, Halo",
 * "dateJoined": "2016-11-16T02:52:03.760Z"
 *    }]
 *
 * @apiErrorExample {json} Unsupported query parameter
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 87,
  *     "message": "Unsupported query parameter. Supported ones: unsupportedParameterKey"
  *     }
  *   }
 * @apiErrorExample {json} Unsupported query parameter
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 87,
  *     "message": "Unsupported query parameter. Supported ones: unsupportedParameterKey"
  *     }
  *   }
 */

exports.putProfile = function putProfile(req, res) {
    console.log('inside putProfile. res.locals.basicClientId is: ' + res.locals.basicClientId);
    var newProfile = req.body;
    var validBodyKeys = ['firstName', 'lastName', 'email', 'interests'];

    //check that the body only contains valid keys
    var unsupportedQueryParams = errorChecker.checkForUnsupportedQueryParameter(validBodyKeys, newProfile);

    if (unsupportedQueryParams.length > 0) {
        var errorMessage = errorMessageFactory.createUnsupportedQueryParameterMessage(unsupportedQueryParams);

        res.status(400);
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(errorMessage));
        return;
    }

    var promise = profileDb.putProfile(res.locals.basicClientId, newProfile);
    promise.then(function(updatedProfile) {
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(updatedProfile));
    })
        .catch(function(err){
            errorHandler.handleProfileNotFoundError(err, res);
        });
};

exports.methodNotAllowed = function(req, res) {
    var allowedMethods = ['GET', 'PUT'];
    var errorMessage = errorMessageFactory.createMethodNotAllowedMessage(req.method, allowedMethods)
    res.status(405);
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(errorMessage));
};
