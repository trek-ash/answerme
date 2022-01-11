require('dotenv').config({path: __dirname + '/.env'});

module.exports = {
  sessionSecret:  process.env.SESSION_SECRET,
}