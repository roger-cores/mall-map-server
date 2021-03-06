var express = require('express');


var classRouteFunction = function(ClassRecord, codes){
  var router = express.Router();

  //create
  //returns 201 or 500
  router.post('/', function(req, res, next){
    ClassRecord.build(req.body)
      .save()
      .then(function(classRecord){
        res.status(codes.CREATED).send(classRecord);
      })
      .catch(function(error){
        res.status(codes.SERVER_ERROR).send({});
      });
  });

  //delete
  //returns 201 or 500
  router.delete('/:id', function(req, res, next){
    console.log(req.params.id);
    ClassRecord.findById(req.params.id)
      .then(function(classRecord){
        if(classRecord){
          classRecord.destroy();
          res.status(codes.CREATED).send({});
        }
        else res.status(codes.SERVER_ERROR).send({error: error});
      })
      .catch(function(error){
        console.log(error);
        res.status(codes.SERVER_ERROR).send({error: error});
      });
  });

  //list
  //returns 200 or 500
  router.get('/', function(req, res, next){
    ClassRecord.findAll()
      .then(function(classRecords){
        res.status(codes.OK).send(classRecords);
      })
      .catch(function(error){
        res.status(codes.SERVER_ERROR).send({});
      });
  });

  //list by classType
  //returns 200 or 500
  router.get('/:classType', function(req, res, next){
    ClassRecord.findAll({
      where: {
        classType: req.params.classType
      }
    })
      .then(function(classRecords){
        res.status(codes.OK).send(classRecords);
      })
      .catch(function(error){
        res.status(codes.SERVER_ERROR).send({});
      });
  });

  return router;
}












module.exports = classRouteFunction;
