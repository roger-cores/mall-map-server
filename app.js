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



var trainingDatabase = new Sequelize(`postgres://${process.env.userid?process.env.userid:'postgres'}:${process.env.passwd?process.env.passwd:'pass'}@${process.env.dburi?process.env.dburi:'localhost'}:${process.env.dbport?process.env.dbport:'5432'}/${process.env.dbname?process.env.dbname:'mallmap'}`);
// var trainingDatabase = new Sequelize('postgres://wjvzstiabdqjec:22970eb9b5a299456638ed9bf594458b809b71f7ed5a0656346be7acb7e31e4f@ec2-54-246-108-119.eu-west-1.compute.amazonaws.com:5432/df29fe95b26a5a');
var TrainingSet = models.TrainingSet(trainingDatabase, Sequelize);
var ClassRecord = models.ClassRecord(trainingDatabase, Sequelize);
var Beacon = models.Beacon(trainingDatabase, Sequelize);
var Link = models.Link(trainingDatabase, Sequelize);
var Product = models.Product(trainingDatabase, Sequelize);
var MapImage = models.MapImage(trainingDatabase, Sequelize);

var User = models.User(trainingDatabase, Sequelize);
User.sync();
// inputProductData(Product);

ClassRecord.hasMany(TrainingSet);
TrainingSet.belongsTo(ClassRecord);

Link.belongsTo(ClassRecord, {
  as: 'sourceLabel',
  foreignKey: 'source_label'
});

Link.belongsTo(ClassRecord, {
  as: 'destinationLabel',
  foreignKey: 'destination_label'
});

Product.belongsTo(ClassRecord, {
  as: 'classLabel',
  foreignKey: 'class_label'
});


ClassRecord.sync();
TrainingSet.sync();
Beacon.sync();
Link.sync();
Product.sync();
MapImage.sync();

// inputLinkData(Link);

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(express.static('public'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));







app.use('/beacon', beaconRoutes(Beacon, codes));
app.use('/knn', knnRoutes(TrainingSet, ClassRecord, Sequelize, codes));
app.use('/class', classRoutes(ClassRecord, codes));
app.use('/link', linkRoutes(Link, ClassRecord, codes));
app.use('/route', shortestPathRoutes(Link, ClassRecord, codes));
app.use('/product', productRoutes(Product, ClassRecord, codes));
app.use('/map_image', mapImageRoutes(MapImage, codes));
app.use('/login', userRoutes(User, codes));
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
