var mongoose = require('mongoose');
var ObjectId = mongoose.SchemaTypes.ObjectId;
var Schema = mongoose.Schema;
var schemaName = 'Board';
var Lists = require('./list');
var Tasks = require('./task');
var Comments = require('./comment');

var schema = new Schema({
    title: {type: String, require: true},
    userId: {type: ObjectId, ref: 'User'},
    membersId: [], //this is where memberId or email is stored.
    created: {type: Date, default: Date.now()}
});

schema.post('remove', function(){
    var self = this
    Promise.all(
        [
            Lists.remove({boardId: self._id}),
            Tasks.remove({boardId: self._id}),
            Comments.remove({boardId: self._id})
        ])
        .then(res =>{
            console.log('Successfully deleted Board Content')
        })
        .catch(err =>{
            console.log('Failed to Delete Board Content: ', err)
        })
});


module.exports = mongoose.model(schemaName, schema);