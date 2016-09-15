var User = require('../models/user');
var fs = require('fs-extra');
var path = require('path');






var getUsers = function(req, res, next){
	User.find({}, function(err, userData){
		if (err) {
			res.json(err);
		} else {
			res.json(userData);
		}
	})
}


var show = function(req, res, next){
	User.findById(req.params.id, function(err, user){
		if (err) {
			res.json({message: 'Can not find user ' + err});
		} else if (!user) {
			res.json({message: 'No user with this Id.'});
		} else {
			res.json(user);
		}
	});
};


function create(req, res, next) {
	User.findById(req.params.id, function (err, user){
		if (err) {
			res.json({message: 'Can not find user ' + err});
		} else if (!user) {
			res.json({message: 'No user with this Id.'});
		} else {
			console.log(req.body)
			if(req.body.name) user.name = req.body.name;
			if(req.body.city) user.city = req.body.city;
			if(req.body.state) user.state = req.body.state;
			if(req.body.email) user.email = req.body.email;
			if(req.body.username) user.username = req.body.username;
			if(req.body.disability == 'true') {
				user.disability = true;}
			else {user.disability = false;}
			user.save(function(err, user){
				if (err) {
					res.json({error: err})
				}
				else {
					console.log("save successful")
					res.json(user);
				}
			});
		};

 });
};


function update(req, res, next) {
	User.findById(req.params.id, function (err, user){
		if (err) {
			res.json({message: 'Can not find user ' + err});
		} else if (!user) {
			res.json({message: 'No user with this Id.'});
		} else {
			if(req.body.name) user.name = req.body.name;
			if(req.body.city) user.city = req.body.city;
			if(req.body.state) user.state = req.body.state;
			if(req.body.email) user.email = req.body.email;
			if(req.body.username) user.username = req.body.username;
      if(req.body.image) user.image = req.body.image;
			// This line does not execute if req.body.disability is false
			// if (req.body.disability) user.disability = req.body.disability;
			user.disability = req.body.disability

			user.save(function(err, user){
				if (err) {
					res.json({error: err})
				}
				else {
					res.json(user);
				}
			});
		};

 });
};

function createDisability(req, res, next){
  User.findById(req.params.id, function (err, user){
    if (err) {
			res.json({message: 'Can not find user ' + err});
		} else if (!user) {
			res.json({message: 'No user with this Id.'});
		} else if (user.disability == false) {
      res.json({message: 'Sorry you can not continue with the profile'} + err)
    } else {
      if(req.body.age) user.age = req.body.age;
      if(req.body.preferred_activity) user.preferred_activity = req.body.preferred_activity;
      if(req.body.bio) user.bio = req.body.bio;
      user.save(function(err, user){
        if (err) {
          res.json({message: err});
        }
        else {
          res.json(user)
        }
      })
    }
  })
}




function updateDisability(req, res, next){
  User.findById(req.params.id, function (err, user){
    if (err) {
			res.json({message: 'Can not find user ' + err});
		} else if (!user) {
			res.json({message: 'No user with this Id.'});
		} else if (user.disability == false) {
      res.json({message: 'Sorry you can not continue with the profile'} + err)
    }
		else {
      if(req.body.age) user.age = req.body.age;
      if(req.body.preferred_activity) user.preferred_activity = req.body.preferred_activity;
      if(req.body.bio) user.bio = req.body.bio;
      user.save(function(err, user){
        if (err) {
          res.json({message: err});
        }
        else {
          res.json(user)
        }
      })
    }
  })
}

function destroy(req, res, next){
	User.findByIdAndRemove(req.params.id, function(err, user){
		if (err){
			res.json({message: `Could not find and delete ${err}`});
		}
		else {
			res.json({message: `Successfully deleted user ${req.params.id}`});
		}
	})
}




function newFacility (req, res, next){
  User.findById(req.params.id, function(err, user){
    if (err){
      res.json({message: `User not found ${err}`});
    }
    else if (!user){
      res.json({message: `No user with id ${req.params.id}`});
    }
    else if (user.disability == false) {
      res.json({message: 'Sorry you can not continue with the profile'} + err)
    }
    else {
      facility = {};
      if(req.body.name) facility.name = req.body.name;
      if(req.body.address) facility.address = req.body.address;
      if(req.body.city) facility.city = req.body.city;
      if(req.body.state) facility.state = req.body.state;
      if(req.body.zip) facility.zip = req.body.zip;
      if(req.body.description) facility.description = req.body.description;
      if(req.body.phone) facility.phone = req.body.phone;
      if(req.body.email) facility.email = req.body.email;
      user.facilities.push(facility);
      user.save(function(err, user){
        if (err){
          res.json({message: err});
        }
        else {
          res.json(user);
        }
      })
    };
  });
};


function showFacilities(req, res, next){
  User.findById(req.params.id, function(err, user){
    if (err){
      res.json({message: `User not found ${err}`});
    }
    else if (user.disability == false) {
      res.json({message: `Not a user with disability ${req.params.id}`});
    }
    else {
       res.json(user.facilities);
     };
  });
};


function showFacility(req, res, next){
  User.findById(req.params.user_id, function(err, user){
    if (err){
      res.json({message: `User not found ${err}`});
    }
    else if (user.disability == false) {
      res.json({message: `Not  a user with disability ${req.params.id}`});
    }
    else {
      user.facilities.forEach(function(facility, index){
        if(facility._id == req.params.id){
          res.json(facility);
        }
      })
    };
  });
}


function deletefacility(req,res,next) {
  User.findById(req.params.user_id, function(err, user) {
    if (err) {
      res.json({message: `User not found ${err}`});
    }
    else if (user.disability == false) {
      res.json({message: `Not a user with disability ${req.params.id}`});
    }
    else {
      user.facilities.forEach(function(facility, index) {
        if (facility._id == req.params.id) {
          user.facilities.splice(index, 1);
          user.save(function(err, user) {
            if (err) res.json({message: `Facility could not be updated because ${err}`});
            else {
              res.json({message: `successfully deleted facility`});
            };
          });
        };
      });
    };
  });
};


function editfacility(req,res,next) {
  User.findById(req.params.user_id, function(err, user) {
		console.log(user)
    if (err) {
      res.json({message: `User not found ${err}`});
    }
     else {
      user.facilities.forEach(function(facility, index) {
      if (facility._id == req.params.id) {
          if(req.body.name) facility.name = req.body.name;
          if(req.body.address) facility.address = req.body.address;
          if(req.body.city) facility.city = req.body.city;
          if(req.body.state) facility.state = req.body.state;
          if(req.body.zip) facility.zip = req.body.zip;
          if(req.body.description) facility.description = req.body.description;
          if(req.body.phone) facility.phone = req.body.phone;
          if(req.body.email) facility.email = req.body.email;
          user.save(function(err, user) {
            if (err) res.json({message: `Facility could not be updated because ${err}`});
            else {
              res.json(user);
            };
          });
				};
     })
	 }
 })

}




module.exports = {
  getUsers: getUsers,
  show: show,
	create: create,
  update: update,
  delete: destroy,
  createDisability: createDisability,
  updateDisability: updateDisability,
  newFacility: newFacility,
  showFacility: showFacility,
  showFacilities: showFacilities,
  deletefacility: deletefacility,
  editfacility: editfacility
}
