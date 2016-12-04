/**
 * Created by Lenny on 2016-11-25.
 */

var FacebookStrategy = require('passport-facebook').Strategy;
const uuidV1 = require('uuid/v1');
const uuidV4 = require('uuid/v4');

var configCredentials = require('./credentials');

var User = require('../db/user');


module.exports = function(passport) {

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
            "clientID"        : configCredentials.facebookCredentials.clientID,
            "clientSecret"    : configCredentials.facebookCredentials.clientSecret,
            "callbackURL"     : configCredentials.facebookCredentials.callbackURL
        },

        // facebook will send back the token and profile
        function(token, refreshToken, profile, done) {

            console.log('profile is:');
            console.log(JSON.stringify(profile));
            // asynchronous
            process.nextTick(function() {

                // find the user in the database based on their facebook id
                User.findOne({ 'facebookCredentials.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err) {
                        console.log('error found');

                        return done(err);
                    }

                    // if the user is found, then log them in
                    if (user) {
                        console.log('user found');

                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newUser            = new User();
                        newUser.facebookCredentials.id = profile.id;
                        newUser.facebookCredentials.token = token; // we will save the token that facebook provides to the user

                        newUser.basicCredentials.clientId = uuidV1();
                        newUser.basicCredentials.clientSecret = uuidV4();

                        //find first and last name OR speculate them
                        if (profile.name.givenName)
                        {
                            newUser.firstName = profile.name.givenName;
                        }
                        else {
                            newUser.firstName = profile.displayName.split(' ')[0];
                        }

                        if (profile.name.familyName) {
                            newUser.lastName = profile.name.familyName;
                        }
                        else {
                            var splitDisplayNames = profile.displayName.split(' ');
                            newUser.lastName = splitDisplayNames[splitDisplayNames.length-1]; //we do this over pop because I don't like that pop changes the array, even though we don't use the array anymore
                        }

                        newUser.email = '';
                            newUser.interests = '';
                            newUser.dateJoined = Date.now();
                            newUser.stories = [{
                                title: "this is the title1",
                                subTitle: "this is the subtitle1",
                                content: "this is the content1",
                                status: 'Published',
                                dateCreated: Date.now()
                        }];

                        // save our user to the database
                        newUser.save(function(err) {
                            if (err) {
                                console.log('newUser.save if');
                                throw err;

                            }

                            console.log('newUser.save not if');

                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }

                });
            });

        }));
};