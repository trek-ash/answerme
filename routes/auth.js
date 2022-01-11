const router = require("express").Router()
const User = require("../models/User")
const {apiStatus} = require("../utils/utils")

router.post('/login', async (req, res) => {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password);
      
      const token = await user.generateAuthToken();
      
      apiStatus(res, {
        message: "Login successfull",
        token,
      }, 200);
    } catch (error) {  
      apiStatus(res, error.toString(), 401);
    }
});

router.post('/signup', async (req, res) => {
    try {
      const {email, password} = req.body;

      const user = new User({email, password})
      const signupStatus = await user.save();
      const token = await user.generateAuthToken();

      apiStatus(res, {
        message: "Signup successfull",
        token
      }, 200);
    } catch (error) {  
      apiStatus(res, error.toString(), 401);
    }
});

module.exports = router