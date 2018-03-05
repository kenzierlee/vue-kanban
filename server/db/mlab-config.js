var mongoose = require('mongoose');

var connectionString = 'mongodb://test:test@ds133814.mlab.com:33814/vue-kanban';
var connection = mongoose.connection;

mongoose.connect(connectionString);
connection.on('error', err =>{
    console.log('server error:')
});
connection.once('open', ()=>{
    console.log('Connected to Database')
})