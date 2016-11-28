/**
 * Created by Lenny on 2016-11-25.
 */

module.exports = {
    facebookCredentials : {
        clientID      : 's', // facebook App ID
        clientSecret    : 'd', // facebook App Secret
        callbackURL    : 'http://localhost:' + process.env.PORT.toString() + '/auth/facebook/callback'
    }
}