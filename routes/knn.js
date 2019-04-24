var express = require('express');


var knnRouteFunction = function(Sequelize, codes){
  var router = express.Router();


  //post a training data
  //returns 201 or 500
  router.post('/train', function(req, res, next){
    req.models.ClassRecord
    .findOrCreate({where: {label: req.body.classRecord.label}, defaults: {x: req.body.classRecord.x, y: req.body.classRecord.y}})
    .spread(function(classRecord, created) {
      var trainingSet = req.models.TrainingSet.build(req.body.trainingSet);
      trainingSet.classRecordLabel = classRecord.label;
      trainingSet.save()
        .then(function(trainingSet){
          res.status(codes.CREATED).send({}); //send back data
        })
        .catch(function(error){
          console.log(error);
          res.status(codes.SERVER_ERROR).send({});
        });
    });
  });

  //K-Nearest Neighbors classification method
  //returns 200
  router.post('/classify/:k', function(req, res, next){
    var k = req.params.k;
    var minDistances = new Array();
    var labels = new Array();
    var data = req.body.trainingSet;
    req.models.TrainingSet.findAll().then(function(trainingSets) {

      if(trainingSets.length == 0) {
        res.status(200).send([]);
        return;
      }

      for(var key in trainingSets){
        var trainingSet = trainingSets[key];
        var distance = Math.sqrt(Math.pow(data.beacon1 - trainingSet.beacon1, 2)
                        + Math.pow(data.beacon2 - trainingSet.beacon2, 2)
                        + Math.pow(data.beacon3 - trainingSet.beacon3, 2)
                        + Math.pow(data.beacon4 - trainingSet.beacon4, 2)
                        + Math.pow(data.beacon5 - trainingSet.beacon5, 2));
        trainingSet.distance = distance;
        trainingSet.dataValues.distance = distance;
        if(minDistances.length < k){
          minDistances.push(trainingSet);
        } else {
          for(var i = 0; i < minDistances.length; i++){
            if(trainingSet.distance < minDistances[i].distance){
              var pushForward = minDistances[i];
              minDistances[i] = trainingSet;
              for(var j = i+1; j < k; j++){
                var temp = minDistances[i];
                minDistances[i] = pushForward;
                pushForward = temp;
              }
              break;
            }
          }
        }
      }


      var majorityTrainingSet;
      for(var i = 0; i < minDistances.length; i++){
        if(!labels[minDistances[i].classRecordLabel]){
          labels[minDistances[i].classRecordLabel] = 1;
        } else {
          labels[minDistances[i].classRecordLabel] += 1;
        }

        if(!majorityTrainingSet) {
          majorityTrainingSet = minDistances[i];
        } else if(labels[minDistances[i].classRecordLabel] > labels[majorityTrainingSet]){
          majorityTrainingSet = minDistances[i];
        }

      }

      console.log(labels);

      req.models.ClassRecord.findById(majorityTrainingSet.classRecordLabel).then(function(classRecord) {
        console.log(classRecord);
        res.status(codes.OK).send(classRecord);
      })
    });
  });


  router.get('/count', function(req, res, next){
    req.models.TrainingSet.findAll({
      attributes: ['classRecordLabel', [Sequelize.fn('COUNT', Sequelize.col('classRecordLabel')), 'class_count']],
      group: ['classRecordLabel']
    })
    .then(function(trainingSet){
      console.log(trainingSet);
      res.status(codes.OK).send(trainingSet);
    })
    .catch(function(error){
      console.log(error);
      res.status(codes.OK).send(trainingSet);
    });
  });


  //delete all training data
  router.delete('/', function(req, res, next){
    req.models.TrainingSet.destroy({where: {}}).then(function () {});
    res.status(codes.CREATED).send({});
  });

  //delete all for classLabel
  router.delete('/:classlabel', function(req, res, next){
    req.models.TrainingSet.destroy({where: {classRecordLabel: req.params.classlabel}}).then(function () {});
    res.status(codes.CREATED).send({});
  });

  return router;
}


module.exports = knnRouteFunction;
