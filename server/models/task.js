var mongoose = require('mongoose');
var ObjectId = mongoose.SchemaTypes.ObjectId;
var Schema = mongoose.Schema;
var schemaName = 'Task';
var Comments = require('./comment');

var schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    userId: {type: ObjectId, ref: 'User'},
    boardId: {type: ObjectId, ref: 'Board'},
    listId: {type: ObjectId, ref: 'List'}
});

schema.post('remove', function(){
    var self = this
    Comments.remove({taskId: self._id}).then(res =>{
        console.log('Successfully deleted Task Content')
    })
    .catch(err =>{
        console.log('Failed to Delete Task Content: ', err)
    })
});

module.exports = mongoose.model(schemaName, schema);