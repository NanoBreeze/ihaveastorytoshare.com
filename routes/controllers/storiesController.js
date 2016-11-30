/**
 * Created by Lenny on 2016-11-16.
 */

const storiesDb = require('../../db/storiesDb');
const errorMessageFactory = require('../../lib/errorMessageFactory');
const errorChecker = require('../../lib/errorChecker');
const helper = require('../../lib/helper');
const errorHandler = require('../../lib/errorHandler');

const url = require('url');


/**
 * @api {get} /stories/:id Get specific story
 * @apiName GetStoryWithId
 * @apiGroup Stories
 * @apiDescription Returns the story with the specified id
 *
 * @apiSuccess {String} dateCreated Date the story was last published or saved
 * @apiSuccess {String} keywords Keywords associated with the story. Helps search for story.
 * @apiSuccess {String} subTitle A short blurb about the story to draw reader's interest.
 * @apiSuccess {String} content The meat of the story.
 * @apiSuccess {String} status Either "Published" or "Saved". Anyone can access "Published" stories but only the author can access "Saved" ones.
 * @apiSuccess {String} title Story title.
 * @apiSuccess {String} _id The id of the story

 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *{
 * "dateCreated": "2016-11-22T07:00:00.000Z",
  *  "keywords": "PUT Keywords, here",
  *    "subTitle": "PUT Subtitle here!",
    *  "content": "PUT Content here!",
    *  "status": "Saved",
    *  "title": "This is the new PUT test title",
    *  "_id": "583513738f34e023b49a7cdc"
  *  }
 *
 * @apiErrorExample {json} Invalid id
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 87,
  *     "message": "Unsupported query parameter. Supported ones: unsupportedParameterKey"
  *     }
  *   }
  *}
   *}
 *
 *
 */
exports.getStoryWithId = function getStoryWithId(req, res) {
    console.log('getStoryWithId called');
    const id = req.params.id;

    if (!errorChecker.checkIsCastableId(id))
    {
        errorHandler.handleStoryNotFoundError(res, id);
        return;
    }

    storiesDb.getStoryWithId(id)
        .then(function (story) {
            console.log('inside then. The value of story is: ' + story);
            if (story === null) {
                errorHandler.handleNullResult(res, id);
                return;
            }

            console.log(story.stories[0]);
            res.setHeader('content-type', 'application/json');
            res.setHeader('Cache-Control', 'public, max-age=84600');
            res.status(200);
            res.end(JSON.stringify(story.stories[0]));
        })
        .catch(function(err) {
            console.log('here');
            //an incorrect cast to ObjectId should count as a 404 error instead
            errorHandler.handleInternalError(res);
        });
};

/**
 * @api {delete} /stories/:id Deletes the specific story
 * @apiName DeleteStory
 * @apiGroup Stories
 * @apiDescription Delete the specified story
 *
 * @apiSuccess Returns a 200 status code

 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Invalid id
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 71,
  *     "message": "The story with id 534849fjo382Foe6 does not exist"
  *     }
  *   }
 *
 *
 */


exports.deleteStory = function deleteStory(req, res) {
    console.log('deleteStoryWithId called');
    const id = req.params.id;

    if (!errorChecker.checkIsCastableId(id))
    {
        errorHandler.handleStoryNotFoundError( res, id);
        return;
    }

    storiesDb.deleteStory(id).then(function(result){
        console.log('inside then');
        //Note: at most, only one story can possibly be deleted
        if (result.nModified == 1) {
            console.log('inside if');
            res.status(200).end();
        }
        else {
            var errorMessage = errorMessageFactory.createUnfoundStoryMessage(id);
            res.status(404);
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(errorMessage));
        }
    })
        .catch(function(err) {
            console.log('inside catch');
            errorHandler.handleInternalError(res);
    });
};

/**
 * @api {put} /stories/:id Update specific story
 * @apiName PutStories
 * @apiGroup Stories
 * @apiDescription Updates the specified story
 *
 * @apiSuccess {String} keywords Keywords associated with the story. Helps search for story.
 * @apiSuccess {String} subTitle A short blurb about the story to draw reader's interest.
 * @apiSuccess {String} content The meat of the story.
 * @apiSuccess {String} status Either "Published" or "Saved". Anyone can access "Published" stories but only the author can access "Saved" ones.
 * @apiSuccess {String} title Story title.

 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 * @apiErrorExample {json} Invalid id
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 87,
  *     "message": "Unsupported query parameter. Supported ones: unsupportedParameterKey"
  *     }
  *   }
 *
 *   @apiErrorExample {json} Unsupported parameters
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 87,
  *     "message": "Unsupported query parameter. Supported ones: title, subTitle, content, keywords, status"
  *     }
  *   }
 *
 *    @apiErrorExample {json} Invalid value for "status" parameter
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 89,
  *     "message": "Invalid query parameter value for status. Valid values are: Saved, Published"
  *     }
  *   }
 *
 *
 */


