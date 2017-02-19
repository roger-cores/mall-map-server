var express = require('express');


var classRouteFunction = function(Link, ClassRecord, codes){
  var router = express.Router();

  //create
  //returns 201 or 500


  router.post('/', function(req, res, next){
    req.body.source_label = req.body.sourceLabel.label;
    req.body.destination_label = req.body.destinationLabel.label;
    Link.build(req.body)
      .save()
      .then(function(link){
        req.body.identifier = link.identifier;
        res.status(codes.CREATED).send(req.body);
      })
      .catch(function(error){
        console.log(error);
        res.status(codes.SERVER_ERROR).send({});
      });
  });

  //delete
  //returns 201 or 500
  router.delete('/:id', function(req, res, next){
    console.log(req.params.id);
    Link.findById(req.params.id)
      .then(function(link){
        if(link){
          link.destroy();
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
    Link.findAll({
      include: [{
        model: ClassRecord,
        as: 'sourceLabel'
      }, {
        model: ClassRecord,
        as: 'destinationLabel'
      }]
    })
      .then(function(link){
        res.status(codes.OK).send(link);
      })
      .catch(function(error){
        console.log(error);
        res.status(codes.SERVER_ERROR).send({});
      });
  });

  return router;
}












module.exports = classRouteFunction;
