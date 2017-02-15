var classRecord = function(trainingDatabase, Sequelize){
  var ClassRecord = trainingDatabase.define('class_record', {
    label: {type: Sequelize.STRING, primaryKey: true},
    x: {type: Sequelize.DOUBLE, allowNull: false},
    y: {type: Sequelize.DOUBLE, allowNull: false}
  });




  return ClassRecord;
};

module.exports = classRecord;
