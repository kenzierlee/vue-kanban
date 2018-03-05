var mongoose = require('mongoose');
var ObjectId = mongoose.SchemaTypes.ObjectId;
var Schema = mongoose.Schema;
var schemaName = 'Comment';

var schema = new Schema({
    comment: {type: String, required: true},
    userId: {type: ObjectId, ref: 'User'},
    boardId: {type: ObjectId, ref: 'Board'},
    listId: {type: ObjectId, ref: 'List'},
    taskId: {type: ObjectId, ref: 'Task'}
});

module.exports = mongoose.model(schemaName, schema);