var mongoose = require('mongoose');
var ObjectId = Schema.Types.ObjectId;
var Schema = mongoose.Schema;
var schemaName = 'List';

var schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    userId: {type: ObjectId, ref: 'User'},
    boardId: {type: ObjectId, ref: 'Board'}
});

module.exports = mongoose.model(schemaName, schema);