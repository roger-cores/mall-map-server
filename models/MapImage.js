var mapImage = function(trainingDatabase, Sequelize){
  var MapImage = trainingDatabase.define('map_image', {
    label: {type: Sequelize.STRING, primaryKey: true}
  });


  

  return MapImage;
};

module.exports = mapImage;
