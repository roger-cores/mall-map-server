var link = function(trainingDatabase, Sequelize){
  var Link = trainingDatabase.define('link', {
    identifier: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    distance: {type: Sequelize.INTEGER, allowNull: false},
    source_label: {type: Sequelize.STRING, allowNull: false, unique: 'uniqueLink'},
    destination_label: {type: Sequelize.STRING, allowNull: false, unique: 'uniqueLink'}
  });




  return Link;
};

module.exports = link;
