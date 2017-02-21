var dataArray = new Array();

dataArray.push({"lab317": "h1"});
dataArray.push({"h1": "lab316"});
dataArray.push({"lab316": "h2"});
dataArray.push({"lab317": "h2"});
dataArray.push({"h3": "lab316"});
dataArray.push({"h3": "passage1"});
dataArray.push({"h4": "passage1"});
dataArray.push({"h5": "passage1"});
dataArray.push({"h4": "bcroom315"});
dataArray.push({"h5": "h6"});
dataArray.push({"h6": "h7"});
dataArray.push({"bcroom314": "h7"});
dataArray.push({"h8": "h6"});
dataArray.push({"h8": "h9"});
dataArray.push({"croom313": "h9"});
dataArray.push({"h8": "h10"});
dataArray.push({"h11": "h10"});
dataArray.push({"h11": "croom312"});
dataArray.push({"h12": "h10"});
dataArray.push({"h12": "h13"});
dataArray.push({"croom311": "h13"});
dataArray.push({"h12": "h14"});
dataArray.push({"h15": "h14"});
dataArray.push({"h15": "h16"});
dataArray.push({"h17": "h16"});
dataArray.push({"h17": "faculty310"});
dataArray.push({"h18": "h16"});
dataArray.push({"h18": "h19"});
dataArray.push({"hod309": "h19"});
dataArray.push({"h20": "h19"});
dataArray.push({"faculty308": "h20"});
dataArray.push({"h20": "h21"});
dataArray.push({"h21": "lab307"});
dataArray.push({"h22": "h21"});
dataArray.push({"h22": "lab306"});
dataArray.push({"h22": "h23"});
dataArray.push({"h24": "h23"});
dataArray.push({"h24": "h25"});
dataArray.push({"h25": "dpo304"});
dataArray.push({"h26": "h25"});
dataArray.push({"h26": "tut305"});
dataArray.push({"h24": "h27"});
dataArray.push({"h28": "h27"});
dataArray.push({"h28": "c303"});
dataArray.push({"h29": "h27"});
dataArray.push({"h29": "h30"});
dataArray.push({"lab302": "h30"});
dataArray.push({"h29": "h31"});
dataArray.push({"tut301": "h31"});



var inputData = function(Link){
  for(var i=0; i<dataArray.length; i++){
    var dataItem = dataArray[i];
    for(var key in dataItem){
      Link.build({
        source_label: key,
        destination_label: dataItem[key],
        distance: 1
      })
      .save()
      .then(function(link){

      })
      .catch(function(error){
        console.log(error);
      });
    }
  }
}
module.exports = inputData;
