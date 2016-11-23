/**
 * Created by Lenny on 2016-11-16.
 */

const storiesDb = require('../../db/storiesDb');
const errorMessageFactory = require('../../lib/errorMessageFactory');
const errorChecker = require('../../lib/errorChecker');
const helper = require('../../lib/helper');
const errorHandler = require('../../lib/errorHandler');


exports.getStoryWithId = function getStoryWithId(req, res) {
    console.log('getStoryWithId called');
    const id = req.params.id;
    storiesDb.getStoryWithId(id)
        .then(function (story) {
            console.log('inside then. The value of story is: ' + story);
            if (story === null) {
                errorHandler.handleNullResult(res, id);
                return;
            }

            console.log(story.stories[0]);
            res.setHeader('content-type', 'application/json');
            res.end(JSON.stringify(story.stories[0]));
        })
        .catch(function(err) {
            console.log('here');
            //an incorrect cast to ObjectId should count as a 404 error instead
            errorHandler.handleStoryNotFoundError(err, res, id);
        });
};


exports.deleteStory = function deleteStory(req, res) {
    console.log('deleteStoryWithId called');
    const id = req.params.id;

    storiesDb.deleteStory(id).then(function(result){

        //Note: at most, only one story can possibly be deleted
        if (result.nModified == 1) {
            res.status(200).end();
        }
        else {
            res.status(204).end();
        }
    });
};


exports.putStory = function putStory(req, res) {
    console.log('putStory called');
    const id = req.params.id;
    const newStory = req.body;

    //check that there aren't unsupported parameters than are allowed
    var validParameters = ['title', 'subTitle', 'content', 'keywords', 'status']; //user can't change dateCreated field
    var unsupportedQueryParams = errorChecker.checkForUnsupportedQueryParameter(validParameters, newStory);

    if (unsupportedQueryParams.length > 0) {
        var errorMessage = errorMessageFactory.createUnsupportedQueryParameterMessage(unsupportedQueryParams);

        res.status(400);
        res.end(JSON.stringify(errorMessage));
        return;
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
            res.end(JSON.stringify(updatedStory));
        })
        .catch(function(err){
            //an incorrect cast to ObjectId should count as a 404 error instead
            errorHandler.handleStoryNotFoundError(err, res, id);
        });

};


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
        res.end(JSON.stringify(errorMessage));
        return;
    }

    //check that there aren't unsupported parameters than are allowed
    var validParameters = ['status', 'content', 'subTitle', 'title', 'keywords'];
    var unsupportedQueryParams = errorChecker.checkForUnsupportedQueryParameter(validParameters, storyToPost);

    if (unsupportedQueryParams.length > 0) {
        var errorMessage = errorMessageFactory.createUnsupportedQueryParameterMessage(unsupportedQueryParams);

        res.status(400);
        res.end(JSON.stringify(errorMessage));
        return;
    }

    // console.log(helper.getCurrentDate());
    storyToPost.dateCreated = helper.getCurrentDate();
    console.log(storyToPost);

    storiesDb.postStory(storyToPost)
        .then(function(story){
        // console.log(story);

        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(story));
        })
        .catch(function(err) {
            errorHandler.handleInternalError(res);
        });
};


exports.getStories = function(req, res) {
    console.log('readSavedStories() called');

    storiesDb.getStories().then(function(storyArray){

        var stories = storyArray[0].stories;
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(stories));
    });
};