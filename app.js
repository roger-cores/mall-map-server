var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var beaconRoutes = require('./routes/beacon');
var knnRoutes = require('./routes/knn');
var classRoutes = require('./routes/class');
var linkRoutes = require('./routes/link');
var productRoutes = require('./routes/product');
var shortestPathRoutes = require('./routes/shortestPath');
var userRoutes = require('./routes/user');
var mapImageRoutes = require('./routes/mapImage');
var codes = require('./codes.json');
var Sequelize = require('sequelize');
var models = require('./models');
var utils = require('./utils.js');
var inputProductData = require('./inputProductData');
var inputLinkData = require('./inputLinkData');

var mapsDatabase = new Sequelize(`postgres://${process.env.userid?process.env.userid:'postgres'}:${process.env.passwd?process.env.passwd:'pass'}@${process.env.dburi?process.env.dburi:'localhost'}:${process.env.dbport?process.env.dbport:'5432'}/${process.env.mapsdbname?process.env.mapsdbname:'maps'}`);
var MapImage = models.MapImage(mapsDatabase, Sequelize);
MapImage.sync();

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function modelsForDb(floor) {
  var db = new Sequelize(`postgres://postgres:pass@localhost:5432/${floor}`);
  entities = {}
  entities.TrainingSet = models.TrainingSet(db, Sequelize);
  entities.ClassRecord = models.ClassRecord(db, Sequelize);
  entities.Beacon = models.Beacon(db, Sequelize);
  entities.Link = models.Link(db, Sequelize);


  entities.ClassRecord.hasMany(TrainingSet);
  entities.TrainingSet.belongsTo(ClassRecord);

  entities.Link.belongsTo(ClassRecord, {
    as: 'sourceLabel',
    foreignKey: 'source_label'
  });

  entities.Link.belongsTo(ClassRecord, {
    as: 'destinationLabel',
    foreignKey: 'destination_label'
  });

  entities.ClassRecord.sync();
  entities.TrainingSet.sync();
  entities.Beacon.sync();
  entities.Link.sync();

  return entities;
}

var setUpDbMiddleware = function(req, res, next){
  req.models = modelsForDb(req.params.label);
  next();
}

app.use('/floor/:label/beacon', setUpDbMiddleware, beaconRoutes(codes));
app.use('/floor/:label/knn', setUpDbMiddleware, knnRoutes(Sequelize, codes));
app.use('/floor/:label/class', setUpDbMiddleware, classRoutes(codes));
app.use('/floor/:label/link', setUpDbMiddleware, linkRoutes(codes));
app.use('/floor/:label/route', setUpDbMiddleware, shortestPathRoutes(codes));
// app.use('/product', setUpDbMiddleware, productRoutes(Product, ClassRecord, codes));
app.use('/map_image', mapImageRoutes(MapImage, codes));
// app.use('/login', userRoutes(User, codes));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
