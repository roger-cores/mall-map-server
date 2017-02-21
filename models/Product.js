var product = function(trainingDatabase, Sequelize){
  var Product = trainingDatabase.define('product', {
    identifier: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    product_name: {type: Sequelize.STRING, allowNull: false, unique: 'uniqueProduct'},
    product_cost: {type: Sequelize.INTEGER, allowNull: false},
    class_label: {type: Sequelize.STRING, allowNull: false, unique: 'uniqueProduct'}
  });




  return Product;
};

module.exports = product;
