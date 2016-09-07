var mongoose = require('mongoose')


var wasteSchema = new mongoose.Schema ({

  user: String,
  userId: String,
  userImage: String,
  content: String,
  date: {type: Date, default: Date.now}

});


var Waste = mongoose.model('Waste', wasteSchema);

module.exports = Waste;
