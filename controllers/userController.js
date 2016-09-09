var User = require('../models/user')

function user (req, res, next) {
	User.findOne({ username: req.token._doc.username }, function (err, user) {
		if (err) {
			res.json(err)
			return false
		}
		res.json(user)
	})
}

var getUsers = function(req, res, next){
	User.find({}, function(err, usersData){
		if (err) {
			res.json(err);
		} else {
			res.json(usersData);
		}
	})
}


var followUser = function(req, res){
	console.log(req.body)
	var userId = req.body.userId,
	    wasterId = req.body.wasterId;

	User.findById(wasterId, function(err, waster){
		waster.followers.push({userId: userId});
		waster.save();
		res.json({ success: true })
	})

	User.findById(userId, function(err, follower){
		follower.following.push({userId: wasterId});
		follower.save();
	})
}








module.exports = {
	user: user,
	getUsers: getUsers,
	followUser: followUser,

}
