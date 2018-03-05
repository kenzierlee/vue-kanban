var expressSession = require('express-session')
var mongoStore = require('connect-mongodb-session')(expressSession) // ties our sessions into our current mongo db (this is one option: could also set up session storage in a separate server -- redis, etc.)
var connectionStr = `mongodb://test:test@ds133814.mlab.com:33814/vue-kanban`
var store = new mongoStore({
  uri: connectionStr,
  collection: 'Sessions'
})
store.on('error', function(err) {
  console.log('[SESSION ERROR]', err)
})
var session = expressSession({
  secret: '4 gUys iN a HackaThon$^!!',
  cookie: {
    maxAge: 1000*60*60*24*7*52 // number of milliseconds in one year    
  },
  store: store,
  resave: true,
  saveUninitialized: true
})
module.exports = session