// grab the things we need
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/27017');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    interests: String,
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
        keywords: String
        //keywords: [{ type: String }]
    }]
});


// custom method to add string to end of name
// you can create more important methods like name validations or formatting
// you can also do queries and find similar users
// userSchema.methods.createNewStory = function(title, subTitle, content, dateCreated) {
//     console.log('dudify called');
//     // add some stuff to the users name
//     this.name = title;
//
//     return this.name;
// };



// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;