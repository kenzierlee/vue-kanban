var mongoose = require('mongoose');
var ObjectId = mongoose.SchemaTypes.ObjectId;
var Schema = mongoose.Schema;
var schemaName = 'Board';

var schema = new Schema({
    title: {type: String, require: true},
    userId: {type: ObjectId, ref: 'User'},
    membersId: [{type: ObjectId, ref: 'User'}],
    created: {type: Date, default: Date.now()}
});

module.exports = mongoose.model(schemaName, schema);