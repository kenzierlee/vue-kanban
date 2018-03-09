var mongoose = require('mongoose');
var ObjectId = mongoose.SchemaTypes.ObjectId;
var Schema = mongoose.Schema;
var schemaName = 'List';
var Tasks = require('./task');
var Comments = require('./comment');

var schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    userId: {type: ObjectId, ref: 'User'},
    boardId: {type: ObjectId, ref: 'Board'}
});

schema.post('remove', function(){
    var self = this
    Promise.all(
        [
            Tasks.remove({listId: self._id}),
            Comments.remove({listId: self._id})
        ])
        .then(res =>{
            console.log('Successfully deleted List Content')
        })
        .catch(err =>{
            console.log('Failed to Delete List Content: ', err)
        })
})

module.exports = mongoose.model(schemaName, schema);