var express = require('express');
const Graph = require('node-dijkstra')


var shortestPath = function(Link, ClassRecord, codes){
  var router = express.Router();

  var findAll = function(model, done){
    model.findAll()
         .then(function(entities){
           done(entities);
         })
         .error(function(error){
           console.log(error);
           done();
         })
  }

  var sendError = function(res){
    res.status(codes.SERVER_ERROR).send({});
  }

  router.get('/:source/to/:destination', function(req, res, next){
    var links, classes = new Array();

    var createGraph = function(){
      for(var key in links){
        var link = links[key];
        classes[link.source_label].neighbours[link.destination_label] = link.distance;
        classes[link.destination_label].neighbours[link.source_label] = link.distance;
      }

      const route = new Graph();
      for(var key in classes){
        route.addNode(key, classes[key].neighbours);
      }
      var path = route.path(req.params.source, req.params.destination);
      console.log(path);
      res.status(codes.OK).send(path);
    }

    findAll(Link, function(entities){
      if(!entities){
        sendError(res);
      } else {
        links = entities;
        findAll(ClassRecord, function(entities){
          if(!entities){
            sendError(res);
          } else {
            for(var key in entities){
              classes[entities[key].label] = entities[key];
              classes[entities[key].label].neighbours = {};
            }
            createGraph();
          }
        });
      }
    });
  });

  return router;
}


module.exports = shortestPath;
