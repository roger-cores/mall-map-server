var trainingSet = function(trainingDatabase, Sequelize){
  var TrainingSet = trainingDatabase.define('training_set', {
    identifier: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    beacon1: {type: Sequelize.INTEGER, allowNull: false, unique: 'uniqueBeaconSet'},
    beacon2: {type: Sequelize.INTEGER, allowNull: false, unique: 'uniqueBeaconSet'},
    beacon3: {type: Sequelize.INTEGER, allowNull: false, unique: 'uniqueBeaconSet'},
    beacon4: {type: Sequelize.INTEGER, allowNull: false, unique: 'uniqueBeaconSet'},
    beacon5: {type: Sequelize.INTEGER, allowNull: false, unique: 'uniqueBeaconSet'},
    classRecordLabel: {type: Sequelize.STRING, allowNull: false, unique: 'uniqueBeaconSet'}
  });




  return TrainingSet;
};

module.exports = trainingSet;
