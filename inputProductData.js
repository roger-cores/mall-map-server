var dataArray = new Array();

dataArray.push(
  {
    class_label: 'lab316',
    product_name: 'Patanjali Tel',
    product_cost: 20
  });


dataArray.push(
  {
    class_label: 'lab316',
    product_name: 'Patanjali Wine',
    product_cost: 45
  });



dataArray.push(
  {
    class_label: 'lab316',
    product_name: 'Patanjali coke',
    product_cost: 9
  });

dataArray.push(
  {
    class_label: 'lab317',
    product_name: 'Tamatar',
    product_cost: 13
  });


dataArray.push(
  {
    class_label: 'lab317',
    product_name: 'Aaloo',
    product_cost: 4
  });


dataArray.push(
  {
    class_label: 'lab317',
    product_name: 'Dhaniya',
    product_cost: 130
  });



var inputData = function(Product){
  for(var i=0; i<dataArray.length; i++){
    Product.build(dataArray[i])
           .save()
           .then(function(product){})
           .catch(function(error){
             console.log(error);
           })
  }
}


module.exports = inputData;