exports.putStory = function putStory(req, res) {
    console.log('putStory called');
    const id = req.params.id;
    const newStory = req.body;

    if (!errorChecker.checkIsCastableId(id))
    {
        errorHandler.handleStoryNotFoundError(res, id);
        return;
    }

    //check that there aren't unsupported parameters than are allowed
    var validParameters = ['title', 'subTitle', 'content', 'keywords', 'status']; //user can't change dateCreated field
    var unsupportedQueryParams = errorChecker.checkForUnsupportedQueryParameter(validParameters, newStory);

    if (unsupportedQueryParams.length > 0) {
        var errorMessage = errorMessageFactory.createUnsupportedQueryParameterMessage(validParameters);

        res.status(400);
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(errorMessage));
        return;
    }

    //make sure status is either "Saved" or "Published"
    if (newStory.status) {
        var validParameters = ['Saved', 'Published'];
        var isValidParameter = errorChecker.checkIfValidQueryParameterValue(newStory.status, validParameters);

        if (!isValidParameter) {
            var errorMessage = errorMessageFactory.createInvalidQueryParameterValueMessage('status', validParameters);
            res.status(400);
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(errorMessage));
            return;
        }
    }

    console.log(id);
    storiesDb.putStory(id, newStory)
        .then(function(updatedStoryArray){

            if (updatedStoryArray === null) {
                errorHandler.handleNullResult(res, id);
                return;
            }

            var updatedStory = updatedStoryArray.stories[0];

            //Note: at most, only one story can possibly be updated
            res.setHeader('content-type', 'application/json');
            res.status(200);
            res.end(JSON.stringify(updatedStory));
        })
        .catch(function(err){
            //an incorrect cast to ObjectId should count as a 404 error instead
            errorHandler.handleInternalError(res);
        });

};

/**
 * @api {post} /stories Creates a new story
 * @apiName PostStories
 * @apiGroup Stories
 * @apiDescription Creates a specified story
 *
 * @apiSuccess {String} subTitle A short blurb about the story to draw reader's interest.
 * @apiSuccess {String} content The meat of the story.
 * @apiSuccess {String} status Either "Published" or "Saved". Anyone can access "Published" stories but only the author can access "Saved" ones.
 * @apiSuccess {String} title Story title.
 * @apiSuccess {String} keywords(optional) Keywords to help readers find the story.
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *      "dateCreated": "2016-11-29T07:00:00.000Z",
 *       "keywords": "a, b, c, d",
 *       "content": "This is the test content",
 *       "status": "Saved",
 *       "subTitle": "This is the test subTitle",
 *       "title": "This is the test title",
 *       "_id": "583e719f826edd3e4897cb48",
 *       "Location": "http://localhost:3001/api/stories/583e719f826edd3e4897cb48"
 *
 * @apiErrorExample {json} Missing required "title" parameter
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 89,
  *     "message": "Missing required query parameter. The following query parameters must be included: title"
  *     }
  *   }
 *
 *   @apiErrorExample {json} Unsupported parameters
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 87,
  *     "message": "Unsupported query parameter. Supported ones:status, content, subTitle, title, keywords"
  *     }
  *   }
 *
 *    @apiErrorExample {json} Invalid value for "status" parameter
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 89,
  *     "message": "Invalid query parameter value for status. Valid values are: Saved, Published"
  *     }
  *   }
 *
 *
 */


