var express = require('express');


var productRouteFunction = function(Product, ClassRecord, codes){
  var router = express.Router();

  //create
  //returns 201 or 500


  router.post('/', function(req, res, next){
    req.body.class_label = req.body.classLabel.label;
    Product.build(req.body)
      .save()
      .then(function(product){
        req.body.identifier = product.identifier;
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
    Product.findById(req.params.id)
      .then(function(product){
        if(product){
          product.destroy();
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
    Product.findAll({
      include: [{
        model: ClassRecord,
        as: 'classLabel'
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

  //list by class label
  //returns 200 or 500
  router.get('/:classlabel', function(req, res, next){
    Product.findAll({
      include: [{
        model: ClassRecord,
        as: 'classLabel'
      }],
      where: {
        class_label: req.params.classlabel
      }
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












module.exports = productRouteFunction;
