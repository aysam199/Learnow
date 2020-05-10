// helper middleware packages morgan to log, helmet and cors for extra security
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require ('body-parser');

module.exports = {
  morgan,
  helmet,
  cors,
  bodyParser
}