exports.postStory = function postStory(req, res) {

    const storyToPost = req.body;

    var missingParams = [];

    //check that all relevant fields exist. User doesn't specify date
    if (!storyToPost.status) { missingParams.push('status'); }
    if (!storyToPost.content) { missingParams.push('content'); }
    if (!storyToPost.subTitle) { missingParams.push('subTitle'); }
    if (!storyToPost.title) { missingParams.push('title'); }

    if (missingParams.length > 0) {
        var errorMessage = errorMessageFactory.createMissingRequiredQueryParameterMessage(missingParams);

        res.status(400);
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(errorMessage));
        return;
    }

    //check that there aren't unsupported parameters than are allowed
    var validParameters = ['status', 'content', 'subTitle', 'title', 'keywords'];
    var unsupportedQueryParams = errorChecker.checkForUnsupportedQueryParameter(validParameters, storyToPost);

    if (unsupportedQueryParams.length > 0) {
        var errorMessage = errorMessageFactory.createUnsupportedQueryParameterMessage(validParameters);

        res.status(400);
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(errorMessage));
        return;
    }

    //make sure status is either "Saved" or "Published"
    if (storyToPost.status) {
        var validParameters = ['Saved', 'Published'];
        console.log('the value of status is: ' + storyToPost.status);
        var isValidParameter = errorChecker.checkIfValidQueryParameterValue(storyToPost.status, validParameters);

        console.log(isValidParameter);
        if (!isValidParameter) {
            var errorMessage = errorMessageFactory.createInvalidQueryParameterValueMessage('status', validParameters);
            res.status(400);
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(errorMessage));
            return;
        }
    }

    // console.log(helper.getCurrentDate());
    storyToPost.dateCreated = helper.getCurrentDate();

    //if keywords don't exist, add an empty one
    if (storyToPost.keywords === undefined) { storyToPost.keywords = null; }
    console.log(storyToPost);

    storiesDb.postStory(storyToPost)
        .then(function(storyArray){
        // console.log(story);
        var story = storyArray.stories[0].toObject();
            story["Location"] = 'http://localhost:' + process.env.PORT.toString() + '/api/stories/' + story._id.toString();
        console.log(story);

        res.setHeader('content-type', 'application/json');
        res.status(201);
        res.end(JSON.stringify(story));
        })
        .catch(function(err) {
            errorHandler.handleInternalError(res);
        });
};


/**
 * @api {get} /stories Returns user's stories
 * @apiName GetStories
 * @apiGroup Stories
 * @apiDescription Returns an array of the user's stories. Can filter by parameter matching, offset, and limit query
 *
 * @apiSuccess {String} offset Used for pagination to determine how far from the beginning of the queried results to return
 * @apiSuccess {String} limit The maximum number of results to show
 * @apiSuccess {String} filter Exact matches. eg, title=A brown fox
 *
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "dateCreated": "2016-11-29T07:00:00.000Z",
 *       "keywords": "a, b, c, d",
 *       "content": "This is the test content",
 *       "status": "Saved",
 *       "subTitle": "This is the test subTitle",
 *       "title": "This is the test title",
 *       "_id": "583e719f826edd3e4897cb48",
 *     }]
 *
 *   @apiErrorExample {json} Unsupported parameters
 *    HTTP/1.1 400 Bad Request
 *    {
  * "error": {
  *     "code": 87,
  *     "message": "Unsupported query parameter. Supported ones:offset, limit, filter"
  *     }
  *   }
 *

 *
 *
 */

exports.getStories = function(req, res) {
    console.log('getStories() called');
    var queryStringObj = url.parse(req.url, true).query;

    console.log(queryStringObj);

    var validParameters = ['offset', 'limit', 'filter']
    var unsupportedQueryParams = errorChecker.checkForUnsupportedQueryString(validParameters, queryStringObj);

    if (unsupportedQueryParams.length > 0) {
        var errorMessage = errorMessageFactory.createUnsupportedQueryStringMessage(validParameters);

        res.status(400);
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(errorMessage));
        return;
    }

    //parse query strings
    var offset = 0;
    var limit = 10;
    var filterObj = {};

    if (Object.keys(queryStringObj).length > 0)
    {
        if (queryStringObj.offset) { offset = parseInt(queryStringObj.offset); }
        if (queryStringObj.limit) { limit = parseInt(queryStringObj.limit); }

        if (queryStringObj.filter) {
            var separatedQuery = queryStringObj.filter.split('=');
            filterObj.queryParameter = separatedQuery[0];
            filterObj.queryValue = separatedQuery[1];
        }
    }


    storiesDb.getStories(offset, limit, filterObj)
        .then(function(storyArray){
        console.log('inside then');
        var stories = storyArray[0].stories;
            console.log(stories);
        res.setHeader('content-type', 'application/json');
        res.status(200);
        res.end(JSON.stringify(stories));
    });
};



exports.methodNotAllowed = function(req, res) {
    var allowedMethods;

    if (req.params.id) {
        allowedMethods = ['GET', 'PUT', 'DELETE'];
    }
    else {
        allowedMethods = ['GET', 'POST'];
    }

    var errorMessage = errorMessageFactory.createMethodNotAllowedMessage(req.method, allowedMethods)
    res.status(405);
    res.setHeader('content-type', 'application/json');
    res.end(JSON.stringify(errorMessage));
};
