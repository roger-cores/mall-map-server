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

  return router;
}

module.exports = mapImageRouteFunction;
