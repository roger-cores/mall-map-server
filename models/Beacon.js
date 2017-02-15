var beacon = function(trainingDatabase, Sequelize){
  var Beacon = trainingDatabase.define('beacon', {
    name: {type: Sequelize.STRING, primaryKey: true},
    mac: {type: Sequelize.STRING, allowNull: false}
  });




  return Beacon;
};

module.exports = beacon;
