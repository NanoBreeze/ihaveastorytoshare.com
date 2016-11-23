/**
 * Created by Lenny on 2016-11-22.
 */

const errorMessageFactory = require('./errorMessageFactory');

exports.handleInternalError = function(res) {
    var errorMessage = errorMessageFactory.createInternalServerErrorMessage();
    res.setHeader('content-type', 'application/json');
    res.status(500);
    res.end(JSON.stringify(errorMessage));
}

exports.handleStoryNotFoundError = function(err, res, id) {
    if (err.kind === 'ObjectId') {
        var errorMessage = errorMessageFactory.createUnfoundStoryMessage(id);
        res.setHeader('content-type', 'application/json');
        res.status(404)
        res.end(JSON.stringify(errorMessage));
    } else {
        this.handleInternalError();
    }
}

exports.handleNullResult = function(res, id) {
    var errorMessage = errorMessageFactory.createUnfoundStoryMessage(id);
    res.setHeader('content-type', 'application/json');
    res.status(404)
    res.end(JSON.stringify(errorMessage));
}


exports.handleProfileNotFoundError = function(err, res) {
    if (err.kind === 'ObjectId') {
        var errorMessage = errorMessageFactory.createUnfoundProfileMessage();
        res.setHeader('content-type', 'application/json');
        res.status(404)
        res.end(JSON.stringify(errorMessage));
    } else {
        this.handleInternalError();
    }
}