/**
 * Created by Lenny on 2016-11-25.
 */

module.exports = {
    facebookCredentials : {
        "clientID"      : 'facebook App Id', // facebook App ID
        "clientSecret"    : 'facebook App Secret', // facebook App Secret
        "callbackURL"    : 'http://localhost:' + process.env.PORT.toString() + '/auth/facebook/callback'
    }
};