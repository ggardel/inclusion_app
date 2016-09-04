var User = require('../models/user')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

function login (req, res, next) {
	var username = req.body.username
	var password = req.body.password

	if (!username || !password) {
		res.json({ error: "Username and password must be set" })
		return false
	}

	// Verify that username exists in database
	User.findOne({ username: username }, function (err, user) {
		if (err) {
			res.json(err)
			return false
		}
		if (!user) {
			res.json({ error: "User does not exist" })
			return false
		}

		// Verify password
		bcrypt.compare(password, user.password_hash, function (err, verified) {
			if (err) {
				res.json(err)
				return false
			}
			if (verified) {
				res.json({ token: createToken(user) })
			}
			else {
				res.json({ error: "Password is incorrect" })
			}
		})
	})
}

function register (req, res, next) {
	var username = req.body.username
	var password = req.body.password

	if (!username || !password) {
		res.json({ error: "Username and password must be set" })
		return false
	}

	// Verify that the username has not been taken
	User.findOne({ username: username }, function (err, user) {
		if (err) {
			res.json(err)
			return false
		}
		if (user) {
			res.json({ error: "User already exists" })
			return false
		}

		// Need to create a new user
		bcrypt.hash(password, 10, function (err, hash) {
			if (err) {
				res.json(err)
				return false
			}
			var user = new User({
				username: username,
				password_hash: hash
			})
			user.save(function (err, user) {
				if (err) {
					res.json(err)
					return false
				}
				// Everything worked, send back a token
				res.json({ token: createToken(user) })
			})
		})
	})
}

function createToken (user) {
	return jwt.sign(user, process.env.JWT_SECRET)
}

function verifyToken (req, res, next) {
	jwt.verify(req.query.token, process.env.JWT_SECRET, function (err, decoded) {
		if (err) {
			res.json(err)
			return false
		}
		req.token = decoded
		next()
	})
}

module.exports = {
	login: login,
	register: register,
	verifyToken: verifyToken
}
