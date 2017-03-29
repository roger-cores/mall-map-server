var user = function(trainingDatabase, Sequelize){
  var User = trainingDatabase.define('user', {
    email: {type: Sequelize.STRING, primaryKey: true},
    password: {type: Sequelize.STRING, allowNull: false}
  });




  return User;
};

module.exports = user;
