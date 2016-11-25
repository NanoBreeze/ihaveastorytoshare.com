/**
 * Created by Lenny on 2016-11-22.
 */


//validParameters is an array
exports.checkForUnsupportedQueryParameter = function(validParameters, body) {
    var unsupportedQueryParams = [];
    for (var parameter in body) {
        if (body.hasOwnProperty(parameter)) {
            if (validParameters.indexOf(parameter) === -1) {
                unsupportedQueryParams.push(parameter);
            }
        }
    }
    return unsupportedQueryParams;
};

exports.checkIfValidQueryParameterValue = function(paramValue, validValues) {

    if (validValues.indexOf(paramValue) !== -1) { return true; }
    return false;
};

exports.checkIsCastableId = function(id) {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        return true;
    }
    return false;
};