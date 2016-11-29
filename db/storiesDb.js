/**
 * Created by Lenny on 2016-11-19.
 */

var User = require('./user');

exports.getStoryWithId = function(storyId) {
    console.log('getStoryWithId(...) called');
    console.log(storyId);
    return User.findOne({ 'stories._id': storyId}, {stories: {$elemMatch: {_id: storyId}}}).exec();
};


exports.getStories = function(offset, limit, filterObj) {
    console.log('getStories() called');


    if (filterObj === null) //object isn't empty
    {
        console.log('inside if filterObj');
        var parameter = filterObj.queryParameter;
        var value = filterObj.queryValue;
        return User.aggregate(
            { $match: { 'firstName': 'Lenny'}},
            { $project: {
                stories: {
                    $slice:[

                        {$filter: {
                            input: '$stories',
                            as: 'story',
                            cond: {$eq: ['$$story.' + parameter, value]}
                        }}, offset, limit]
                }}}
        ).exec();
    }
    console.log('else')
    return User.find({firstName: "Lenny"}, { stories: { $slice: [offset, limit] } }).exec();

    // return User.find({firstName: 'Lenny'}, { stories: {
    //     $filter: {
    //         input: "$stories",
    //         as: "item",
    //         cond: { $eq: [ "$$item.title", 'rew' ] }
    //     }}}
    //     ).exec();
    //
    // $project: {
    //     stories: {$filter: {
    //         input: '$stories',
    //             as: 'story',
    //             cond: {$eq: ['$$story.status', 'Published']}
    //     }}
};

exports.deleteStory = function(storyId) {
    console.log('the id is: ' + storyId);
    return User.update( {'facebookCredentials.id': facebookId},
        { $pull: {stories: {_id: storyId}}}).exec();
};



//no error handling yet or ensure values must be right. Also, partial updates aren't supported right now.
exports.putStory = function(storyId, updateStoryValue) {
    console.log('putStory(...) called');

    var updateValue = {};
    for (var prop in updateStoryValue) {
        var sProp = prop.toString();
        updateValue['stories.$.' + sProp] = updateStoryValue[prop];
    }

    //because the user isn't allowed to include _id into the body
    updateValue['stories.$._id'] = storyId;

    console.log(updateValue);

    return User.findOneAndUpdate({ 'stories._id' : storyId}, {$set: updateValue}, {select: { 'stories': { $elemMatch:{ '_id' : storyId }}}, new: true}).exec();
};


exports.postStory = function(storyToPost) {
    console.log('postStory(...) called');
    console.log(storyToPost);
    // return User.findOneAndUpdate({firstName:'Lenny'}, {$push: {stories: storyToPost}}).exec();
    // return User.findOneAndUpdate({ firstName : 'Lenny'}, {push: {stories: storyToPost}}).exec();
    return User.findOneAndUpdate({firstName:'Lenny'}, {$push: {stories: storyToPost}}, {select: {'stories' : {$slice: -1}} , new:true}).exec();
};