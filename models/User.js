const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const config = require('../config');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
      firstName: String,
      lastName: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    tokens: [{
      token: {
          type: String,
          required: true
        }
    }],
  }, {
    timestamps: true,
  });

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, config.sessionSecret);

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};
userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid Credentials');

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) throw new Error('Password is wrong');
  
    return user;
  
};

userSchema.pre('save', function (next) {
    const user = this;
    const SALT_FACTOR = 8;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        console.log(hash)
        return next();
    });
   
});


const User = mongoose.model('User', userSchema);

module.exports = User;
  