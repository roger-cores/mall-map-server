var express = require('express');

var userRouteFunction = function(User, codes){
  var router = express.Router();


  router.post('/', function(req, res, next){

    var found = function(user){
      if(user){
        if(user.password === req.body.password){
          //login successful
          res.status(codes.OK).send({code: 1, message: "login successful"});
        } else {
          //wrong password
          res.status(codes.OK).send({code: 0, message: "wrong password"});
        }
      } else {
        //user doesnt exist
        res.status(codes.OK).send({code: 0, message: "user doesn't exist"});
      }
    }

    var error = function(error){
      res.status(codes.SERVER_ERROR).send({});
    }

    User.findById(req.body.email)
      .then(found)
      .catch(error);


  });


  return router;
}


module.exports = userRouteFunction;
