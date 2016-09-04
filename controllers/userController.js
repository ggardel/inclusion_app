var User = require('../models/user')

function user (req, res, next) {
	console.log(req.token)
	User.findOne({ username: req.token._doc.username }, function (err, user) {
		if (err) {
			res.json(err)
			return false
		}
		res.json(user)
	})
}

module.exports = {
	user: user
}
