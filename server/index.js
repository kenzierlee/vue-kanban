var express = require('express');
var bp = require('body-parser');
var cors = require('cors');

require('./db/mlab-config');

var server = express();
var port = 3000;

var authRoutes = require('./auth/routes');
var session = require('./auth/session');

// var boardRoutes = require('./routes/boards');
// var listRoutes = require('./routes/lists');
// var taskRoutes = require('./routes/tasks');
// var commentRoutes = require('./routes/comments');

var whitelist = ['http://localhost:8080']
var corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1
        callback(null, originIsWhitelisted)
    },
    credentials: true
}

server.use(cors(corsOptions));
server.use(session);
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
server.use(authRoutes);
// server.use('/api', boardRoutes.router);
// server.use('/api', listRoutes.router);
// server.use('/api', taskRoutes.router);
// server.use('/api', commentRoutes.router);

server.use('/api/*', (req, res, next) => { // gateway for all following routes
    if (req.method.toLowerCase() != 'get' && !req.session.uid) {
        return res.status(401).send({ error: 'Please log in to continue' })
    }
    console.log('you are logged in')
    next()
});

server.use('*', (req, res, next)=>{
    if(!req.session.uid){
        return res.status(401).send({error: 'Please Login To Continue'})
    }
    next();
});

server.use('*', (err, req, res, next)=>{
    res.status(400).send(err)
});

server.listen(port, ()=>{
    console.log('Server Is Running on port: ', port)
});