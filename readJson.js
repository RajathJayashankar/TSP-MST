module.exports = {
  loadJSON: function (callback) {
    const fs = require('fs');
    fs.readFile('./Data/testcase.json', (err, data) => {
        if (err) throw err;
        let graphData = JSON.parse(data);  
        callback(graphData);     
    });    
  }
};