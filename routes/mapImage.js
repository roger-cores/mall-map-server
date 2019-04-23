var express = require('express');
var upload = require('./../uploadMiddleware');
var resize = require('./../ImageResize');
var path = require('path');


var mapImageRouteFunction = function(MapImage, codes){
  var router = express.Router();

  router.get('/upload', async function (req, res) {
    await res.render('index');
  });

  router.post('/post', upload.single('image'), async function (req, res) {
    MapImage.build(req.body)
      .save()
      .then(function(mapImage){
        const imagePath = path.join(__dirname, './../public/images');
        const fileUpload = new resize(imagePath, req.body.label);
        if (!req.file) {
          mapImage.destroy();
          res.status(401).json({error: 'Please provide an image'});
        }
        fileUpload.save(req.file.buffer).then(function(){
          res.status(codes.CREATED).send(mapImage);
        });
      })
      .catch(function(error){
        res.status(codes.SERVER_ERROR).send({});
      });
  });

  //delete mapImage
  router.delete('/:label', function(req, res, next){
    console.log(req.params.label);
    MapImage.findById(req.params.label)
      .then(function(mapImage){
        if(mapImage){
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

  return router;
}



module.exports = mapImageRouteFunction;
