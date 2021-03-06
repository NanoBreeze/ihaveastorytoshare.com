// grab the things we need
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

mongoose.connect('mongodb://localhost/27017');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    facebookCredentials : {
        id: String,
        token: String
    },
    basicCredentials: {
        clientId: String,
        clientSecret: String
    },
    firstName: String,
    lastName: String,
    email: String,
    interests: String,
    dateJoined: Date,
    // username: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    // admin: Boolean,
    // location: String,
    // meta: {
    //     age: Number,
    //     website: String
    // },
    // created_at: Date,
    // updated_at: Date
    stories: [{
        title: String,
        subTitle: String,
        content: String,
        dateCreated: Date,
        keywords: String,
        status: String //whether the story is saved or published
        //keywords: [{ type: String }]
    }]
});

userSchema.methods.verifyPassword = function(password, callback) {
    console.log('verifyPassword. password is: ' + password);
    console.log('this.firstName is: ' + this.firatName);
    if ('Lenny' == password) {
        return true;
    }
    return false;
};

userSchema.plugin(mongoosePaginate);
// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;