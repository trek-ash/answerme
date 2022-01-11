const jwt = require('jsonwebtoken');
const User = require('../models/User')
const config = require("../config")
const getUser = async token => {
    const decoded = jwt.verify(token, config.sessionSecret);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
  
    return user;
};
  
const userAuth = async (req, res, next) => {
    try {
      const user = await getUser(req.header('Authorization').replace('Bearer ', ''));
      if (!user) err('Auth failed');
      req.user = user;
      next();
    } catch (e) {
      res.status(401).send({ error: e });
    }
  };

module.exports = {userAuth}