'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    {Schema, connect} = require('mongoose'),
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
//see https://mongoosejs.com/docs/connections.html
//See https://docs.atlas.mongodb.com/driver-connection/
connect(config.db.uri, {useNewUrlParser: true}).then(connected =>{
    console.log("Connected");
});
/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

  Remember that we needed to read in a file like we did in Bootcamp Assignment #1.
 */
fs.readFile('listings.json', 'utf8', function(err, data) {
    var entries = JSON.parse(data).entries;
    entries.forEach(entry => {
        var dataBaseItem = new Listing(entry);
        dataBaseItem.save(function (err){
            if(err){
                console.error("Error Saving Listing to Database: " + JSON.stringify(err));
            }
            console.log("ID: " + entry.code);
        });
    });
});

/*  
  Check to see if it works: Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */