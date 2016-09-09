var mongoose = require('mongoose')


var facilitySchema = new mongoose.Schema ({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: Number,
  description: String,
  phone: String,
  email: String,
  userId: String

});


var userSchema = new mongoose.Schema({
  username:   String,
  password_hash: String,
  name: String,
  city: String,
  state: String,
  age: Number,
  email: String,
  image: String,
  disability: {type: Boolean, default: false},
  preferred_activity: String,
  facilityId: String,
  facilities: [facilitySchema],
  bio: String,
  following: [{userId: String}],
  followers: [{userId: String}],
  created: {type: Date, default: Date.now}
});

var User = mongoose.model('User', userSchema);

module.exports = User;
