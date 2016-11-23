/**
 * Created by Lenny on 2016-11-22.
 */

const UNSUPPORTED_QUERY_PARAMETER = 87;
const INVALID_QUERY_PARAMETER_VALUE = 88;
const MISSING_REQUIRED_QUERY_PARAMETER = 89;

const STORY_NOT_FOUND = 71;
const PROFILE_NOT_FOUND = 61;
const INTERNAL_SERVER_ERROR = 500;

exports.createUnsupportedQueryParameterMessage = function(supportedParams) {

    var sSupportedParam = supportedParams.join(", ");

    return {
        error: {
            code: UNSUPPORTED_QUERY_PARAMETER,
            message: "Unsupported query parameter. Supported ones: " + sSupportedParam
        }
    }
};

//paramObj is a dictionary containing the parameter as key, and description of its valid values as value
exports.createInvalidQueryParameterValueMessage = function(paramObj) {

    var allowedQueryParameterValue = "";

    for (var key in paramObj) {
        if (paramObj.hasOwnProperty(key)) {
            allowedQueryParameterValue += " " + key.toString() + ": " + paramObj[key] + ".";
        }
    }

    return {
        error: {
            code: INVALID_QUERY_PARAMETER_VALUE,
            message: "Invalid query parameter value. " + allowedQueryParameterValue
        }
    }
};

//missingQueryParameters must be an array of strings
exports.createMissingRequiredQueryParameterMessage = function(missingQueryParameters) {

    var sMissingQueryParameter = missingQueryParameters.join(", ");

    return {
        error: {
            code: MISSING_REQUIRED_QUERY_PARAMETER,
            message: "Missing required query parameter. The following query parameters must be included: " + sMissingQueryParameter
        }
    }
};

exports.createUnfoundStoryMessage = function(storyId) {
    return {
        error: {
            code: STORY_NOT_FOUND,
            message: "The story with id " + storyId.toString() + " does not exist"
        }
    }
};

exports.createUnfoundProfileMessage = function() {
    return {
        error: {
            code: PROFILE_NOT_FOUND,
            message: "The profile is not found"
        }
    }
};

exports.createInternalServerErrorMessage = function() {
    return {
        error: {
            code: INTERNAL_SERVER_ERROR,
            message: "Something unexpected happened with our server. Please try again."
        }
    }
};