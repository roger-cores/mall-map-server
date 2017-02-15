var express = require('express');

var beaconRouteFunction = function(Beacon, codes){
  var router = express.Router();


  //create or update
  //returns 201 or 500
  router.post('/', function(req, res, next){
    Beacon.findById(req.body.name)
      .then(function(beacon){
        if(!beacon){
          Beacon.build(req.body)
            .save()
            .then(function(beacon){
              res.status(codes.CREATED).send(beacon);
            })
            .catch(function(error){
              console.log(error);
              res.status(codes.SERVER_ERROR).send({});
            });
        } else {
          beacon.mac = req.body.mac;
          beacon.save()
            .then(function(beacon){
              res.status(codes.CREATED).send(beacon);
            })
            .catch(function(error){
              console.log(error);
              res.status(codes.SERVER_ERROR).send({});
            });
        }
      })
      .catch(function(error){
        console.log(error);
        res.status(codes.SERVER_ERROR).send({});
      });
  });

  //get all beacons
  //returns 200 or 500
  router.get('/', function(req, res, next){
    Beacon.findAll()
      .then(function(beacons){
        res.status(codes.OK).send(beacons);
      })
      .catch(function(error){
        console.log(error);
        res.status(codes.SERVER_ERROR).send({});
      });
  });

  //delete beacon by id(name)
  //returns 201 or 500
  router.delete('/:id', function(req, res, next){
    Beacon.findById(req.params.id)
      .then(function(beacon){
        if(beacon){
          beacon.destroy({force: true});
          res.status(codes.CREATED).send({});
        } else {
          console.log(error);
          res.status(codes.SERVER_ERROR).send({});
        }
      })
      .catch(function(error){
        console.log(error);
        res.status(codes.SERVER_ERROR).send({});
      });
  });
  return router;
}


module.exports = beaconRouteFunction;
