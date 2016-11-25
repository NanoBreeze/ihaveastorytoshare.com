/**
 * Created by Lenny on 2016-11-22.
 */

const UNSUPPORTED_QUERY_PARAMETER = 87;
const INVALID_QUERY_PARAMETER_VALUE = 88;
const MISSING_REQUIRED_QUERY_PARAMETER = 89;

const STORY_NOT_FOUND = 71;
const PROFILE_NOT_FOUND = 61;
const INTERNAL_SERVER_ERROR = 500;

const METHOD_NOT_ALLOWED = 11;

exports.createUnsupportedQueryParameterMessage = function(supportedParams) {

    var sSupportedParam = supportedParams.join(", ");

    return {
        error: {
            code: UNSUPPORTED_QUERY_PARAMETER,
            message: "Unsupported query parameter. Unsupported ones: " + sSupportedParam
        }
    }
};


exports.createInvalidQueryParameterValueMessage = function(key, validValues) {

    var allowedQueryParameterValue = validValues.join(", ");

    return {
        error: {
            code: INVALID_QUERY_PARAMETER_VALUE,
            message: "Invalid query parameter value for " + key + ". Valid values are: " + allowedQueryParameterValue
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

exports.createMethodNotAllowedMessage = function(httpMethod, allowedMethods) {
    var sAllowedMethods = allowedMethods.join(', ');

    return {
        error: {
            code: METHOD_NOT_ALLOWED,
            message: "The method you used, " + httpMethod + ", is not allowed. Allowed methods: " + sAllowedMethods
        }
    }
};

