
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


var config = require('./config/' + process.env.NODE_ENV + '.json')
if (process.env.NODE_ENV === 'production') {
  config = require(config.path);
}

var mySqlConfig = config.mysql;
var dbConnector = require('./handler/database/mySqlConnection');

//initiate Database connections
dbConnector = new dbConnector();

var mySqlWriteInstance;
dbConnector.connect(mySqlConfig.read,
  function (err, res) {
    if (err !== null) {
      return err;
    }
    mySqlWriteInstance = res;
  }
);

var mySqlReadInstance;
dbConnector.connect(mySqlConfig.write,
  function (err, res) {
    if (err !== null) {
      return err;
    }
    mySqlReadInstance = res;
  }
);

console.log("Database Connected!")

// load env config
dotenv.config({ path: './config/config.env' })

// initialize app
const app = express()

// enable cors
app.use(cors())


// express middleware to parse req
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* database connection are set in express app
use req.app.get('dbWrite') for fetching the write pool */
app.set('dbRead', mySqlReadInstance);
app.set('dbWrite', mySqlWriteInstance);


// routes
app.use('/', require('./routes/index'))

// port number
const PORT = process.env.PORT || 5000;

// starting server
app.listen(PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


// libuv => 