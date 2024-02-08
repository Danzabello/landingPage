const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGODB_URI)

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Duplicate Email Not allowed'],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required']
  },
  name: { 
    type: String, 
  },
  gender: { 
    type: String 
  },
  birthday: { 
    type: Date 
  },
  role: {
    type: String,
    default: 'student',
    enum: ['student', 'admin']
  }
  // include other fields as necessary
});

UserSchema.pre('save', function(next) {
  let user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
